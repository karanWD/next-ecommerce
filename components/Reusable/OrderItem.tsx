import React, {FC} from 'react';
import LeftArrow from "../../public/icons/LeftArrow";

type Props = {
    date: string
    status: string
    totalWeight: string
    productsCount: string
}
const OrderItem: FC<Props> = ({date, status, totalWeight, productsCount}) => {
    return (
        <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-200 ">
            <div className="flex flex-col flex-1 text-right">
                <div className="">{date}سفارش -</div>
                <div className="flex flex-row-reverse items-center gap-2">
                    <span className="py-0.5 px-2 text-xs text-gray400 bg-gray-100">{totalWeight}مجموع وزن: </span>
                    <span className="py-0.5 px-2 text-xs text-gray400 bg-gray-100">{productsCount} تعداد: </span>
                    <span></span>
                </div>
            </div>
            <div className="text-gray-400 ">
                <LeftArrow size={"sm"}/>
            </div>
        </div>
    );
};

export default OrderItem;