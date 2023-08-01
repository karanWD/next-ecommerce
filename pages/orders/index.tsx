import React, {useEffect} from 'react';
import {GetStaticProps} from "next";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import LoadingPage from "../../components/Reusable/LoadingPage";
import Link from "next/link";
import {ApiRoutes} from "../../enums/ApiRoutes";
import OrderItem from "../../components/Reusable/OrderItem"
import {roundDecimal} from "../../components/Util/utilFunc";
import {OrderItemType} from "../../types";


const OrdersPage = () => {
  const {request, response, loading} = useFetch()
  useEffect(() => {
    request({url: ApiRoutes.USER_ORDERS})
  }, [])

  return (
      <>
        <Header/>
        <LoadingPage loaded={!loading && response}>
          <div className="text-xl font-bold text-right p-4 pb-2 flex  items-center gap-2">
            <span>سفارشات</span>
            <span className="flex text-sm">
              (
              <span>عدد</span>
              <span>{response?.orders?.length}</span>
              )
            </span>
          </div>

          {
            response?.orders.map((item:OrderItemType, index: number) => {
              return (
                  <Link href={"orders/" + item._id} key={"ORDER_ITEM_INDEX+" + index}>
                    <a>
                      <OrderItem createdAt={item.createdAt} status={item.status}
                                 totalWeight={+roundDecimal(item.totalWeight as number)}
                                 numberOfProducts={item.numberOfProducts}
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
