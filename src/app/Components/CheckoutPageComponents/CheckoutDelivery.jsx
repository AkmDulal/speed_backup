"use client";

import ChackoutTabs from "./ChackoutTabs";
import DeliveryCom from "./DeliveryCom";

const CheckoutDelivery = () => {
  const tabs = [
    {
      id: "delivery",
      label: "Delivery",
      component: <DeliveryCom />,
    },
    {
      id: "pickup",
      label: "Pickup",
      component: <DeliveryCom />,
    },
  ];

  return (
    <div className="lg:py-10 py-[20px]">
      <ChackoutTabs tabs={tabs} />
    </div>
  );
};
export default CheckoutDelivery;
