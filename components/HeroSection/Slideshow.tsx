import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import {FC} from "react";

SwiperCore.use([Pagination, Navigation, Autoplay]);

type ImageItemType = {
  link: string,
  title:string
}
type Props={
  images:ImageItemType[]
}
const Slideshow:FC<Props> = ({images}) => {
  const t = useTranslations("Index");

  return (
    <>
      <div className="relative slide-container w-full z-20" dir="rtl">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          navigation={true}
          // pagination={{
          //   clickable: true,
          //   type: "fraction",
          //   dynamicBullets: true,
          // }}
          className="mySwiper"
        >
          {images.map((slider,index) => (
            <SwiperSlide key={"IMAGES_ITEM_"+index}>
              <div className="hidden lg:block">
                <Image
                  layout="responsive"
                  src={slider?.link??"/images/img1.png"}
                  width={572}
                  height={336}
                  alt={slider?.title}
                />
              </div>
              <div className="hidden sm:block lg:hidden">
                <Image
                  layout="responsive"
                  src={slider?.link??"/images/img1.png"}
                  width={720}
                  height={360}
                  alt={slider?.title}
                />
              </div>
              <div className="sm:hidden">
                <Image
                  layout="responsive"
                  src={slider?.link??"/images/img1.png"}
                  width={375}
                  height={125}
                  alt={slider?.title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slideshow;
