"use client";
import CheckoutDelivery from "../../../../../Components/CheckoutPageComponents/CheckoutDelivery";
import CheckoutMap from "../../../../../Components/CheckoutPageComponents/CheckoutMap";
const CheckoutPageComponentsWrapper = () => {
  return (
    <div className="w-full  bg-[#faf7f5]">
      <CheckoutMap />
      <div className="px-[20px]">
        <CheckoutDelivery />
      </div>
    </div>
  );
};

export default CheckoutPageComponentsWrapper;
