"use client";
import { useState } from "react";
import { MdTune } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import CategoriesCard from "../../../../../Components/Card/CategoriesCard.jsx";
import SliderComponents from "../../../../../Components/CommonSlider/SliderComponents";
import DefaultModal from "../../../../../Components/Modals/DefaultModal";

const dataToSend = [
  { id: "1", name: "American" },
  { id: "2", name: "Burger" },
  { id: "3", name: "Chicken" },
  { id: "4", name: "Falafel" },
  { id: "5", name: "Indian" },
  { id: "6", name: "Kebab" },
  { id: "7", name: "Mediterranean" },
  { id: "8", name: "Nepalese" },
  { id: "9", name: "Pizza" },
  { id: "10", name: "Salad" },
  { id: "11", name: "Sandwich" },
  { id: "12", name: "Steak" },
  { id: "13", name: "Street food" },
  { id: "14", name: "Vegan" },
  { id: "15", name: "Vegetarian" },
];
const currencylist = [
  { id: "1", name: "€" },
  { id: "2", name: "€€" },
  { id: "3", name: "€€€" },
  { id: "4", name: "€€€€" },
];
const sortBy = [
  { id: "1", name: "Recommended" },
  { id: "2", name: "Delivery price" },
  { id: "3", name: "Rating" },
  { id: "4", name: "Delivery time" },
  { id: "5", name: "Distance" },
];

const ModalData = () => {
  const [activeSort, setActiveSort] = useState(sortBy[0].id);
  const handleSortClick = (id) => {
    setActiveSort(id);
  };

  return (
    <div>
      {dataToSend?.map((item, i) => (
        <button
          key={i}
          className="bg-[#FFF0E7] font-[500] mr-[15px] mb-[15px] text-brandColor text-[15px] py-[5px] px-[20px] rounded-[50px]"
        >
          {item?.name}
        </button>
      ))}

      <div className="">
        <h3 className="text-[22px] font-[500] mb-[10px]"> Price </h3>
        {currencylist?.map((item, i) => (
          <button
            key={i}
            className="bg-[#FFF0E7] font-[500] mr-[15px] mb-[15px] text-brandColor text-[15px] py-[5px] px-[20px] rounded-[50px]"
          >
            {item?.name}
          </button>
        ))}
      </div>
      <div className="">
        <h3 className="text-[20px] font-[500] mb-[10px]"> Sort by </h3>
        {sortBy.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSortClick(item.id)}
            className={`bg-[#EEE6E1] font-[500]  border-2 border-[#8C837E] mr-[25px] mb-[15px] text-[#94857B] text-[15px] py-[5px] px-[30px] rounded-[50px] ${
              activeSort === item.id
                ? "!bg-[#FFE0CC] !text-[#FF751A]  !border-2 !border-[#FF6600]"
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

function BrowseCategoriesPages({ categoriesDataList }) {
  const [showModal, setShowModal] = useState(false);
  // console.log(categoriesDataList, "categoriesDataList categoriesDataList");
  return (
    <div className="relative mt-[25px]">
      <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 rounded-[30px] lg:pt-[50px] pt-[0px]">
        <div className="lg:col-span-6 md:col-span-6 col-span-6">
          <h3 className="text-[#332922] lg:text-[35px] text-[20px]">
            Restaurants near me
          </h3>
          <p className="text-[14px] text-[#FF6600] font-[400]">
            Learn how we find and sort search results
          </p>
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-6 flex items-center justify-end lg:mb-[15px] mb-[0px]">
          <h3 className="text-[#FF6600] text-[18px] font-[400] ">
            Sorted by recommended
          </h3>
          <div className="bg-[#FD822F3B] w-[50] h-[50] rounded-full flex items-center justify-center p-[5px] ml-[15px]">
            <MdTune
              className="text-brandColor text-[18px] cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>

          <DefaultModal
            title={"Filter"}
            showModal={showModal}
            setShowModal={setShowModal}
          >
            <ModalData />
          </DefaultModal>
        </div>
      </div>

      <SliderComponents navigation={true} responsiveview="3.5">
        {categoriesDataList?.map((item, i) => (
          <SwiperSlide className="relative w-full  " key={i}>
            <CategoriesCard
              item={{
                name: item?.category_name,
                image: item?.category_image,
                slug: item?.category_slug,
                alt: item?.category_alt_txt,
              }}
              clickHandler={() => {
                navigate(
                  `/en/${countryCode}/${city}/category/${item?.category_slug}`
                );
              }}
            />
          </SwiperSlide>
        ))}
      </SliderComponents>
    </div>
  );
}

export default BrowseCategoriesPages;
