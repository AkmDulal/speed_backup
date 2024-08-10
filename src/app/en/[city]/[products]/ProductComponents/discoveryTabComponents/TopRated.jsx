"use client";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import { TbTruckDelivery } from "react-icons/tb";
import "swiper/css";
import "swiper/css/pagination";
import CategoriesCard from "../../../../../Components/Card/CategoriesCard";
import SliderComponents from "../../../../../Components/CommonSlider/SliderComponents";

// import required modules

function TopRated() {
  const datalist = [
    {
      id: "1",
      images: "./assets/images/products/Rectangle_11.svg",
      title: "Burger",
      quantity: "25 Places",
    },
    {
      id: "2",
      images: "./assets/images/products/Rectangle_94.svg",
      title: "Pizza",
      quantity: "25 Places",
    },
    {
      id: "3",
      images: "./assets/images/products/Rectangle_96.svg",
      title: "Salad",
      quantity: "25 Places",
    },
    {
      id: "4",
      images: "./assets/images/products/Rectangle_98.svg",
      title: "Turkinpippuri Seinajoki",
      quantity: "25 Places",
    },
    {
      id: "5",
      images: "./assets/images/products/Rectangle_100.svg",
      title: "Vegan",
      quantity: "25 Places",
    },
    {
      id: "6",
      images: "./assets/images/products/Rectangle_102.svg",
      title: "Kebab",
      quantity: "25 Places",
    },
    {
      id: "7",
      images: "./assets/images/products/Rectangle_98.svg",
      title: "Vegan",
      quantity: "25 Places",
    },
    {
      id: "8",
      images: "./assets/images/products/Rectangle_100.svg",
      title: "Kebab",
      quantity: "25 Places",
    },
  ];
  return (
    <div className="relative mt-[25px]">
      <div className="w-full bg-[#ffe0cc] py-[13px] px-[10px] flex justify-between items-center rounded-[10px]">
        <h3 className="text-brandColor flex items-center lg:text-[20px] text-[20px] font-[700] tracking-tight !leading-[0px]">
          <TbTruckDelivery className="mr-[3px] text-[30px] text-brandColor !leading-[0px] mt-[5px]" />{" "}
          Top Rated
        </h3>

        <button className="bg-brandColor text-[#fff] px-[15px] !leading-[0px] py-[16px] rounded-[10px]">
          See All{" "}
        </button>
      </div>

      <SliderComponents navigation={true} responsiveview="3.5">
        {datalist?.map((item, i) => (
          <SwiperSlide className="w-full" key={i}>
            <CategoriesCard
              item={{
                name: item?.title,
                image: item?.images,
                slug: item?.category_slug,
                alt: item?.category_alt_txt,
                quantity: item?.quantity,
              }}
            />
          </SwiperSlide>
        ))}
      </SliderComponents>
    </div>
  );
}

export default TopRated;
