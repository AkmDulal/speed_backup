"use client";
/* eslint-disable react/prop-types */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Navigation } from "swiper/modules";
import "./style.css";

const DynamicSwiper = dynamic(
  () => import("swiper/react").then((module) => module.Swiper),
  { ssr: false }
);

function SliderComponents({
  children,
  navigation,
  mousewheel,
  responsiveview,
}) {
  // const slidesPerView =
  // window.innerWidth > 1024
  //   ? 5
  //   : window.innerWidth > 768
  //   ? 4
  //   : Number(responsiveview);
  // const spaceBetween = window.innerWidth > 1024 ? 30 : 5;

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const newSlidesPerView =
        window.innerWidth > 1024
          ? 5
          : window.innerWidth > 768
          ? 4
          : Number(responsiveview);
      // const spaceBetween = window.innerWidth > 1024 ? 30 : 5;
      setSlidesPerView(newSlidesPerView);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <div className="relative mt-[25px]">
      {/* <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={navigation}
        modules={[Navigation, Mousewheel]}
        mousewheel={mousewheel}
        className="mySwiper relative iconClass"
      > */}
      <DynamicSwiper // Use DynamicSwiper instead of Swiper
        navigation={true}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        modules={[Navigation, Mousewheel]}
        mousewheel={mousewheel}
        className="mySwiper relative iconClass"
      >
        {children}
      </DynamicSwiper>
    </div>
  );
}

export default SliderComponents;
