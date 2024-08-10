"use client";
import Link from "next/link";
import { VscChevronRight } from "react-icons/vsc";

const HomeCountries = ({ countryList }) => {
  return (
    <div className="bg-[#faf7f5] lg:py-[60px] pt-4 md:pt-8">
      <div className=" container mx-auto lg:px-[0px]">
        <h3 className="font-[700] lg:text-[35px] text-[20px] md:mb-[30px] mb-[20px] text-[#332922]">
          {" "}
          Explore Sped countries
        </h3>
        <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4">
          {countryList?.length &&
            countryList?.map((item, i) => (
              <div key={i} className="lg:col-span-3 md:col-span-6 ">
                <Link
                  href={`/en/${item.country_code}`}
                  className="flex w-full relative rounded-[10px] border-2 border-[#EBDDD3] py-[7px] md:py-[10px] px-[20px] items-center cursor-pointer"
                  // onClick={() => redirectToCityPage(item.countryCode)}
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
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCountries;
