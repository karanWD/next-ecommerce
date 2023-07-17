import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import {useRouter} from "next/router";
import ProductItem from "../../components/Reusable/ProductItem";
import {GetServerSideProps} from "next";
import useFetch from "../../hooks/useFetch";
import {ApiRoutes} from "../../enums/ApiRoutes";
import {AxiosRequestConfig} from "axios";

type categoryType = {
    products:any[],
    _id:string,
    title:string,
    slug:string
    thumbnail:string
}
type fetchType = {
    request:(axiosParams: AxiosRequestConfig<any>) => void,
    response:categoryType,
    error:any | null
    isLoaded:boolean
}

const SubCategoryPage = () => {
    const router = useRouter()
    const {category} = router.query
    const {response, error, isLoaded, request}:fetchType = useFetch()

    useEffect(() => {
        category &&
        request({
            url:ApiRoutes.CLIENT_CATEGORIES+"/"+category+"/products"
        })
    }, [category])

    return (
        <>
            <Header/>
            <div className='grid grid-cols-4 gap-2 p-2'>
                {response && isLoaded && response.products.map((item, index) => {
                    return (
                        <div key={'CAT_PAGE_ITEM_' + index} className=' col-span-2 md:col-span-2'>
                            <ProductItem image={item.thumbnail} name={item.title} link={"/products/"+item.slug} weight={"8-18"} wage={"40"}/>
                        </div>
                    )
                })}
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
