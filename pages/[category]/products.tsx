import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import {useRouter} from "next/router";
import ProductItem from "../../components/Reusable/ProductItem";
import {GetServerSideProps} from "next";
import useFetch from "../../hooks/useFetch";
import {ApiRoutes} from "../../enums/ApiRoutes";
import {ProductItemType} from "../../types";


const SubCategoryPage = () => {
    const router = useRouter()
    const {category} = router.query
    const {response, error, loading, request} = useFetch()

    useEffect(() => {
        category &&
        request({
            url: ApiRoutes.CLIENT_CATEGORIES + "/" + category + "/products"
        })
    }, [category])

    return (
        <>
            <Header/>
            <div className='grid grid-cols-4 gap-2 p-2'>
                {response && !loading && (
                    response.products.length > 0 ?
                        response.products.map((item:ProductItemType, index: number) => {
                            const weightText = item.minWeight === item.maxWeight ? item.minWeight+"" : item.minWeight + "-" + item.maxWeight
                            return (
                                <div key={'CAT_PAGE_ITEM_' + index} className=' col-span-2 md:col-span-2'>
                                    <ProductItem thumbnail={item.thumbnail} title={item.title}
                                                 link={"/products/" + item.slug} weight={weightText} wage={item.wage}/>
                                </div>
                            )
                        }) :
                        <div className="col-span-4 text-center flex items-center justify-center"
                             style={{height: "85vh"}}>
                            محصولی در این دسته بندی موجود نیست
                        </div>
                )
                }
            </div>
        </>
    );
};

export default SubCategoryPage;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/common/${locale}.json`),
            },
        },
    };
};
