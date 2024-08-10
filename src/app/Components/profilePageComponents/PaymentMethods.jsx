"use client";
import { FaMoneyBills, FaPlus } from "react-icons/fa6";
import cardIcon from "../../assets/icons/cardIcon.svg";
import googlePay from "../../assets/icons/googlePay.svg";
import Klarna from "../../assets/icons/Klarna.svg";

const PaymentMethods = () => {
  return (
    <div className="w-full  mt-10 pb-[200px]">
      <div>
        <p className="text-[32px] leading-[32px] font-[700] text-[#332922]">
          Payment methods
        </p>
        <p className="text-[22px] leading-[22px] font-[700] text-[#332922] mt-8">
          Credit and debit cards
        </p>
        <div className="flex mt-8">
          <FaPlus className="h-[20px]" />{" "}
          <p className="text-[16px] font-[600] leading-[16px] pr-3">
            Add payment method
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-[22px] leading-[22px] font-[700] text-[#332922] mt-10">
          Other payment option{" "}
        </p>
        <div className="w-full h-[88px] flex justify-between items-center mt-6 border-b-[1px] border-[#E0DAD6]">
          <div className="flex">
            <div>
              <img src={cardIcon} alt="" />
            </div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
              Edenred
            </p>
          </div>
          <div>
            <button className="text-[16px] leading-[16px] font-[600] text-brandColor px-[25px] py-[15px] bg-[#FFE0CC] rounded-[12px]">
              Active
            </button>
          </div>
        </div>
        <div className="w-full h-[88px] flex justify-between items-center mt-3 border-b-[1px] border-[#E0DAD6]">
          <div className="flex">
            <div>
              <img src={googlePay} alt="" />
            </div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
              Google Pay
            </p>
          </div>
          <div>
            <button className="text-[16px] leading-[16px] font-[600] text-brandColor px-[25px] py-[15px] bg-[#FFE0CC] rounded-[12px]">
              Active
            </button>
          </div>
        </div>
        <div className="w-full h-[88px] flex justify-between items-center mt-3">
          <div className="flex">
            <div>
              <img src={Klarna} alt="" />
            </div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
              Klarna
            </p>
          </div>
          <div>
            <button className="text-[16px] leading-[16px] font-[600] text-brandColor px-[25px] py-[15px] bg-[#FFE0CC] rounded-[12px]">
              Active
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-[22px] leading-[22px] font-[700] text-[#332922] mt-6">
          Cash on delivery
        </p>
        <div className="w-full h-[88px] flex justify-between items-center mt-4 ">
          <div className="flex items-center">
            <div>
              <FaMoneyBills />
            </div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
              Cash on delivery
            </p>
          </div>
          <div>
            <button className="text-[16px] leading-[16px] font-[600] text-brandColor px-[25px] py-[15px] bg-[#FFE0CC] rounded-[12px]">
              Active
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
