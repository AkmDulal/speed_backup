"use client";
/* eslint-disable react/prop-types */
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import "./style.css";
function ModalSliderComponents({ children, perView, navigation }) {
  const slidesPerView =
    window.innerWidth > 1024
      ? Number(perView)
      : window.innerWidth > 768
      ? Number(perView)
      : 1;
  const spaceBetween = window.innerWidth > 1024 ? 30 : 20;
  return (
    <div className="relative mt-[25px]">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={navigation}
        modules={[Navigation]}
        className="mySwiper relative iconClassMobile"
      >
        {children}
      </Swiper>
    </div>
  );
}

export default ModalSliderComponents;
