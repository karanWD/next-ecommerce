import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {GetStaticProps} from "next";
import Link from "next/link"
import DeleteIcon from "../public/icons/DeleteIcon";
import {ApiRoutes} from "../enums/ApiRoutes";
import {useCart} from "../context/cart/CartProvider";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header/Header";
import {roundDecimal} from "../components/Util/utilFunc";
import LoadingPage from "../components/Reusable/LoadingPage";
import Button from "../components/Buttons/Button";
import Drawer from "../components/Reusable/Drawer";
import {useRouter} from "next/router";
import Image from "next/image";
import {useAuth} from "../context/AuthContext";


const ShoppingCart = () => {
  const router = useRouter()
  const t = useTranslations("CartWishlist");
  const [isSubmit, setSubmit] = useState(false)
  const {cart, updateCart} = useCart();
  const {user} = useAuth();
  const {request, response, loading, error} = useFetch()
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
        <LoadingPage loaded={!loading && response}>
          <main id="main-content">
            <div className="app-max-width px-4 sm:px-8 md:px-20  mb-14 flex flex-col lg:flex-row pb-8">
              <div className="w-full">
                {cart.products.length === 0 ? (
                    <div className="w-full pt-64 text-center flex items-center justify-center">
                      <div>{t("cart_is_empty")}</div>
                    </div>
                ) : (
                    <>
                      {
                        cart?.products.map((item, key) => {
                          return (
                              <div className="flex flex-col gap-1 border-b-2 border-gray200 py-4"
                                   key={"CART_ITEM_" + item.productId + key}>
                                <div className='flex justify-between items-start gap-2'>
                                  <div className="w-16 h-16">
                                    <Link href={"/products/" + item.slug} passHref>
                                      <a>
                                        <Image width={300} height={300}
                                               src={item.sizeThumbnail ?? "/images/img1.png" as string}
                                               layout="responsive"/>
                                      </a>
                                    </Link>
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    <Link href={"/products/" + item.slug}><a>{item.title}</a></Link>
                                    <div className="w-full flex-wrap flex flex-col ">
                                      <div className='flex w-full text-right'>
                                        <div className="text-gray-500 text-sm"> سایز:</div>
                                        <div className="text-sm mx-2">{item.sizeName}</div>
                                      </div>
                                      <div className="flex w-full text  -right">
                                        <div className="text-gray-500 text-sm"> رنگ:</div>
                                        <div className="text-sm mx-2">{item.colorName}</div>
                                      </div>
                                      {
                                          user?.showWage &&
                                          <div className="flex w-full text-right">
                                              <div className="text-gray-500 text-sm"> اجرت:</div>
                                              <div className="text-sm mx-2">{item.wage + " " + t("percent")}</div>
                                          </div>
                                      }

                                    </div>

                                  </div>
                                  <div className='w-4 h-5 text-red cursor-pointer'
                                       onClick={() => deleteHandler(item)}>
                                    <DeleteIcon/>
                                  </div>
                                </div>

                                <div className='flex  justify-between items-center mt-2'>
                                  <CardCounter count={item.count ?? 0}
                                               addHandler={() => addHandler(item)}
                                               deleteHandler={item.count > 1 ? () => decrementHandler(item) : () => {
                                               }}/>
                                  <div
                                      className="text-right text-gray-700 flex  items-center gap-1">
                                    <span>{roundDecimal(item.totalWeight)}</span>
                                    <span className='text-gray-500 text-xs'>{t("gram")}</span>
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
                            <span className="uppercase">{t("subtotal")}</span>
                            <span>{roundDecimal(cart.totalCartWeight)}</span>
                          </div>
                          {
                              user?.showWage &&
                              <div className="flex justify-between py-3">
                                  <span>{t("grand_total")}</span>
                                  <span>{roundDecimal(cart.totalCartWeightWithWage)}</span>
                              </div>
                          }
                        </div>
                      </div>
                      <div className="mt-4 bg-white fixed bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-300">
                        <Button size="lg" value={"ثبت سفارش"} onClick={() => router.push("/checkout")}
                                extraClass={"w-full "}/>
                      </div>
                      {/*<Drawer isOpen={isSubmit} closeHandler={() => setSubmit(false)}>*/}
                      {/*  <div>*/}
                      {/*    <div className=" p-4 bg-gray-200 rounded-lg">*/}
                      {/*      <div className="flex justify-between">*/}
                      {/*      <span className="uppercase">{t("subtotal")}</span>*/}
                      {/*      <span>{roundDecimal(cart.totalCartWeight)}</span>*/}
                      {/*      </div>*/}
                      {/*      {*/}
                      {/*          user?.showWage &&*/}
                      {/*          <div className="flex justify-between border-t border-gray-400 mt-2 pt-2">*/}
                      {/*              <span className="uppercase">{t("grand_total")}</span>*/}
                      {/*              <span>{roundDecimal(cart.totalCartWeightWithWage)}</span>*/}
                      {/*          </div>*/}
                      {/*      }*/}
                      {/*    </div>*/}
                      {/*    <div className="mt-8 text-right">*/}
                      {/*      <h4 className="font-bold">آیا از ثبت سفارش خود مطمئن هستید؟</h4>*/}
                      {/*      <p>*/}
                      {/*        در صورت اطمینان از ثبت سفارش خود دکمه ثبت سفارش را کلیک کنید*/}
                      {/*      </p>*/}
                      {/*      <div className="mt-12 flex ">*/}
                      {/*        <div className="text-center flex-1 py-3" onClick={() => setSubmit(false)}>بازگشت</div>*/}
                      {/*        <Button value={"ثبت سفارش"} size="sm" extraClass=" flex-1 "*/}
                      {/*                onClick={()=>{}}/>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</Drawer>*/}
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
        <div className="w-24 h-8  mx-auto flex ">
          <div
              onClick={addHandler}
              className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 border border-gray300  hover:text-gray100"
          >
            +
          </div>
          <div className="h-full w-12 flex justify-center items-center pointer-events-none">
            {count}
          </div>
          <div
              onClick={deleteHandler}
              className="h-full w-12 flex justify-center items-center cursor-pointer border border-gray300  hover:bg-gray500 hover:text-gray100"
          >
            -
          </div>
        </div>
      </div>
  )
}