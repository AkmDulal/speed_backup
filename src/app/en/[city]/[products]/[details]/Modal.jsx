"use client";
import { addItem } from "../../../../services/redux/slice/globalDataSlice";
/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

// import { addItem } from "../../../commonRedux/slice";

const Modal = ({ showModal, setShowModal, item, restaurantName }) => {
  const param = useParams();
  const countryCode = param?.city;
  const city = param?.products;
  const lastValue = param?.details?.split("-").pop();
  const restaurantCode = lastValue;

  console.log(lastValue, "param param param");

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setShowModal(false);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    updateTotalPrice();
  }, [selectedOptions]);

  const handleCheckboxChangeNew = (
    variationItemId,
    variationItemName,
    variationItemPrice
  ) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [variationItemId]: {
        name: variationItemName,
        variationItemId: variationItemId,
        price: parseFloat(variationItemPrice),
        quantity: prevOptions[variationItemId]?.quantity || 1,
      },
    }));
  };

  const handleRadioChangeNew = (
    variationItemId,
    variationItemName,
    variationItemPrice
  ) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      Object.keys(updatedOptions).forEach((key) => {
        if (
          key !== variationItemId &&
          updatedOptions[key] &&
          updatedOptions[key]?.price
        ) {
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - updatedOptions[key]?.price
          );
          delete updatedOptions[key];
        }
      });
      updatedOptions[variationItemId] = {
        name: variationItemName,
        variationItemId: variationItemId,
        price: parseFloat(variationItemPrice),
        quantity: 1,
      };
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + parseFloat(variationItemPrice)
      );

      return updatedOptions;
    });
  };

  const handleIncrementNew = (variationItemId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [variationItemId]: {
        ...prevOptions[variationItemId],
        quantity: prevOptions[variationItemId]?.quantity + 1 || 1,
      },
    }));
  };

  const handleDecrementNew = (variationItemId) => {
    setSelectedOptions((prevOptions) => {
      const currentQuantity = prevOptions[variationItemId]?.quantity || 0;
      if (currentQuantity > 0) {
        const newQuantity = currentQuantity - 1;
        if (newQuantity === 0) {
          const { [variationItemId]: removedOption, ...restOptions } =
            prevOptions;
          return restOptions;
        } else {
          return {
            ...prevOptions,
            [variationItemId]: {
              ...prevOptions[variationItemId],
              quantity: newQuantity,
            },
          };
        }
      } else {
        return prevOptions;
      }
    });
  };

  const updateTotalPrice = () => {
    let newTotalPrice = 0;
    for (const key in selectedOptions) {
      newTotalPrice +=
        selectedOptions[key].quantity * selectedOptions[key].price;
    }
    setTotalPrice(newTotalPrice);
  };

  const handleAddItem = () => {
    const selectedVariationsData = Object.values(selectedOptions).map(
      (option) => ({
        variation_id: option.variationItemId,
        variation_name: option.name,
        variation_price: option.price,
        quantity: option.quantity,
      })
    );
    dispatch(
      addItem({
        restaurant_name: restaurantName,
        country: countryCode,
        city: city,
        restaurant_slug: restaurantCode,
        food_id: item.food_id,
        food_price: item.food_price,
        restaurant_id: restaurantCode,
        quantity: quantity,
        totalPrice: parseFloat(
          quantity * item?.food_price + totalPrice
        ).toFixed(2),
        images: item?.food_image,
        description: item?.food_description,
        variations: selectedVariationsData,
        name: item?.food_name,
      })
    );
    setShowModal(false);
  };

  console.log(item, "item item item");

  return (
    <div className="relative">
      {showModal ? (
        <>
          {item ? (
            <Dialog
              fullScreen={fullScreen}
              open={showModal}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              className="p-[15px]"
            >
              <DialogContent className="!bg-[#fff] p-5 lg:w-[500px]">
                <DialogContentText>
                  <div className="w-full ">
                    <div className="w-full flex relative justify-center py-2">
                      <div className="flex w-full justify-end absolute">
                        <button
                          className="w-[30px] h-[30px] flex items-center justify-center font-[400] p-1 rounded-full text-center bg-[#fbd1bc]"
                          onClick={() => setShowModal(false)}
                        >
                          <IoMdClose className="text-[18px] fill-brandColor" />
                        </button>
                      </div>
                      <img
                        className="w-[300px] h-[220px] "
                        src={item?.food_image}
                        alt={item?.food_alt_txt}
                      />
                    </div>
                    <div className="mb-[15px]">
                      <div className="flex">
                        <p className="text-[22px] leading-[22px] font-[700] mb-2">
                          {item?.food_id}.{" "}
                        </p>
                        <p className="text-[22px] leading-[22px] font-[700] mb-2">
                          € {item?.food_name}
                        </p>
                      </div>

                      <p className="text-[16px] leading-[25px] font-[400] text-[#94857B]">
                        {item?.food_description}
                      </p>
                      <p className="text-[22px] leading-[22px] font-[700] text-brandColor mt-4">
                        € {item?.food_price}
                      </p>
                    </div>

                    {item?.food_variations.map((variation) => (
                      <div
                        key={variation.variation_id}
                        className="flex flex-col pb-[15px]"
                      >
                        <div className="flex items-center">
                          <label className="font-[600] text-[18px] text-[#222] ">
                            {variation.variation_name}
                          </label>
                        </div>

                        {variation.variation_options.map((option) => (
                          <div
                            key={option.variation_item_id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              {variation.variation_type === "single" ? (
                                <input
                                  type="radio"
                                  className="h-[18px] w-[18px] rounded accent-[#ed6002] cursor-pointer"
                                  id={option.variation_item_id}
                                  name={`radio-${variation.variation_id}`}
                                  onChange={() => {
                                    handleRadioChangeNew(
                                      option.variation_item_id,
                                      option.variation_item_name,
                                      option.variation_item_price,
                                      variation.variation_is_required
                                    );
                                  }}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  className="h-[18px] w-[18px] rounded accent-[#ed6002] cursor-pointer"
                                  id={option.variation_item_id}
                                  onChange={() => {
                                    handleCheckboxChangeNew(
                                      option.variation_item_id,
                                      option.variation_item_name,
                                      option.variation_item_price
                                    );
                                  }}
                                  checked={
                                    !!selectedOptions[option.variation_item_id]
                                  }
                                />
                              )}
                              {variation.variation_type === "multi" && (
                                <span className="ml-[5px]">
                                  {
                                    selectedOptions[option.variation_item_id]
                                      ?.quantity
                                  }
                                </span>
                              )}
                              <label className="ml-2 font-[400] text-[16px] text-gray-900">
                                {option.variation_item_name}
                              </label>
                            </div>

                            <div className=" rounded-md mb-[10px] flex">
                              {selectedOptions[option.variation_item_id]
                                ?.quantity ? (
                                <div className="mr-[15px]">
                                  {variation.variation_type === "multi" && (
                                    <>
                                      <button
                                        className="bg-[#fde6d7] w-[25px] h-[25px] rounded-full mr-[5px]"
                                        onClick={() =>
                                          handleDecrementNew(
                                            option.variation_item_id
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <button
                                        className="bg-[#fde6d7] w-[25px] h-[25px] rounded-full"
                                        onClick={() =>
                                          handleIncrementNew(
                                            option.variation_item_id
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <p className="text-[#222]">
                                €
                                {parseFloat(
                                  selectedOptions[option.variation_item_id]
                                    ?.quantity * option.variation_item_price ||
                                    option.variation_item_price
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </DialogContentText>
              </DialogContent>

              <div className="flex p-[15px] bg-[#fff]">
                <div>
                  <div className="bg-[#ffc9ae] flex w-[124px] h-[48px] justify-around rounded-[10px] items-center">
                    <div className="text-[18px] flex justify-center items-center bg-[#fde6d7] rounded-full h-[24px] w-[24px]">
                      {" "}
                      <FiMinus
                        className="fill-[#707070]"
                        onClick={() =>
                          handleDecrement({
                            id: item?.food_id,
                            price: item?.food_price,
                          })
                        }
                      />
                    </div>
                    <div>
                      <p className="text-brandColor text-[18px] font-[400]">
                        {" "}
                        {quantity}{" "}
                      </p>
                    </div>
                    <div className="text-[18px] flex justify-center items-center bg-[#fde6d7] rounded-full h-[24px] w-[24px]">
                      {" "}
                      <FaPlus
                        className="fill-[#707070] "
                        onClick={() => handleIncrement()}
                      />
                    </div>
                  </div>
                </div>

                <div
                  onClick={handleAddItem}
                  className="bg-brandColor ml-2 flex w-full h-[48px] justify-between px-3 rounded-[10px] items-center"
                >
                  <p className="text-[14px] leading-[16px] font-[400] text-[#ffffff]">
                    Add to cart
                  </p>
                  <p className="text-[14px] leading-[16px] font-[400] text-[#ffffff]">
                    €
                    {parseFloat(
                      quantity * item?.food_price + totalPrice
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </Dialog>
          ) : (
            <> </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Modal;
