/* eslint-disable react/prop-types */
import { BiMessageDots } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { LiaNewspaperSolid } from "react-icons/lia";
import time from "../../assets/images/Time.png";

const TimeModal = ({
  showModal,
  setShowModal,
  children,
}) => {
  return (
    <div className="relative">
      {showModal ? (
        <>
          <div
            className="fixed top-0 left-0 z-50 w-full h-full bg-[#000] opacity-50 backdrop-blur-lg"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-[#faf4f000] p-3 sm:p-10 rounded-[10px] md:rounded-[30px] max-w-[600px] w-11/12 sm:w-auto">
            <div className="flex  items-center relative w-full h-full">
                <img src={time} alt="" className="w-full h-full" />

                <div className="w-[210px] h-[210px] bg-[#FAF4F0] absolute rounded-full top-0 left-40 flex justify-center items-center ">
                <div className="w-[190px] h-[190px] border-[10px]  border-[#E8E8E8] rounded-full flex justify-center items-center">

                    <div className="w-[150px] h-[150px] border-[1px]  border-[#E8E8E8] rounded-full flex justify-center items-center">

                        <div>
                            <p className="text-[50px] leading-[55px] font-[700] text-center">35</p>
                            <p className="text-[16px] leading-[16px] font-[400] text-[#94857B] text-center mt-1">Minutes <br/>until delivery</p>
                        </div>

                    </div>
                    

                    </div>

                </div>
              
              <div
                onClick={() => setShowModal(false)}
                className="absolute right-[30px] w-[25px] h-[25px] sm:w-[40px] cursor-pointer sm:h-[40px] rounded-full bg-[#FFE0CC] flex items-center justify-center p-[2px] sm:p-[10px] text-brandColor"
              >
                <IoMdClose className="text-[24px]"/>
              </div>
              <div className="absolute flex flex-col items-center justify-center bottom-32 w-full ">
                <div className="w-1/2 flex justify-between">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#EBE5E1] flex justify-center items-center">
                    <BiMessageDots className="text-[24px]" />
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#EBE5E1] flex justify-center items-center">
                    <LiaNewspaperSolid  className="text-[24px]" />
                    </div>

                </div>
                
              </div>
              <div className="absolute flex flex-col items-center justify-center bottom-10 w-full ">
                <p className="text-[#94857B] text-[18px] leading-[18px] font-[400]">Mardo’s Restaurant</p>
                <p className="text-[#332922] text-[16px] leading-[16px] font-[600] my-2">Almost there! Your order is being prepared now.</p>
                <p className="text-[#94857B] text-[12px] leading-[12px] font-[400]">When your order is ready, it will be sent to your way</p>
              </div>
            </div>
            
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TimeModal;
