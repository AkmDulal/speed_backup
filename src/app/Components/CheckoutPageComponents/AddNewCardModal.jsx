"use client";
import { IoToggle } from "react-icons/io5";
const AddNewCardModal = () => {
  return (
    <div className="w-[526px]">
      <div className="w-full flex flex-col items-center py-4">
        <div className="w-full bg-brandColor rounded-[12px] h-[300px] p-6 flex flex-col justify-between shadow-md">
          <p className="text-white text-[24px] leading-[24px] font-[600] ">
            Debit/Credit Card
          </p>

          <div className="w-full">
            <div className="w-full">
              <p className="text-white text-[16px] leading-[16px] font-[400] mb-3">
                Card number
              </p>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className=" mb-3 w-full h-[48px] bg-[#C95100] rounded-[4px] text-[16px] font-[400] px-2 placeholder-[#F0A878]"
              />
            </div>

            <div className="w-full flex justify-between">
              <div className="w-4/6">
                <p className="text-white text-[16px] leading-[16px] font-[400] mb-3">
                  Expiration date
                </p>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className=" w-full h-[48px] bg-[#C95100] rounded-[4px] text-[16px] font-[400] px-2 placeholder-[#F0A878]"
                />
              </div>
              <div className="w-1/4">
                <p className="text-white text-[16px] leading-[16px] font-[400] mb-3">
                  Security code
                </p>
                <input
                  type="text"
                  placeholder="0000"
                  className="w-full h-[48px] bg-[#C95100] rounded-[4px] text-[16px] font-[400] px-2 placeholder-[#F0A878]"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-[#332922] text-[15px] leading-[26px] font-[400] mt-5 text-center w-full">
          You can use your debit or credit cards to order with Sped.
          <br /> Your card will be charged only after an order has been
          successfully delivered.
        </p>

        <div className="w-full mt-3">
          <input
            type="text"
            placeholder="Card name (Optional)"
            className=" mt-4 w-full h-[48px] bg-[#EDE7E4] rounded-[12px] text-[16px] font-[400] px-4 placeholder-[#94857B]"
          />
        </div>

        <div className="w-full mt-4">
          <div className="w-full flex justify-between ">
            <p className="text-[#332922] text-[16px] leading-[16px] font-[600] mb-3">
              Use as default
            </p>
            <IoToggle className="fill-[#EADDD4]" />
          </div>
          <div className="w-full flex justify-between mt-4">
            <p className="text-[#332922] text-[16px] leading-[16px] font-[600] mb-3">
              Company card
            </p>
            <IoToggle className="fill-[#EADDD4]" />
          </div>
        </div>

        <div className="w-full mt-4">
          <button className="w-full h-[56px] bg-brandColor rounded-[12px] text-white text-[16px] leading-[16px] font-[600] shadow-md">
            Add payment method
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewCardModal;
