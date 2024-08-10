"use client";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";

const NotificationSection = () => {
  return (
    <div className="container mx-auto hidden">
      <div className="h-[72px] bg-white rounded-[15px] flex  items-center px-6 justify-around">
        <div className="flex">
          <GoClock className="text-[20px]" />
          <p className="text-[18px] font-[400] leading-[18px] w-[190px] px-3">
            {" "}
            Open until 10:00 PM
          </p>
        </div>
        <div className="flex items-center ">
          <BsEmojiSmileFill className="fill-[#f9cd07]  bg-[#000000] rounded-full text-[22px]" />
          <p className="text-[18px] font-[400] leading-[18px]  px-4">8.4</p>
        </div>
        <div className="flex">
          <AiFillInfoCircle className="fill-brandColor text-[22px]" />
          <p className="text-[18px] font-[400] leading-[18px] text-brandColor px-3">
            {" "}
            See more information
          </p>
        </div>
        <div className="flex items-center">
          <div className="h-[40px] w-[273px] rounded-[12px] bg-[#E5DFDA] flex items-center px-4">
            <IoSearchSharp className="fill-[#94857b] text-[28px]" />
            <p className="text-[16px] text-center font-[400] leading-[18px] text-[#94857b] px-3">
              Search in Deniss Forssa
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <BiUserPlus className="fill-brandColor" />
          <p className="text-[18px] font-[400] leading-[18px] text-brandColor px-3">
            Order together
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotificationSection;
