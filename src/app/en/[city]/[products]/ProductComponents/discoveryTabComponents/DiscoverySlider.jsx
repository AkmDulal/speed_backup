"use client";
// Import Swiper React components
import Image from "next/image";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import { useSelector } from "react-redux";
// import useAxiosGet from "../../../../customHooks/useAxiosGet.js";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const DynamicSwiper = dynamic(
  () => import("swiper/react").then((module) => module.Swiper),
  { ssr: false }
);

function DiscoverySlider() {
  // const [restaurantsList, getRestaurantsList, ] = useAxiosGet()
  // const countryAndCity = useSelector((state) => state.countryCitySlice);
  // console.log(countryAndCity, "countryAndCity countryAndCity");

  // useEffect(() => {
  //   getRestaurantsList(`/discovery/banner/${countryAndCity?.country}/${countryAndCity?.city}`);
  // }, [countryAndCity])

  // console.log(restaurantsList, "restaurantsListrestaurantsList");
  //
  // const slidesPerView =
  //   window.innerWidth > 1024 ? 2 : window.innerWidth > 768 ? 1 : 1;

  const [slidesPerView, setSlidesPerView] = useState(1); // State for slidesPerView

  useEffect(() => {
    const updateSlidesPerView = () => {
      const newSlidesPerView =
        window.innerWidth > 1024 ? 2 : window.innerWidth > 768 ? 1 : 1;
      setSlidesPerView(newSlidesPerView);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const datalist = [
    {
      id: "1",
      title: "Restaurant",
      slogan: "Ravintola Gurkhali",
      text: "Ravintola Gurkhali on aito nepalilainen ravintola. Ammattitaitoiset kokit loihtivat suussa sulavia aitoja alkuperäisiä nepalilaisia herkkuja!",
      images: "./assets/slider/d_banner.png",
    },
    {
      id: "2",
      title: "Restaurant",
      slogan: "Ravintola Gurkhali",
      text: "Ravintola Gurkhali on aito nepalilainen ravintola. Ammattitaitoiset kokit loihtivat suussa sulavia aitoja alkuperäisiä nepalilaisia herkkuja!",
      images: "./assets/slider/d_banner.png",
    },
    {
      id: "3",
      title: "Restaurant",
      slogan: "Ravintola Gurkhali",
      text: "Ravintola Gurkhali on aito nepalilainen ravintola. Ammattitaitoiset kokit loihtivat suussa sulavia aitoja alkuperäisiä nepalilaisia herkkuja!",
      images: "./assets/slider/d_banner.png",
    },
    {
      id: "4",
      title: "Restaurant",
      slogan: "Ravintola Gurkhali",
      text: "Ravintola Gurkhali on aito nepalilainen ravintola. Ammattitaitoiset kokit loihtivat suussa sulavia aitoja alkuperäisiä nepalilaisia herkkuja!",
      images: "./assets/slider/d_banner.png",
    },
  ];
  return (
    <div>
      <DynamicSwiper // Use DynamicSwiper instead of Swiper
        navigation={true}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        className="mySwiper banner_style"
      >
        {datalist?.map((item, i) => (
          <SwiperSlide className="relative w-full " key={i}>
            <Image
              width={500}
              height={200}
              className="w-full rounded-[30px]"
              src={"/" + item?.images}
              alt={item?.title}
            />
            <div className="absolute w-full left-0 bottom-0 text-[#fff] bg-gradient-slider lg:px-[50px] px-[30px] lg:py-[45px] py-[15px] rounded-[30px]">
              <h6 className="lg:text-[22px] text-[16px] font-[600]">
                {" "}
                Restaurant{" "}
              </h6>
              <h3 className="lg:text-[50px] text-[16px] font-bold lg:py-[20px] py-[0px]">
                {" "}
                {item?.title}{" "}
              </h3>
              <p className="lg:w-[100%] text-[#222]  lg:block w-full lg:text-[18px] text-[12px] lg:leading-[30px] leading-[20px] font-[500]">
                {" "}
                {item?.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </DynamicSwiper>
    </div>
  );
}

export default DiscoverySlider;
