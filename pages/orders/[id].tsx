import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import {GetServerSideProps} from "next";
import {roundDecimal} from "../../components/Util/utilFunc";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";
import {ApiRoutes} from "../../enums/ApiRoutes";
import LoadingPage from "../../components/Reusable/LoadingPage";


const STATUSES = {
  "NEW": {
    title: "جدید",
    style: "bg-blue-50 text-blue-400"
  },
  "PENDING": {
    title: "درحال بررسی",
    style: "bg-orange-50 text-orange-400"
  },
  "REGISTERED": {
    title: "ثبت شده",
    style: "bg-emerald-50 text-emerald-400"
  },
  "CANCELED": {
    title: "لغو شده",
    style: "bg-red-50 text-red-400"
  },
  "DELIVERED": {
    title: "تحویل داده شده",
    style: "bg-gray-50 text-gray-400"
  }
}

const OrderDetail = () => {
  const t = useTranslations("CartWishlist");
  const router = useRouter()
  const {id} = router.query
  const {response, request, loading} = useFetch()

  useEffect(() => {
    request({url: ApiRoutes.USER_ORDERS + "/" + id})
  }, [])

  return (
      <>
        <Header/>
        <LoadingPage loaded={!loading && response}>
          <div className="app-x-padding py-4 text-right">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">جزئیات سفارش</h2>
                <div>
                  <span>تاریخ: </span>
                  <span>{new Date(response?.createdAt).toLocaleString("fa-ir",{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</span>
                </div>
              </div>
              <div>
                <span className={STATUSES[response?.status]?.style + " py-0.25 px-3"}>
                  {STATUSES[response?.status]?.title}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <h4>
                  محصولات
                </h4>
                {/*<div>*/}
                {/*  (*/}
                {/*  <span>تعداد کل:</span>*/}
                {/*  <span>{response?.products.length}</span>*/}
                {/*  )*/}
                {/*</div>*/}
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
                    response?.products.map((item: any, index: number) => {
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

              <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0 text-right">
                <div className="border border-gray500 divide-y-2 divide-gray200 p-6">
                  <h2 className="text-xl mb-3">{t("invoice")}</h2>
                  <div className="flex justify-between py-2">
                    <span className="uppercase">{t("subtotal")}</span>
                    <span>{roundDecimal(response?.totalCartWeight)}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span>{t("grand_total")}</span>
                    <span>{roundDecimal(response?.totalCartWeightWithWage)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingPage>
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
