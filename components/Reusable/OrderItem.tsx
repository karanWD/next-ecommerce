import React, {FC} from 'react';
import LeftArrow from "../../public/icons/LeftArrow";
import {OrderItemType} from "../../types";

const STATUSES = {
  "NEW": {
    title: "جدید",
    style: "bg-blue-100 text-blue-400"
  },
  "PENDING": {
    title: "درحال بررسی",
    style: "bg-orange-100 text-orange-400"
  },
  "REGISTERED": {
    title: "ثبت شده",
    style: "bg-emerald-100 text-emerald-400"
  },
  "CANCELED": {
    title: "لغو شده",
    style: "bg-red-100 text-red-400"
  },
  "DELIVERED": {
    title: "تحویل داده شده",
    style: "bg-gray-100 text-gray-400"
  }
}

const OrderItem: FC<OrderItemType> = ({createdAt, status, totalWeight, numberOfProducts}) => {
  const STYLE = STATUSES[status].style + " " + "text-sm py-0.25 px-3"
  return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
        <div className="flex flex-col flex-1 text-right">
          <div className="rtl">سفارش - {new Date(createdAt).toLocaleString("fa-ir")}</div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className={STYLE}>{STATUSES[status].title}</span>
            <span className="  py-0.25 px-3 text-sm text-gray400 bg-gray-100 rtl"> مجموع وزن: {totalWeight}</span>
            <span className="  py-0.25 px-3 text-sm text-gray400 bg-gray-100 rtl"> تعداد: {numberOfProducts}</span>
          </div>
        </div>
        <div className="text-gray-600 ">
          <LeftArrow size={"sm"}/>
        </div>
      </div>
  );
};

export default OrderItem;