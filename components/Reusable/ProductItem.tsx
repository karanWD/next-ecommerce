import React, {FC} from 'react';
import Image from "next/image";
import {useTranslations} from "next-intl";
import Link from "next/link"
import {ProductItemType} from "../../types";
import {useAuth} from "../../context/AuthContext";

interface ProductCardType extends ProductItemType {
    weight: string
    link:string
}

const ProductItem: FC<ProductCardType> = ({thumbnail, title, weight, wage, link}) => {
    const t = useTranslations("Product");
    const {user}=useAuth()
    return (
        <Link href={link}>
            <a>
                <div className='text-right'>
                    <div><Image width={250} height={250} layout='responsive' src={thumbnail ?? 'images/img1.png'}/></div>
                    <div className="my-2">{title}</div>
                    <div className='flex gap-2 flex-row items-center'>
                        <div className="text-xs text-gray400">{t("weight")+":"}</div>
                        <div className='flex flex-row gap-1'>
                            <span className='text-sm'>{weight}</span>
                            <span className='text-xs text-gray400'>{t("gram")}</span>
                        </div>
                    </div>
                    {
                        user?.showWage &&
                        <div className='flex gap-2 flex-row items-center'>
                            <div className="text-xs text-gray400">{t("wage") + ":"}</div>
                            <div className='flex flex-row gap-1'>
                                <span className='text-sm'>{wage}</span>
                                <span className='text-xs text-gray400'>{t("percent")}</span>
                            </div>
                        </div>
                    }
                </div>
            </a>
        </Link>

    );
};

export default ProductItem;