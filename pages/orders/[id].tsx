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
    style: "bg-blue-100 text-blue-400"
  },
  "PENDING": {
    title: "درحال بررسی",
    style: "bg-orange-100 text-orange-400"
  },
  "ACCEPTED": {
    title: "ثبت شده",
    style: "bg-emerald-100 text-emerald-400"
  },
  "CANCELED": {
    title: "لغو شده",
    style: "bg-red-100 text-red-400"
  },
  "DELIVERED": {
    title: "ارسال شده",
    style: "bg-gray-100 text-gray-400"
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
            <div className="flex flex-row-reverse justify-between">
              <div>
                <h2 className="text-xl font-bold">جزئیات سفارش</h2>
                <div>
                  <span>تاریخ: </span>
                  <span>{new Date(response?.createdAt).toLocaleString("fa-ir")}</span>
                </div>
              </div>
              <div>
                <span className={STATUSES[response?.status]?.style + " py-0.25 px-3"}>
                  {STATUSES[response?.status]?.title}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-row-reverse justify-between">
                <h4>
                  محصولات
                </h4>
                <div>
                  (
                  <span>تعداد کل:</span>
                  <span>{response?.products.length}</span>
                  )
                </div>
              </div>
              {
                response?.products.map((item: any, index: number) => {
                  return (
                      <div className="flex flex-col gap-4 border-b-2 border-gray200 py-4"
                           key={item.productId}>
                        <div className=''>
                          <div>{item.title}</div>
                          <div className="flex flex-wrap flex-row-reverse">
                            <div className='text-right w-1/3'>
                              <span className="text-gray-500 text-xs"> سایز:</span>
                              <span className="text-xs mx-2">{item.sizeName}</span>
                            </div>
                            <div className="text-right w-1/3">
                              <span className="text-gray-500 text-xs"> رنگ:</span>
                              <span className="text-xs mx-2">{item.colorName}</span>
                            </div>
                            <div className="text-right w-1/3">
                              <span className="text-gray-500 text-xs"> تعداد:</span>
                              <span className="text-xs mx-2">{item.count}</span>
                            </div>
                            <div className="text-right w-full">
                              <span className="text-gray-500 text-xs"> مجموع وزن:</span>
                              <span className="text-xs mx-2">{roundDecimal(item.totalWeight)+" "+t("gram")}</span>
                            </div>
                            <div className="text-right w-full">
                              <span className="text-gray-500 text-xs"> مجموع وزن با اجرت:</span>
                              <span className="text-xs mx-2">{roundDecimal(item.totalWeightWithWage)+" "+t("gram")}</span>
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
                    <span>{roundDecimal(response?.totalCartWeight)}</span>
                    <span className="uppercase">{t("subtotal")}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span>{roundDecimal(response?.totalCartWeightWithWage)}</span>
                    <span>{t("grand_total")}</span>
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
