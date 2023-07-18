import { useTranslations } from "next-intl";
import Image from "next/image";
import TextButton from "../Buttons/TextButton";
import styles from "./Hero.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import {FC} from "react";

SwiperCore.use([Pagination, Navigation, Autoplay]);

type ImageItemType = {
  image: string,
  subtitle?: string,
  titleUp?:string,
  titleDown?: string,
  rightText?: false,
}
type Props={
  images:ImageItemType[]
}
const Slideshow:FC<Props> = ({images}) => {
  const t = useTranslations("Index");

  return (
    <>
      <div className="relative slide-container w-full z-20">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            type: "fraction",
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          {images.map((slider,index) => (
            <SwiperSlide key={"IMAGES_ITEM_"+index}>
              <div className="hidden lg:block">
                <Image
                  layout="responsive"
                  src={slider?.image??"/images/img1.png"}
                  width={572}
                  height={572}
                  alt={"some name"}
                />
              </div>
              <div className="hidden sm:block lg:hidden">
                <Image
                  layout="responsive"
                  src={slider?.image??"/images/img1.png"}
                  width={720}
                  height={720}
                  alt={"some name"}
                />
              </div>
              <div className="sm:hidden">
                <Image
                  layout="responsive"
                  src={slider?.image??"/images/img1.png"}
                  width={800}
                  height={800}
                  alt={"some name"}
                />
              </div>
              <div
                className={
                  slider.rightText
                    ? styles.rightTextSection
                    : styles.leftTextSection
                }
              >
                <span className={styles.subtitle}>{slider.subtitle}</span>
                <span
                  className={`${styles.title} text-center ${
                    slider.rightText ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {slider.titleUp} <br />
                  {slider.titleDown}
                </span>
                <TextButton value={t("shop_now")} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slideshow;
