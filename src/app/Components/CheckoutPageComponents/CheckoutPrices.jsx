"use client";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultModal from "../Modals/DefaultModal";
import CheckoutPageModal from "./CheckoutPageModal";

const CheckoutPrices = ({ deliveryCharge, filterSlug, tipsValue }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const cartItems = useSelector((state) => state?.reducer.cart?.items);
  // const totalPriceAll = useSelector((state) => state.cart?.totalPrice);

  const [modifiedCartItems, setModifiedCartItems] = useState([]);

  useEffect(() => {
    if (filterSlug) {
      const grouped = cartItems.reduce((acc, item) => {
        if (!acc[item.restaurant_slug]) {
          acc[item.restaurant_slug] = {
            restaurantName: item.restaurant_name,
            restaurantSlug: item.restaurant_slug,
            items: [],
          };
        }
        if (item.restaurant_slug === filterSlug) {
          acc[item.restaurant_slug].items.push(item);
        }
        return acc;
      }, {});
      const formattedData = Object.values(grouped);
      setModifiedCartItems(
        formattedData.filter((item) => item.restaurantSlug === filterSlug)
      );
    } else {
      const grouped = cartItems.reduce((acc, item) => {
        if (!acc[item.restaurant_slug]) {
          acc[item.restaurant_slug] = {
            restaurantName: item.restaurant_name,
            restaurantSlug: item.restaurant_slug,
            items: [],
          };
        }
        acc[item.restaurant_slug].items.push(item);
        return acc;
      }, {});
      const formattedData = Object.values(grouped);
      setModifiedCartItems(formattedData);
    }
  }, [cartItems]);

  console.log("modifiedCartItems", modifiedCartItems);

  function calculateTotalPriceSum(data) {
    let totalPriceSum = 0;
    data.forEach((item) => {
      item.items.forEach((subItem) => {
        totalPriceSum += parseFloat(subItem.totalPrice);
      });
    });
    return totalPriceSum.toFixed(2);
  }

  // let totalPriceSum =
  //     0 +
  //     tipsValue +
  //     deliveryCharge?.delivery_per_km_charge +
  //     deliveryCharge?.delivery_fee;
  function calculateTotalPriceSum2(data) {
    let totalPriceSum = 0;
    data.forEach((item) => {
      item.items.forEach((subItem) => {
        totalPriceSum += parseFloat(subItem.totalPrice);
      });
    });
    return totalPriceSum?.toFixed(2);
  }

  console.log("deliveryCharge", deliveryCharge);

  const calculateTotalPrice = (modifiedCartItems, deliveryCharge) => {
    const totalPriceSum =
      Number(calculateTotalPriceSum2(modifiedCartItems)) || 0;
    const deliveryFee = Number(deliveryCharge?.delivery_fee) || 0;
    const serviceFee = Number(deliveryCharge?.service_fee) || 0;
    const tipsValueFee = Number(tipsValue) || 0;

    return totalPriceSum + deliveryFee + serviceFee + tipsValueFee;
  };

  return (
    <div className="h-[568px] bg-white w-full rounded-[12px] p-10">
      <div>
        <p className="text-[32px] font-[700] leading-[16px]">Prices in EUR</p>
        <p className="text-[16px] font-[400] leading-[16px] text-[#94857B] mt-5">
          incl. taxes (if applicable){" "}
        </p>
      </div>
      <div className="w-full mt-12 border-b-[1px] border-[#f2f2f2]">
        <div className="flex w-full justify-between mt-8">
          <p className="text-[18px] font-[600] leading-[18px]">
            Item subtotal ({" "}
            {
              modifiedCartItems?.filter(
                (item) => item.restaurantSlug === filterSlug
              )[0]?.items.length
            }{" "}
            item)
          </p>
          <p className="text-[18px] font-[600] leading-[18px]">
            {calculateTotalPriceSum(modifiedCartItems)} €
          </p>
        </div>

        <div className="flex w-full justify-between mt-8">
          <p className="text-[18px] font-[600] leading-[18px]">
            Delivery ( {deliveryCharge?.delivery_per_km_charge} Km )
          </p>
          <p className="text-[18px] font-[600] leading-[18px]">
            {" "}
            {deliveryCharge?.delivery_fee} €
          </p>
        </div>

        <div className="flex w-full justify-between my-8">
          <p className="text-[18px] font-[600] leading-[18px]">Service fee</p>
          <p className="text-[18px] font-[600] leading-[18px]">
            {" "}
            {deliveryCharge?.service_fee} €
          </p>
        </div>
      </div>

      <div className="mt-12 pb-12 border-b-[1px] border-[#f2f2f2]">
        <div className="flex justify-between">
          <p className="text-[18px] font-[600] leading-[18px]">Total Price</p>
          <p className="text-[18px] font-[600] leading-[18px]">
            {calculateTotalPrice(modifiedCartItems, deliveryCharge).toFixed(2)}{" "}
            €
          </p>

          {/* deliveryCharge?.delivery_per_km_charge +
  //     deliveryCharge?.delivery_fee; */}
        </div>
      </div>
      <div className="mt-12 pb-12 border-b-[1px] border-[#f2f2f2]">
        <div className="flex justify-between">
          <p className="text-[18px] font-[600] leading-[18px]">Discounts</p>
          <p className="text-[18px] font-[600] leading-[18px]">
            {" "}
            {deliveryCharge?.delivery_offer_amount}{" "}
          </p>
        </div>
        <p className="text-[16px] font-[400] leading-[16px] text-[#94857B] mt-3">
          {" "}
          €0 delivery fee for 14 days from your first order!
        </p>
      </div>

      <div
        className="h-[80px] rounded-[14px] bg-[#D9D9D9] flex justify-center items-center cursor-pointer hidden"
        onClick={() => setShowCheckoutModal(true)}
      >
        <p className="text-[17px] w-[313px] leading-[22px] text-center font-[600]">
          Please add your payment method to continue with your order
        </p>
      </div>

      <DefaultModal
        title={"Change order details"}
        showModal={showCheckoutModal}
        setShowModal={setShowCheckoutModal}
      >
        <CheckoutPageModal />
      </DefaultModal>
    </div>
  );
};
export default CheckoutPrices;
