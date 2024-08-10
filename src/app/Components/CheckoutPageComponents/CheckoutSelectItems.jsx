"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { SwiperSlide } from "swiper/react";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../services/redux/slice/globalDataSlice";
import Login from "../Auth/LoginComponent";
import DefaultModal from "../Modals/DefaultModal";

const CheckoutSelectItems = ({ filterSlug, setShowModal }) => {
  const cartItems = useSelector((state) => state?.reducer?.cart?.items);
  // const totalPriceAll = useSelector((state) => state.cart?.totalPrice);
  // const countryAndCity = useSelector((state) => state.countryCitySlice);
  const token = localStorage.getItem("token");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const [modifiedCartItems, setModifiedCartItems] = useState([]);

  useEffect(() => {
    if (filterSlug) {
      datat();
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

      console.log(
        cartItems,
        "formattedDataformattedDataformattedDataformattedDataformattedData"
      );

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

  const datat = async () => {
    const restaurantsList = await restaurants(obj);
    console.log(restaurantsList, "restaurantsList restaurantsList");
  };

  const handleIncrement = (parentIndex, itemIndex) => {
    // dispatch(incrementQuantity(cartItems[index]));
    dispatch(
      incrementQuantity(modifiedCartItems[parentIndex].items[itemIndex])
    );
  };

  const handleDecrement = (parentIndex, itemIndex) => {
    // const updatedCartItems = [...cartItems];
    // if (updatedCartItems[index].quantity > 0) {
    //   dispatch(decrementQuantity(cartItems[index]));
    // }
    const updatedCartItems = [...modifiedCartItems];
    if (updatedCartItems[parentIndex].items[itemIndex].quantity > 0) {
      dispatch(
        decrementQuantity(modifiedCartItems[parentIndex].items[itemIndex])
      );
    }
  };

  console.log(
    modifiedCartItems,
    "modifiedCartItemsmodifiedCartItemsmodifiedCartItemsmodifiedCartItemsmodifiedCartItemsmodifiedCartItems"
  );

  return (
    <div className="relative bg-[#faf7f5]">
      <div>
        <div className="px-2 scrollbar-w-2 scrollbar-track- scrollbar-thumb-gray-500 ">
          {modifiedCartItems?.length
            ? modifiedCartItems?.map((modifiedCartItem, index) => (
                <div
                  key={index}
                  className="border rounded m-1 p-2 border-[#ff6601] bg-white "
                >
                  <h4 className="text-[22px] font-[600] leading-[22px] mb-5">
                    {modifiedCartItem?.restaurantName || ""}
                  </h4>
                  {modifiedCartItem?.items?.map((item, i) => (
                    <div
                      key={i}
                      className="pb-5 lg:flex lg:justify-between lg:items-center "
                    >
                      <div className="lg:flex items-center w-full">
                        <img
                          className="lg:h-[58px] lg:w-[80px] w-full pb-[15px]"
                          src={item.images}
                          alt=""
                        />
                        <div className="lg:px-5">
                          <p className="text-[18px] font-[600] leading-[18px]">
                            {item.name}
                          </p>
                          <p className="text-[14px] font-[400] leading-[25px] text-[#94857B] py-[10px] ">
                            {item?.description && item.description.length > 20
                              ? item.description.slice(0, 100) + "..."
                              : item?.description}
                          </p>
                          <div className="grid grid-cols-1 gap-1 mb-[10px]">
                            {item?.variations.map((variation, i) => (
                              <p className=" font-[600] text-[13px]" key={i}>
                                {" "}
                                {variation?.quantity} x{" "}
                                {variation?.variation_name}{" "}
                                {variation?.variation_price}{" "}
                              </p>
                            ))}
                          </div>
                          <p className="text-[18px] font-[600] leading-[18px] text-[#FF6600]">
                            {(
                              parseFloat(item?.totalPrice) * item.quantity
                            ).toFixed(2)}
                            €
                          </p>
                        </div>
                      </div>

                      <div className="pt-[20px]">
                        <div className="bg-[#ffc9ae]  flex w-[124px] h-[48px] justify-around rounded-[10px] items-center">
                          <div className="text-[18px] flex justify-center items-center bg-[#fde6d7] rounded-full h-[24px] w-[24px]">
                            {" "}
                            <FiMinus
                              className="fill-[#707070]"
                              // onClick={() => handleDecrement(i)}
                              onClick={() => handleDecrement(index, i)}
                            />
                          </div>
                          <div>
                            <p className="text-brandColor text-[18px] font-[400]">
                              {" "}
                              {item?.quantity}
                            </p>
                          </div>
                          <div className="text-[18px] flex justify-center items-center bg-[#fde6d7] rounded-full h-[24px] w-[24px]">
                            {" "}
                            <FaPlus
                              className="fill-[#707070]"
                              // onClick={() => handleIncrement(i)}
                              onClick={() => {
                                handleIncrement(index, i);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between gap-2 mb-3">
                    <Link
                      onClick={() => setShowModal(false)}
                      href={`/en/${modifiedCartItem?.items[0]?.country}/${modifiedCartItem?.items[0]?.city}/${modifiedCartItem?.items[0]?.restaurant_slug}`}
                      className="bg-[#ff6601] w-full z-10 mt-[10px] py-[10px] flex justify-center text-[#fff] rounded-[5px] cursor-pointer"
                    >
                      {" "}
                      Add More
                    </Link>
                    {token ? (
                      <Link
                        href={`/en/${modifiedCartItem?.items[0]?.country}/${modifiedCartItem?.items[0]?.city}/checkout/${modifiedCartItem?.items[0]?.restaurant_slug}`}
                        onClick={() => setShowModal(false)}
                        className="bg-[#ff6601] w-full z-10 mt-[10px] py-[10px] flex justify-center text-[#fff] rounded-[5px] cursor-pointer"
                      >
                        {" "}
                        Checkout Total:{" "}
                        {modifiedCartItem?.items
                          .reduce(
                            (acc, item) =>
                              acc + parseFloat(item.totalPrice) * item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        €
                      </Link>
                    ) : (
                      <h3
                        onClick={() => {
                          setShowAuthModal(true);
                        }}
                        className="bg-[#ff6601] w-full z-10 mt-[10px] py-[10px] flex justify-center text-[#fff] rounded-[5px] cursor-pointer"
                      >
                        {" "}
                        Total:{" "}
                        {modifiedCartItem?.items
                          .reduce(
                            (acc, item) =>
                              acc + parseFloat(item.food_price) * item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        €
                      </h3>
                    )}
                  </div>
                </div>
              ))
            : null}
        </div>

        {/* <div className="">
          <ModalSliderComponents
            perView={2.5}
            spaceBetween={30}
            navigation={true}
          >
            {sliderData?.map((item, i) => (
              <SwiperSlide className="w-full" key={i}>
                <RecommendationsComponent item={item} />
              </SwiperSlide>
            ))}
          </ModalSliderComponents>
        </div> */}
      </div>

      {/* token */}
      {/* {token ? (
        <Link
          to={`/en/${countryAndCity?.country}/${countryAndCity?.city}/checkout`}
          onClick={() => setShowModal(false)}
          className="bg-[#ff6601] w-full z-10 mt-[10px] py-[10px] flex justify-center text-[#fff] rounded-[5px] cursor-pointer"
        >
          {" "}
          Total Price: {totalPriceAll}€
        </Link>
      ) : (
        <h3
          onClick={() => {
            setShowAuthModal(true);
          }}
          className="bg-[#ff6601] w-full z-10 mt-[10px] py-[10px] flex justify-center text-[#fff] rounded-[5px] cursor-pointer"
        >
          {" "}
          Total Price: {totalPriceAll}€
        </h3>
      )} */}

      <DefaultModal
        title={""}
        showModal={showAuthModal}
        setShowModal={setShowAuthModal}
      >
        <Login setShowModal={setShowAuthModal} />
      </DefaultModal>
    </div>
  );
};
export default CheckoutSelectItems;
