import React, {useEffect} from 'react';
import {GetStaticProps} from "next";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import LoadingPage from "../../components/Reusable/LoadingPage";
import OrderItem from "../../components/Reusable/OrderItem";
import Link from "next/link";

const temp = [
    {
        date: "",
        productsCount: "",
        id: "",
        status: "",
        totalWeightWithWage: ""
    },
    {
        date: "",
        productsCount: "",
        id: "",
        status: "",
        totalWeightWithWage: ""
    },
    {
        date: "",
        productsCount: "",
        id: "",
        status: "",
        totalWeightWithWage: ""
    },
    {
        date: "",
        productsCount: "",
        id: "sss",
        status: "",
        totalWeightWithWage: ""
    },
]

const OrdersPage = () => {
    const {request, response} = useFetch()
    useEffect(() => {

    }, [])

    return (
        <>
            <Header/>
            <LoadingPage loaded={true}>
                {
                    temp?.map((item, index) => {
                        return (
                            <Link href={"orders/"+item.id} key={"ORDER_ITEM_INDEX+" + index}>
                                <a>
                                    <OrderItem date={item.date} status={item.status}
                                               totalWeight={item.totalWeightWithWage}
                                               productsCount={item.productsCount}
                                    />
                                </a>
                            </Link>
                        )
                    })
                }
            </LoadingPage>
        </>
    );
};

export default OrdersPage;


export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/common/${locale}.json`),
            },
        },
    };
};
