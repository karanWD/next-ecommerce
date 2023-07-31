import React, {FC} from 'react';
import ProductItem from "../../Reusable/ProductItem";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper/core";

type Props = {
    title: string
    desc: string
    products: any[] | undefined
}
const ProductsContainer: FC<Props> = ({title, desc, products}) => {
    return (
        <section className="app-max-width app-x-padding w-full h-full flex flex-col justify-center my-6">
            <div className="flex justify-center">
                <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-6">
                    <h2 className="text-2xl mb-2">{title}</h2>
                    <span className='text-gray400'>{desc}</span>
                </div>
            </div>
            <div dir="rtl">
                <Swiper
                    slidesPerView={1.6}
                    spaceBetween={10}
                    loop={false}
                    navigation={true}
                    className="mySwiper"
                >
                    {products?.map((item, index) => {
                        const weightText = item.minWeight === item.maxWeight ? item.minWeight : item.minWeight + "-" + item.maxWeight
                        return (
                            <SwiperSlide key={"IMAGES_ITEM_" + index}>
                                <div key={"PRODUCT_ITEM_" + index} className='col-span-2 md:col-span-1'>
                                    <ProductItem weight={weightText} title={item.title} link={"products/" + item.slug}
                                                 thumbnail={item.thumbnail} wage={item.wage}/>
                                </div>
                            </SwiperSlide>

                        )
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductsContainer;