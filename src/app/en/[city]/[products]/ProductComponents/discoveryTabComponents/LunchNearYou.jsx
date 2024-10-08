"use client";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { MdOutlineDeliveryDining } from "react-icons/md";
import ProductCard from "../../../../../Components/Card/ProductCard";
import SliderComponents from "../../../../../Components/CommonSlider/SliderComponents";

function LunchNearYou() {
  const datalist = [
    {
      id: "1",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "2",
      images: "./assets/images/products/Rectangle_74.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "3",
      images: "./assets/images/products/Rectangle_76.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: false,
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "4",
      images: "./assets/images/products/Rectangle_78.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "5",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "6",
      images: "./assets/images/products/Rectangle_74.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
  ];
  return (
    <div className="relative mt-[25px]">
      {/* <h3 className="text-titleColor lg:text-[35px] text-[20px] font-[700] tracking-tight absolute top-[30px] lg:mb-[15px]">
        Lunch Near You
        </h3> */}

      <div className="w-full bg-[#ffe0cc] py-[13px] px-[10px] flex justify-between items-center rounded-[10px]">
        <h3 className="text-brandColor flex items-center lg:text-[20px] text-[20px] font-[700] tracking-tight !leading-[0px]">
          Lunch Near You
        </h3>

        <button className="bg-brandColor text-[#fff] px-[15px] !leading-[0px] py-[16px] rounded-[10px]">
          See All{" "}
        </button>
      </div>

      <SliderComponents navigation={true} responsiveview="1.5">
        {datalist?.map((item, i) => (
          <SwiperSlide className="w-full" key={i}>
            <ProductCard
              item={{
                name: item?.title,
                image: item?.images,
                alt: item?.text,
                deliveryTime: item?.delivery_time,
                rating: item?.rating || 4.5,
                status: item?.status === "Open" ? false : true,
                offer:
                  item?.restaurant_offer === "Free Delivery" ? true : false,
                description: item?.restaurant_description || "test desc",
                price: item?.price,
                icon: item?.icon,
              }}
            />
          </SwiperSlide>
        ))}
      </SliderComponents>
    </div>
  );
}

export default LunchNearYou;
