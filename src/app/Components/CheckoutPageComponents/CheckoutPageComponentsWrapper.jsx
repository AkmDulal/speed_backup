"use client";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutMap from "./CheckoutMap";
const CheckoutPageComponentsWrapper = () => {
  return (
    <div className="container mx-auto  bg-[#faf7f5]">
      <CheckoutMap />
      <CheckoutDelivery />
    </div>
  );
};

export default CheckoutPageComponentsWrapper;
