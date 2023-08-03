import React, {FC} from 'react';
import Image from "next/image";
import {Swiper,SwiperSlide} from "swiper/react"
import {useTranslations} from "next-intl";
import {useAuth} from "../../context/AuthContext";

type Props = {
  images:string[]
  name:string
  wage:number
}
const InfoContainer:FC<Props> = ({images,name,wage}) => {
  const t = useTranslations("Product")
  const {user}=useAuth()
  return (
      <div className="imgSection w-full  h-full text-right">
        <div className="w-full  h-full m-0  bg-gray-100">
          <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{clickable: true,}}
              className="mySwiper"
             breakpoints={{
               560:{
                 slidesPerView:2,
                 spaceBetween:10
               }
             }}
          >
            {
              images.map((image,index)=>(
                  <SwiperSlide key={"PRODUCT_IMAGE_"+index}>
                    <Image
                        className="each-slide w-full"
                        src={image}
                        width={1000}
                        height={700}
                        objectFit="cover"
                        alt={"PRODUCT_IMAGE_"+index}
                    />
                  </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className='p-4'>
          <h2 className='text-2xl block font-bold text-gray800'>{name}</h2>
          {
            user?.showWage &&
              <div className="flex gap-2 mt-3">
                  <span>{t("wage")}:</span>
                  <span>{wage+" "+t("percent")}</span>
              </div>
          }

        </div>
      </div>
  );
};

export default InfoContainer;
