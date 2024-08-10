"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurantsLatLng } from "../../../../services/redux/slice/globalDataSlice";
import "./style.css";
const HeaderSection = ({ headerdata, restaurantsList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantsList) {
      console.log(headerdata, "headerdata headerdata 999999999999");
      dispatch(setRestaurantsLatLng(restaurantsList));
    }
  }, [restaurantsList]);

  return (
    <div className=" flex flex-col items-center justify-center py-6 container lg:m-auto w-full ">
      <div
        className=" flex items-end relative lg:h-[363px] h-[200px] 2xl:h-[463px] !lg:w-[full] rasponsive_width_banner"
        style={{
          borderRadius: "16px",
          width: "100%",
          background: `linear-gradient(212.84deg, rgba(51, 41, 34, 0) 40.2%, rgba(51, 41, 34, 0.58) 87.13%), url(${headerdata?.restaurant_cover_image}) center/cover no-repeat`,
        }}
      >
        <div className="lg:absolute lg:bottom-10 lg:left-16 px-[15px] pb-[20px]">
          <p className="w-[209px] text-white  text-[18px] lg:text-[22px] font-[600] leading-[22px] lg:py-4 flex items-center">
            {" "}
            <img
              className="w-[30px] lg:w-[30px] h-[30px] mt-[10px] mr-[10px]"
              src={headerdata?.restaurant_image}
              alt=""
            />{" "}
            RESTAURANT
          </p>
          <div className="lg:w-[609px] text-white text-[25px] lg:text-[50px] font-[700] leading-[50px] lg:pb-4">
            <div className="flex ">
              <p className="text-[25px] lg:text-[50px]">
                {headerdata?.restaurant_name}
              </p>
            </div>
          </div>
          <p className="lg:w-[648px] w-full text-white text-[16px] lg:text-[18px] font-[400] leading-[27px] flex">
            {headerdata?.restaurant_short_description}
          </p>

          {/* <img src={headerdata?.restaurant_image} alt={headerdata?.restaurant_image} /> */}

          <div className="flex w-full mt-[10px]">
            <p className="bg-[#fff] text-[#222] lg:px-[15px] px-[5px] rounded-full lg:text-[14px] text-[10px] mr-[10px]">
              {" "}
              {headerdata?.restaurant_status}{" "}
            </p>
            <p className="bg-[#fff] text-[#222] lg:px-[15px] px-[5px] rounded-full lg:text-[14px] text-[10px] mr-[10px]">
              {" "}
              Delivery in {headerdata?.restaurant_delivery_time}{" "}
            </p>
            <p className="bg-[#fff] text-[#222] lg:px-[15px] px-[5px] rounded-full lg:text-[14px] text-[10px] mr-[10px]">
              {" "}
              Min. order {headerdata?.restaurant_minimum_order}{" "}
            </p>
            <p className="bg-[#fff] text-[#222] lg:px-[15px] px-[5px] rounded-full lg:text-[14px] text-[10px] mr-[10px]">
              {headerdata?.restaurant_offer}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
