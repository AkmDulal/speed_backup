"use client";
/* eslint-disable react/prop-types */
import Image from "next/image";
import CategoriesCardLoader from "./CategoriesCardLoader";
function CategoriesCard({ item, clickHandler }) {
  return (
    <>
      {item ? (
        <div
          // onClick={() => clickHandler()}
          className="w-full bg-[#fff] lg:rounded-[25px] rounded-[10px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer "
        >
          <div className="relative w-full">
            {item?.image &&
              (item?.image.startsWith("http") ? (
                <Image
                  width={500}
                  height={500}
                  className="w-full"
                  src={item?.image}
                  alt={item?.alt}
                />
              ) : (
                <Image
                  width={500}
                  height={500}
                  className="w-full"
                  src={"/" + item?.image}
                  alt={item?.alt}
                />
              ))}
          </div>
          <div className="p-[15px] w-full">
            <div className="w-full">
              <h3 className="lg:text-[14px] text-[12px] font-[600] text-[#4B3C32]">
                {/* {item?.name} */}
                {item?.name && item.name.length > 20
                  ? item.name.slice(0, 10) + "..."
                  : item?.name}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <CategoriesCardLoader />
      )}
    </>
  );
}

export default CategoriesCard;
