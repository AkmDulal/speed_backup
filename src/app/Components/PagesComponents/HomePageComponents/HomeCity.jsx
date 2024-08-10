"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryCity,
  setDocuments,
} from "../../../services/redux/slice/globalDataSlice";

const HomeCity = ({ countryList, cityList }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCity, setIsCity] = useState(true);
  const selectedAddress = useSelector(
    (state) => state?.reducer?.addressSlice?.documents
  );

  console.log(
    selectedAddress,
    "selectedAddress selectedAddress selectedAddressselectedAddressselectedAddressselectedAddressselectedAddress"
  );

  const handleClick = (value) => {
    if (value === "oneTime") {
      setIsCity(false);
    } else {
      setIsCity(!isCity);
    }
  };

  return (
    <div className="bg-[#faf7f5] md:py-[60px] py-[30px]">
      <div className=" mx-auto container lg:px-[0px] ">
        <div className="w-full flex justify-between md:mb-10 items-center ">
          <h3 className="font-[700] lg:text-[35px] text-[22px] md:mb-[0px] mb-[30px] px-2 md:px-0">
            Explore Sped cities
          </h3>
          <div className="md:flex items-center hidden">
            <p className="px-2 text-[16px] leading-[16px] font-[400] ">
              {cityList?.length ? (
                <span className="text-[#5b9dff] cursor-pointer">
                  {cityList[0]?.country?.country_name}
                </span>
              ) : null}
            </p>
            <p
              className="px-2 text-[16px] leading-[16px] font-[400] text-[#030303] cursor-pointer underline"
              onClick={() => handleClick("oneTime")}
            >
              {isCity ? "All countries" : "All countries"}
            </p>
          </div>
        </div>

        <div className="w-full md:flex">
          <div className="md:w-2/5 lg:w-1/5 w-full  mb-8">
            <div className="w-full flex justify-between md:flex-col">
              <div className="md:mt-3 flex items-center ">
                {isCity ? (
                  <img
                    className="h-[40px] w-[55px] border-2 border-[#EBDDD3] rounded-[10px]"
                    src={
                      cityList?.length
                        ? `${cityList[0]?.country?.country_image}`
                        : ""
                    }
                    alt=""
                  />
                ) : null}
                <p className="px-2 text-[20px] md:text-[24px] leading-[18px] font-[400] ">
                  {isCity && cityList?.length
                    ? `${cityList[0]?.country?.country_name}`
                    : "All countries"}
                </p>
              </div>
              <div className=" flex items-center md:mt-6">
                <p
                  className="px-2 text-[16px] leading-[16px] font-[400] text-[#5b9dff] cursor-pointer"
                  onClick={() => handleClick()}
                >
                  {isCity
                    ? "Show all countries"
                    : `
                  ${
                    cityList?.length
                      ? `Show ${cityList[0]?.country?.country_name}`
                      : "All countries"
                  }`}
                </p>
              </div>
            </div>
          </div>
          {isCity ? (
            <div className="grid lg:grid-cols-12 md:grid-cols-12 md:gap-6 gap-4 w-full md:w-4/5 ">
              {cityList?.length
                ? cityList?.map((item, i) => (
                    <div key={i} className="lg:col-span-3 md:col-span-6 ">
                      <Link
                        href={`/en/${item?.country?.country_code}/${item?.city_name}`}
                      >
                        <div
                          onClick={() => {
                            const modifiedData = {
                              ...selectedAddress,
                              latitude: "",
                              longitude: "",
                            };
                            dispatch(setDocuments(modifiedData));

                            dispatch(
                              setCountryCity({
                                country: item?.country?.country_code,
                                city: item?.city_name,
                                lat: "",
                                lng: "",
                              })
                            );
                            router.push(
                              `/en/${item?.country?.country_code}/${item?.city_name}`
                            );
                            // navigate(
                            //   `/en/${item?.country?.country_code}/${item?.city_name}`
                            // );
                          }}
                          className="flex w-full relative justify-between rounded-[10px] border-2 border-[#EBDDD3] py-[7px] md:py-[10px] px-[20px] items-center cursor-pointer"
                        >
                          <p className="text-[16px] text-[#000] font-[400] ml-[15px]">
                            {" "}
                            {item?.city_name}{" "}
                          </p>
                          <VscChevronRight className=" text-[20px]" />
                        </div>
                      </Link>
                    </div>
                  ))
                : null}
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 md:grid-cols-12 md:gap-4 gap-4 md:w-4/5 w-full">
              {countryList?.length &&
                countryList?.map((item, i) => (
                  <div key={i} className="lg:col-span-3 md:col-span-6   ">
                    <div
                      onClick={() => {
                        handleCityData(`${item?.country_code}`);
                      }}
                      className="flex w-full relative rounded-[10px] border-2 border-[#EBDDD3] py-[7px] md:py-[10px] px-[20px] items-center cursor-pointer"
                    >
                      <img
                        src={item?.country_image}
                        alt={item?.alt_image}
                        className="h-[20px] w-auto md:h-[30px] md:w-auto shadow-md"
                      />
                      <p className="text-[16px] text-[#000] font-[400] ml-[15px]">
                        {" "}
                        {item?.country_name}{" "}
                      </p>
                      <VscChevronRight className="absolute right-2 text-[20px]" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCity;
