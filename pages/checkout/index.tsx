import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import LoadingPage from "../../components/Reusable/LoadingPage";
import {roundDecimal} from "../../components/Util/utilFunc";
import {useCart} from "../../context/cart/CartProvider";
import {useTranslations} from "next-intl";
import Button from "../../components/Buttons/Button";
import {useAuth} from "../../context/AuthContext";
import {ApiRoutes} from "../../enums/ApiRoutes";
import {toast} from "react-toastify";
import {initialContextValues} from "../../context/cart/CartContext";
import useFetch from "../../hooks/useFetch";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";

const CheckoutPage = () => {
  const t = useTranslations("CartWishlist");
  const router = useRouter()
  const {cart,updateCart} = useCart();
  const {user} = useAuth();
  const {request, response, loading, error} = useFetch()
  const {request: orderReq, loading: orderLoading} = useFetch()

  useEffect(() => {
    request({url: ApiRoutes.CLIENT_CART})
  }, [])
  const orderHandler = () => {
    orderReq({
      url: ApiRoutes.ADD_ORDER,
      method: "POST",
      data: {
        "__v": response.__v
      }
    }).then(res => {
      toast.success("سفارش شما با موفقیت ثبت شد")
      updateCart(initialContextValues.cart)
      router.push("/orders")
    })
  }

  return (
      <>
        <Header title={`تایید سفارش`}/>
        <LoadingPage loaded={true}>
          <main className="p-4">
            <div>
              <div className=" text-right">
                <h4 className="font-bold">آیا از ثبت سفارش خود مطمئن هستید؟</h4>
                <p>
                  در صورت اطمینان از ثبت سفارش خود دکمه ثبت سفارش را کلیک کنید
                </p>

              </div>
            </div>
            <div className="relative overflow-x-auto  mt-8">
              <table className="w-full text-sm  text-gray-500 text-center whitespace-nowrap">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3">نام محصول</th>
                  <th scope="col" className="px-6 py-3">سایز/تراش</th>
                  <th scope="col" className="px-6 py-3">رنگ</th>
                  <th scope="col" className="px-6 py-3">وزن</th>
                  <th scope="col" className="px-6 py-3">اجرت</th>
                  <th scope="col" className="px-6 py-3">تعداد</th>
                </tr>
                </thead>
                <tbody>
                {
                  cart?.products.map((item: any, index: number) => {
                    return (
                        <tr key={item.productId} className="bg-white border-b  ">
                          <th scope="row"
                              className="px-6 py-4 font-medium text-gray-900">
                            {item.title}
                          </th>
                          <td className="px-6 py-4">
                            {item.sizeName}
                          </td>
                          <td className="px-6 py-4">
                            {item.colorName}
                          </td>
                          <td className="px-6 py-4">
                            {roundDecimal(item.totalWeight) + " " + t("gram")}
                          </td>
                          <td className="px-6 py-4">
                            {item.wage + " " + t("percent")}
                          </td>
                          <td className="px-6 py-4">
                            {item.count}
                          </td>
                        </tr>
                    );
                  })
                }
                </tbody>
              </table>
            </div>
            <div className="mt-6  p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between">
                <span className="uppercase">{t("subtotal")}</span>
                <span>{roundDecimal(cart.totalCartWeight)}</span>
              </div>
              {
                  user?.showWage &&
                  <div className="flex justify-between border-t border-gray-400 mt-2 pt-2">
                      <span className="uppercase">{t("grand_total")}</span>
                      <span>{roundDecimal(cart.totalCartWeightWithWage)}</span>
                  </div>
              }
            </div>
            <div className="flex mt-4 bg-white fixed bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-300">
              <div className="text-center flex-1 py-3" onClick={() => {router.push("/shopping-cart")}}>بازگشت</div>
              <Button value={"ثبت سفارش"} size="sm" extraClass=" flex-1 " disabled={orderLoading}
                      onClick={orderHandler} loading={orderLoading}/>
            </div>
          </main>
        </LoadingPage>
      </>
  );
};

export default CheckoutPage;


export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      messages: (await import(`../../messages/common/${locale}.json`)).default,
    },
  };
};