import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useTranslations} from "next-intl";

import Header from "../components/Header/Header";
import GhostButton from "../components/Buttons/GhostButton";
import {GetStaticProps} from "next";
import {roundDecimal} from "../components/Util/utilFunc";
import {useCart} from "../context/cart/CartProvider";
import {useRouter} from "next/router";
import useFetch from "../hooks/useFetch";
import {ApiRoutes} from "../enums/ApiRoutes";
import DeleteIcon from "../public/icons/DeleteIcon";
import Loading from "../public/icons/Loading";
import LoadingPage from "../components/Reusable/LoadingPage";


const ShoppingCart = () => {
    const t = useTranslations("CartWishlist");
    const {cart, updateCart} = useCart();
    const {request, response, isLoaded, error} = useFetch()
    const {request: incrementReq} = useFetch()
    const {request: decrementReq} = useFetch()

    const addHandler = (productId: string) => {
        incrementReq({
            url: ApiRoutes.CLIENT_CART + "/" + productId + "/increment"
        }).then((res: any) => updateCart(res.cart))
    }

    const deleteHandler = (productId: string) => {
        decrementReq({
            url: ApiRoutes.CLIENT_CART + "/" + productId + "/decrement"
        }).then((res: any) => updateCart(res.cart))
    }

    useEffect(() => {
        request({url: ApiRoutes.CLIENT_CART})
            .then((res: any) => {
                updateCart(res.cart)
            })
    }, [])


    return (
        <div className=' flex flex-col'>
            <Header title={`سبدخرید - فرووشگاه تیــارا`}/>
            <LoadingPage loaded={isLoaded && response}>
                <main id="main-content">
                    <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
                        <div className="h-full w-full lg:w-4/6 mr-4">
                            {cart.length === 0 ? (
                                <tr className="w-full text-center h-60 border-b-2 border-gray200">
                                    <td colSpan={5}>{t("cart_is_empty")}</td>
                                </tr>
                            ) : (
                                [...cart?.products, ...cart?.products, ...cart?.products, ...cart?.products].map((item: any, index: number) => {
                                    return (
                                        <div className="flex flex-col gap-4 border-b-2 border-gray200 py-4"
                                             key={item.id}>
                                            <div className='flex flex-row-reverse justify-between items-start'>
                                                <div>
                                                    <div>{item.name}</div>
                                                    <div>{/*{item.weight.name}*/}22 گرم</div>
                                                    <div>{/*{item.color.name}*/} نقره</div>
                                                </div>
                                                <div className='w-4 h-5 text-red'>
                                                    <DeleteIcon/>
                                                </div>
                                            </div>

                                            <div className='flex flex-row-reverse justify-between items-center'>
                                                <CardCounter count={item.count ?? 0}
                                                             addHandler={() => addHandler("")}
                                                             deleteHandler={() => deleteHandler("")}/>
                                                <div className="text-right text-gray400">
                                                    {roundDecimal(item.price * item.count)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}

                        </div>
                        <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0 text-right">
                            <div className="border border-gray500 divide-y-2 divide-gray200 p-6">
                                <h2 className="text-xl mb-3">{t("invoice")}</h2>
                                <div className="flex justify-between py-2">
                                    <span>0</span>
                                    <span className="uppercase">{t("subtotal")}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span>0</span>
                                    <span>{t("grand_total")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </LoadingPage>
        </div>
    )
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: (await import(`../messages/common/${locale}.json`)).default,
        },
    };
};

export default ShoppingCart;


export const CardCounter = ({count, addHandler, deleteHandler}: {
    count: number,
    addHandler: () => void,
    deleteHandler: () => void
}) => {
    return (
        <div>
            <div className="w-24 h-8 sm:h-auto sm:w-3/4 md:w-2/6 mx-auto flex sm:divide-x-2 divide-gray300">
                <div
                    onClick={deleteHandler}
                    className="h-full w-12 flex justify-center items-center cursor-pointer border border-gray300  hover:bg-gray500 hover:text-gray100"
                >
                    -
                </div>
                <div className="h-full w-12 flex justify-center items-center pointer-events-none">
                    {count}
                </div>
                <div
                    onClick={addHandler}
                    className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 border border-gray300  hover:text-gray100"
                >
                    +
                </div>
            </div>
        </div>
    )
}