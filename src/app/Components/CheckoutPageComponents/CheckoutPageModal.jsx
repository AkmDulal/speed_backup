"use client";
import { useState } from "react";
import { GoClockFill } from "react-icons/go";
import { IoBicycle } from "react-icons/io5";
// import { GoHomeFill } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
const CheckoutPageModal = () => {
  const [isCheckedDelivery, setCheckedDelivery] = useState(false);
  const [isCheckedTakeaWay, setCheckedTakeaWay] = useState(false);
  const [isAsSoonAsPossible, setAsSoonAsPossible] = useState(false);
  const [isSchedule, setSchedule] = useState(false);
  const [changeButton, setChangeButton] = useState(true);
  const [changeWhenButton, setChangeWhenButton] = useState(true);
  const handleCheckboxChange = (value) => {
    if (value === "delivery") {
      setCheckedDelivery(!isCheckedDelivery);
    } else if (value === "takeway") {
      setCheckedTakeaWay(!isCheckedTakeaWay);
    } else if (value === "assoonas") {
      setAsSoonAsPossible(!isAsSoonAsPossible);
    } else if (value === "schedule") {
      setSchedule(!isSchedule);
    }
  };
  const handleChangeButton = () => {
    setChangeButton(false);
  };
  const handleWhenChangeButton = () => {
    setChangeWhenButton(false);
  };
  return (
    <div className="w-[450px]  ">
      <div>
        <p className="text-[24px] leading-[24px] font-[700] my-6">How?</p>
        <div className="flex justify-between items-center border-b-[1px] border-[#E0DAD6] pb-7">
          {changeButton ? (
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#DBD6D3] w-[38px] h-[38px] flex justify-center items-center">
                <IoBicycle />
              </div>
              <div className="px-3">
                <p className="text-[16px] leading-[16px] font-[600] ">
                  Delivery
                </p>
                <p className="text-[14px] leading-[14px] font-[400] text-[#9b9b9a] mt-1">
                  1.51 km delivery distance
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  checked={isCheckedDelivery}
                  onChange={() => handleCheckboxChange("delivery")}
                  className=" h-4 w-4 accent-[#ed6002] cursor-pointer"
                />

                <div className="px-3">
                  <p
                    className={` ${
                      isCheckedDelivery ? "text-[#171411]" : "text-[#9b9b9a]"
                    } text-[16px] leading-[16px] font-[600] `}
                  >
                    Delivery
                  </p>
                  <p className="text-[14px] leading-[14px] font-[400] text-[#9b9b9a] mt-1">
                    1.51 km delivery distance
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  checked={isCheckedTakeaWay}
                  onChange={() => handleCheckboxChange("takeway")}
                  className=" h-4 w-4 accent-[#ed6002] cursor-pointer"
                />

                <div className="px-3 ">
                  <p
                    className={` ${
                      isCheckedTakeaWay ? "text-[#332922]" : "text-[#9b9b9a]"
                    } text-[16px] leading-[16px] font-[600] `}
                  >
                    Takeaway
                  </p>
                  <p className="text-[14px] leading-[14px] font-[400] text-[#9b9b9a] mt-1">
                    I’ll pick it up my self
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* {conditional part} */}

          {changeButton ? (
            <div
              className="px-[25px] py-[10px] bg-[#FFF0E7] h-[34px] flex justify-center items-center rounded-[20px]"
              onClick={() => handleChangeButton()}
            >
              <button className="text-[14px] leading-[14px] font-[400] text-[#FF6600] cursor-pointer">
                Change
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        <p className="text-[24px] leading-[24px] font-[700] my-6">How?</p>
        <div className="flex justify-between items-center  pb-7">
          {changeWhenButton ? (
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#DBD6D3] w-[38px] h-[38px] flex justify-center items-center">
                <GoClockFill />
              </div>
              <div className="px-3">
                <p className="text-[16px] leading-[16px] font-[600] ">
                  As soon as possible
                </p>
                <p className="text-[14px] leading-[14px] font-[400] text-[#9b9b9a] mt-1">
                  You will get your order in 20-30 min
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  checked={isAsSoonAsPossible}
                  onChange={() => handleCheckboxChange("assoonas")}
                  className=" h-4 w-4 accent-[#ed6002] cursor-pointer"
                />

                <div className="px-3">
                  <p
                    className={` ${
                      isAsSoonAsPossible ? "text-[#171411]" : "text-[#9b9b9a]"
                    } text-[16px] leading-[16px] font-[600] `}
                  >
                    As soon as possible
                  </p>
                  <p className="text-[14px] leading-[14px] font-[400] text-[#9b9b9a] mt-1">
                    You will get your order in 20-30 min
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  checked={isSchedule}
                  onChange={() => handleCheckboxChange("schedule")}
                  className=" h-4 w-4 accent-[#ed6002] cursor-pointer"
                />

                <div className="px-3 ">
                  <p
                    className={` ${
                      isSchedule ? "text-[#332922]" : "text-[#9b9b9a]"
                    } text-[16px] leading-[16px] font-[600] `}
                  >
                    Schedule for letter
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* {conditional part} */}

          {changeWhenButton ? (
            <div
              className="px-[25px] py-[10px] bg-[#FFF0E7] h-[34px] flex justify-center items-center rounded-[20px]"
              onClick={() => handleWhenChangeButton()}
            >
              <button className="text-[14px] leading-[14px] font-[400] text-[#FF6600] cursor-pointer">
                Change
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {isSchedule ? (
        <div className="w-full mt-4 flex">
          <div className="w-4/5 leading-[20px] h-[56px] bg-[#EDE7E4] text-[20px] font-[400] text-[#94857B] rounded-[12px] flex justify-between px-4 items-center ">
            <p className="text-[16px] leading-[16px] font-[400]">Select date</p>
            <FaChevronDown className="fill-[#94857B] w-4 h-4" />
          </div>
          <div className="w-2/5 ml-2 h-[56px] bg-[#EDE7E4] text-[20px] font-[400] text-[#94857B] rounded-[12px] flex justify-between px-4 items-center">
            <p className="text-[16px] leading-[16px] font-[400]">Select time</p>
            <FaChevronDown className="fill-[#94857B] w-4 h-4" />
          </div>
        </div>
      ) : null}

      <div className="w-full mt-12">
        <button className="w-full h-[56px] bg-brandColor text-[20px] font-[400] text-white rounded-[12px] shadow-sm shadow-brandColor ">
          Done
        </button>
      </div>
    </div>
  );
};

export default CheckoutPageModal;
