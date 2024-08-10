"use client";
import { useState } from "react";
import { FaMoneyBills } from "react-icons/fa6";
// import cardIcon from "../../../assets/icons/cardIcon.svg";
import DefaultModal from "../Modals/DefaultModal";
// import useAxiosPost from "../../../customHooks/useAxiosPost";
import AddNewCardModal from "./AddNewCardModal";
const PaymentMethodsModal = ({
  showPaymentMethodModal,
  setShowPaymentMethodModal,
  orderObj,
}) => {
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);
  const [isBackButtonActive, setBackButtonActive] = useState(true);
  // const [, posOrder, , , error] = useAxiosPost();

  const buttonHandler = () => {
    setShowAddNewCardModal(true);
  };

  const onlinePaymentorder = () => {
    // setIsLoading(true);
    // posOrder("order/submit", orderObj, (res) => {
    //   window.location.href = res?.data?.redirectUrl;
    // });
  };

  return (
    <div className="w-[526px]">
      <div className="w-full">
        {/* <div
          className="flex mt-8 cursor-pointer"
          onClick={() => buttonHandler()}
        >
          <FaPlus className="h-[20px] mr-3 " />{" "}
          <p className="text-[16px] font-[600] leading-[16px] pr-3">
            Add payment method
          </p>
        </div> */}

        <div className="w-full">
          <p className="text-[22px] leading-[22px] font-[700] text-[#332922] mt-10">
            Payment option{" "}
          </p>
          <div className="w-full h-[88px] flex justify-between items-center mt-6 border-b-[1px] border-[#E0DAD6]">
            <div className="flex">
              <div>{/* <img src={cardIcon} alt="" /> */}</div>
              <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
                Edenred
              </p>
            </div>
            <div>
              <button
                onClick={onlinePaymentorder}
                className="text-[16px] leading-[16px] font-[600] text-brandColor px-[25px] py-[15px] bg-[#FFE0CC] rounded-[12px]"
              >
                Active
              </button>
            </div>
          </div>
          {/* <div className="w-full h-[88px] flex justify-between items-center mt-3 border-b-[1px] border-[#E0DAD6]">
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
          </div> */}
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

      <DefaultModal
        title={"Add new card"}
        showModal={showAddNewCardModal}
        setShowModal={setShowAddNewCardModal}
        isBackButtonActive={isBackButtonActive}
        setBackButtonActive={setBackButtonActive}
        // showPreviousModal={showPaymentMethodModal}
        // setShowPreviousModal={setShowPaymentMethodModal}
      >
        <AddNewCardModal />
      </DefaultModal>
    </div>
  );
};

export default PaymentMethodsModal;
