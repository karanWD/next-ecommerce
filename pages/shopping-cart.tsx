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
    const {request: deleteReq} = useFetch()

    const addHandler = (data: any) => {
        incrementReq({
            method: "POST",
            url: ApiRoutes.CLIENT_CART + "/" + data.productId + "/increment",
            data: {
                colorId: data.colorId,
                sizeId: data.sizeId
            }
        }).then((res: any) => updateCart(res))
    }

    const decrementHandler = (data: any) => {
        decrementReq({
            method: "POST",
            url: ApiRoutes.CLIENT_CART + "/" + data.productId + "/decrement",
            data: {
                colorId: data.colorId,
                sizeId: data.sizeId
            }
        }).then((res: any) => updateCart(res))
    }

    const deleteHandler = (data: any) => {
        deleteReq({
            method: "POST",
            url: ApiRoutes.CLIENT_CART + "/" + data.productId + "/removecolor",
            data: {
                colorId: data.colorId,
                sizeId: data.sizeId
            }
        }).then((res: any) => updateCart(res))
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
                        <div className="w-full lg:w-4/6 mr-4">
                            {cart.products.length === 0 ? (
                                <div className="w-full pt-64 text-center flex items-center justify-center">
                                    <div>{t("cart_is_empty")}</div>
                                </div>
                            ) : (
                                <>
                                    {
                                        cart?.products.map((item: any, index: number) => {
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
                                                        <div className='w-4 h-5 text-red cursor-pointer'
                                                             onClick={() => deleteHandler(item)}>
                                                            <DeleteIcon/>
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-row-reverse justify-between items-center'>
                                                        <CardCounter count={item.count ?? 0}
                                                                     addHandler={() => addHandler(item)}
                                                                     deleteHandler={() => decrementHandler(item)}/>
                                                        <div
                                                            className="text-right text-gray400 flex flex-row-reverse items-center gap-1">
                                                            <span>{roundDecimal(item.totalWeightWithWage)}</span>
                                                            <span className='text-gray-400 text-xs'>{t("gram")}</span>
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
                                                <span>{roundDecimal(cart.totalCartWeight)}</span>
                                                <span className="uppercase">{t("subtotal")}</span>
                                            </div>
                                            <div className="flex justify-between py-3">
                                                <span>{roundDecimal(cart.totalCartWeightWithWage)}</span>
                                                <span>{t("grand_total")}</span>
                                            </div>
                                            <div className="flex justify-between py-3">
                                    <span>
                                        {new Date(cart.updatedAt).toLocaleString("fa-ir")}
                                    </span>
                                                <span>{t("invoiceDate")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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