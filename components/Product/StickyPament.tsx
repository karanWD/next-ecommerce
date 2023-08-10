import React, {FC} from 'react';
import {useTranslations} from "next-intl";
import Button from "../Buttons/Button";

type Props = {
  total:number
  isActive:boolean
  loading?:boolean
  clickHandler:()=>void
}

const StickyPayment:FC<Props> = ({total,isActive,clickHandler,loading}) => {
  const t = useTranslations("Product")
  return (
      <div className='fixed bottom-0 w-full bg-white border-t border-gray200 py-2 px-4'>
        <div className="flex items-stretch justify-between gap-8">
          <div className="flex flex-col">
            <h4 className="text-gray400 text-sm">{t("weight")}</h4>
            <div className='rtl'>{total} {t("gram")}  </div>
          </div>
          <div className='flex flex-1 items-center justify-center'>
            <Button value={t("addToCart")} onClick={clickHandler} disabled={!isActive || loading} loading={loading} extraClass="bg-gray500 text-white w-full h-full "/>
          </div>
        </div>
      </div>
  );
};

export default StickyPayment;
