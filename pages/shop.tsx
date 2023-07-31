import React, {useEffect} from "react";
import {GetStaticProps} from "next";
import {useTranslations} from "next-intl";
import Header from "../components/Header/Header";
import Slideshow from "../components/HeroSection/Slideshow";
import CategoryContainer from "../components/Containers/CategoryContainer/CategoryContainer";
import AboutUsContainer from "../components/Containers/AboutUsContainer/AboutUsContainer";
import ProductsContainer from "../components/Containers/ProductsContainer/ProductsContainer";
import LoadingPage from "../components/Reusable/LoadingPage";
import useFetch from "../hooks/useFetch";
import {ApiRoutes} from "../enums/ApiRoutes";
import {ResponseTypes} from "../types";


const Home = () => {
    const t = useTranslations("Index");
    const {request, response, loading, error}:ResponseTypes = useFetch()

    useEffect(() => {
        request({url: ApiRoutes.CLIENT_CATEGORIES})
    }, []);

    return (

        <>
            <Header/>
            <LoadingPage loaded={!loading && response}>
                <main id="main-content">
                    <Slideshow images={response?.banners?.topHomePageBanners}/>
                    <ProductsContainer title={t("best_selling")} desc={""} products={response?.specialCategory?.products}/>
                    <CategoryContainer data={response?.mainCategories} title={t("category")} desc={""}/>
                    <div className="border-gray100 border-b-2"></div>
                    <AboutUsContainer title={t("about_us")} desc={t("about_us_desc")}/>
                </main>
            </LoadingPage>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: {
                ...require(`../messages/common/${locale}.json`),
            },
        },
    };
};

export default Home;
