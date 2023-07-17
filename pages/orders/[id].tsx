import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import {GetServerSideProps} from "next";
import {roundDecimal} from "../../components/Util/utilFunc";
import {useTranslations} from "next-intl";

const OrderDetail = () => {
    const t = useTranslations("CartWishlist");
    const {} = useFetch()
    useEffect(() => {

    }, [])


    return (
        <>
            <Header/>
            <h2>جزئیات سفارش</h2>
            <div>
                <div>
                    <span>تاریخ: </span>
                    <span>{}</span>
                </div>
                <div>
                    <span>وضعیت: </span>
                    <span>{}</span>
                </div>
            </div>
            <div>
                <div>
                    <h4>محصولات</h4>
                    <div>
                        <span>تعداد کل:</span>
                        <span>{}</span>
                    </div>
                </div>
                {
                    [].map((item: any, index: number) => {
                        return (
                            <div className="flex flex-col gap-4 border-b-2 border-gray200 py-4"
                                 key={item.productId}>
                                <div className='flex flex-row-reverse justify-between items-start'>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className='text-right'>
                                            <span className="text-gray-400 text-xs"> سایز:</span>
                                            <span className="text-xs mx-2">{item.sizeName}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-gray-400 text-xs"> رنگ:</span>
                                            <span className="text-xs mx-2">{item.colorName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0 text-right">
                    <div className="border border-gray500 divide-y-2 divide-gray200 p-6">
                        <h2 className="text-xl mb-3">{t("invoice")}</h2>
                        <div className="flex justify-between py-2">
                            <span>{roundDecimal(0)}</span>
                            <span className="uppercase">{t("subtotal")}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span>{roundDecimal(0)}</span>
                            <span>{t("grand_total")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            messages: {
                ...require(`../../messages/common/${locale}.json`),
            },
        },
    };
};
