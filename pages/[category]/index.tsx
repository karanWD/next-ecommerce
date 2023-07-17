import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import {useRouter} from "next/router";
import CategoryItem from "../../components/Reusable/CategoryItem";
import {GetServerSideProps} from "next";
import useFetch from "../../hooks/useFetch";
import {ApiRoutes} from "../../enums/ApiRoutes";
import {AxiosRequestConfig} from "axios";
import {CategoryType} from "../../types";
import LoadingPage from "../../components/Reusable/LoadingPage";


type fetchType = {
    request: (axiosParams: AxiosRequestConfig<any>) => void,
    response: CategoryType,
    error: any | null
    loading: boolean
}
const CategoryPage = () => {

    const router = useRouter()
    const {category} = router.query
    const {request, response, error, loading}: fetchType = useFetch()

    useEffect(() => {
        category &&
        request({url: ApiRoutes.CLIENT_CATEGORIES + "/" + category})
    }, [category])


    return (
        <>
            <Header/>
            <LoadingPage loaded={!loading && !!response}>
                <div className='grid grid-cols-4 gap-2 p-2'>
                    {
                        response?.subCategories.length > 0 ?
                            response?.subCategories.map((item, index) => {
                                return (
                                    <div key={'CAT_PAGE_ITEM_' + index} className=' col-span-2 md:col-span-2'>
                                        <CategoryItem title={item.title} img={item.thumbnail} name={item.slug}
                                                      link={"/" + item.slug + (item.hasSubCategories ? "" : "/products")}/>
                                    </div>
                                )
                            }) :
                            <div className="col-span-4 text-center flex items-center justify-center"
                                 style={{height: "85vh"}}>
                                دسته های دیگری در این دسته بندی وجود ندارد
                            </div>
                    }
                </div>
            </LoadingPage>
        </>
    );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/common/${locale}.json`),
            },
        },
    };
};