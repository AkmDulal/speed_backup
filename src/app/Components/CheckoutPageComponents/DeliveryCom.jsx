"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ImCreditCard } from "react-icons/im";
import { VscChevronRight } from "react-icons/vsc";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import DefaultModal from "../Modals/DefaultModal";
// import useAxiosPost from "../../../customHooks/useAxiosPost";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DatePicker, Radio, message } from "antd";
import { useRouter } from "next/navigation";
import { MdOutlineMyLocation } from "react-icons/md";
import CheckoutPrices from "./CheckoutPrices";
import CheckoutSelectItems from "./CheckoutSelectItems";
import PaymentMethodsModal from "./PaymentMethodsModal";
// order_fees
import { BsCashCoin } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import { addressMeGet, order_create } from "../../services/api/query/homepages";
import { datalist } from "./helper";

import useAxiosPost from "../../customHooks/useAxiosPost";
const DeliveryCom = () => {
  // const { countryCode, city, restaurantCode } = useParams();
  const { RangePicker } = DatePicker;
  const [, postDeliveryList] = useAxiosPost();
  const router = useRouter();
  const param = useParams();
  console.log(param, "paramparamparamparam");
  const cartItemsList = useSelector((state) => state?.reducer.cart?.items);
  const cartItems = cartItemsList?.filter(
    (item) => item?.restaurant_slug === param?.chackout
  );
  const restaurantCode = param?.chackout;
  console.log(cartItems, "cartItems cartItems cartItems");
  const totalPriceData = useSelector(
    (state) => state?.reducer?.cart?.totalPrice
  );
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [deliveryCharge, setDeleveryCharg] = useState("");
  const [deliveryList, setDeliveryList] = useState([]);
  const [address, setaddress] = useState({});
  const [posOrder, seTerror] = useState();
  const [cashOrderStatus, setcashOrderStatus] = useState(false);
  const [tipsValue, setTipsValue] = useState(0);
  const locationData = useSelector(
    (state) => state?.reducer.auth?.deliveryLocation
  );
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [value, setValue] = useState("cash_on_delivery");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    getaddressData();
  }, []);

  const getaddressData = async () => {
    const addressdata = await addressMeGet();

    const addreslist = addressdata?.find(
      (item) => Number(item?.is_default) === 1
    );
    setaddress(addreslist);
  };
  // const navigate = useNavigate();
  // const address = useSelector(
  //   (state) => state?.reducer?.addressSlice?.documents
  // );
  const customerInformation = useSelector(
    (state) => state.reducer.customerInformation
  );
  const countryCitySlice = useSelector(
    (state) => state?.reducer?.countryCitySlice
  );
  const grand_total = cartItems.reduce((accumulator, currentFood) => {
    const price = parseFloat(currentFood.food_price);
    if (!isNaN(price)) {
      return accumulator + price;
    } else {
      return accumulator;
    }
  }, 0);

  const [modifiedCartItems, setModifiedCartItems] = useState([]);

  useEffect(() => {
    const grouped = cartItems.reduce((acc, item) => {
      if (!acc[item.restaurant_slug]) {
        acc[item.restaurant_slug] = {
          restaurantName: item.restaurant_name,
          items: [],
        };
      }
      acc[item.restaurant_slug].items.push(item);
      return acc;
    }, {});
    console.log(grouped, "grouped grouped groupedgrouped");
    const formattedData = Object.values(grouped);

    const data = formattedData.filter(
      (item) => item.items[0].restaurant_slug === restaurantCode
    );

    setModifiedCartItems(data);
  }, []);
  console.log(
    address,
    "addressdataaddressdataaddressdataaddressdataaddressdataaddressdata addressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdataaddressdata"
  );

  const formattedItems = cartItems.map((item) => {
    const options = item?.variations.map((variation) => ({
      variation_id: variation.variation_id,
      variation_option_id: "",
      quantity: variation.quantity,
      price: variation.variation_price,
    }));

    return {
      food_id: `${item.food_id}`,
      quantity: item.quantity,
      price: item.food_price,
      discount: "",
      total_amount: item.totalPrice,
      options: options,
    };
  });
  const addressData = JSON.parse(localStorage.getItem("user_addresses"));

  const orderCreate = async () => {
    setIsLoading(true);
    const obj = {
      restaurant_id: restaurantCode,
      city_id: address?.city_id,
      country_id: address?.country_id,
      address_id: address?.address_id,
      payment_id: "",
      promo_code: "",
      note: "",
      item_amount: totalPriceData,
      delivery_fee: deliveryCharge?.delivery_fee,
      service_fee: deliveryCharge?.service_fee,
      small_order_fee: deliveryCharge?.small_order_fee,
      discount_type: deliveryCharge?.delivery_offer_type,
      discount_amount: deliveryCharge?.delivery_offer_amount,
      tips: tipsValue,
      total_amount: totalPriceData,
      total_delivery_charge: deliveryCharge?.delivery_fee,
      grand_total: grand_total.toFixed(2),
      delivery_method: value,
      delivery_time: deliveryCharge?.delivery_time,
      items: formattedItems,
    };
    const data = await order_create(obj);

    console.log(data, "data data datadatadatadatadata");
    console.log(obj, "data data datadatadatadatadata");

    if (`${value}` === "online_payment") {
      window.location.href = `${data?.redirectUrl}`;
    } else {
      toast.success(data?.message);
      messageApi.open({
        type: "success",
        content: `${data?.message}`,
      });
      router.push(`/`);
    }
  };

  useEffect(() => {
    const orderFeeRequest = () => {
      // const data = await order_fees({
      //   address_id: address?.address_id,
      //   city_id: address?.city_id,
      //   country_id: address?.country_id,
      //   restaurant_id: restaurantCode,
      // });

      postDeliveryList(
        "/order/fees",
        {
          address_id: address?.address_id,
          city_id: address?.city_id,
          country_id: address?.country_id,
          restaurant_id: restaurantCode,
        },
        (res) => {
          console.log(
            res,
            "res?.datares?.datares?.datares?.datares?.datares?.datares?.datares?.data"
          );
          setDeleveryCharg(res?.data);
        }
      );

      // console.log(data, "data data data");
      // setDeleveryCharg(data);
    };
    orderFeeRequest();
  }, [
    modifiedCartItems,
    modifiedCartItems[0]?.items[0]?.restaurant_id,
    address,
  ]);

  const [switchScheduleOrderState, setswitchScheduleOrderState] =
    useState(false);
  const scheduleOrder = (checked) => {
    console.log(checked?.target);
    setswitchScheduleOrderState(checked.target.checked);
  };
  const odrderSelect = (checked) => {
    // cashOrderStatus, setcashOrderStatus
    setcashOrderStatus(checked.target.checked);
  };

  const onOk = () => {};

  return (
    <div className="lg:py-10 py-[20px]">
      <div className="w-full">
        <p className=" lg:text-[32px] text-[18px] font-[700] leading-[32px] py-4">
          {" "}
          Delivery method and time
        </p>
      </div>
      <div className="w-full flex ">
        <div className="lg:w-1/2 w-full">
          <div className="relative flex">
            {/* <AddressComponent
              addressModalStatus={!_.isEmpty(address) ? false : true}
              textStatus={false}
            />
            {address && !_.isEmpty(deliveryList) ? (
              <>
                <div className="absolute top-[10px]  left-[40px] z-20 flex justify-between items-center rounded-[12px] px-8 ">
                  <div className="flex items-center">
                    <IoIosBicycle />
                    <p className="text-[18px] font-[400] leading-[18px] px-3">
                      <span className="font-[600]"> Delivery</span> in{" "}
                      {deliveryList?.data?.delivery_time} to{" "}
                      <span className="font-[600]"> {address?.city} </span>{" "}
                    </p>
                  </div>
                  <div>
                    <VscChevronRight className="text-[32px] font-bold" />
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute top-[10px]  left-[40px] z-20 flex justify-between items-center rounded-[12px] px-8 ">
                {" "}
                Please select Your Delivery Location{" "}
              </div>
            )} */}
          </div>
          <div className=" h-[80px] mt-[20px] rounded-[12px] bg-white px-8 flex items-center">
            <FaLocationDot className="text-[40px] mr-[10px] text-[#ff6701]" />
            <div>
              <p className="text-[18px] font-[600] leading-[18px] pb-1">
                {countryCitySlice?.address} {countryCitySlice?.city}{" "}
                {countryCitySlice?.country}
              </p>
              <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                {countryCitySlice?.lable}
              </p>
            </div>
            {/* <div>
              <IoToggle className="fill-brandColor" />
            </div> */}
          </div>
          <div className=" h-[80px] mt-[20px] rounded-[12px] bg-white px-8 flex items-center">
            <MdOutlineMyLocation className="text-[40px] mr-[10px] text-[#ff6701]" />
            <div>
              <p className="text-[18px] font-[600] leading-[18px] pb-1">
                {/* deliveryCharge */}
                Delivery in {deliveryCharge?.delivery_time}
              </p>
              <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                Delivery distance {deliveryCharge?.delivery_distance}
              </p>
            </div>
            {/* <div>
              <IoToggle className="fill-brandColor" />
            </div> */}
          </div>

          <div className=" h-[80px] mt-[20px] rounded-[12px] bg-white px-8 flex justify-between items-center">
            <div>
              <p className="text-[18px] font-[600] leading-[18px] pb-1">
                No-contact delivery
              </p>
              <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                Please leave the order in front of my door
              </p>
            </div>
            <div>
              {/* <IoToggle className="fill-brandColor" /> */}

              <FormControlLabel control={<Switch defaultChecked />} />
            </div>
          </div>

          <div className=" h-[80px] mt-[20px] rounded-[12px] bg-white px-8  items-center flex justify-between">
            {/* <div className="flex justify-between"> */}
            <div className="py-[15px]">
              <p className="text-[18px] font-[600] leading-[18px] pb-1">
                Schedule Order
              </p>
              <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                I want to take my food at a specific time
              </p>
            </div>
            <div>
              {/* <IoToggle className="fill-brandColor" /> */}

              <FormControlLabel
                control={
                  <Switch
                    checked={switchScheduleOrderState}
                    onChange={(checked) => scheduleOrder(checked)}
                  />
                }
              />
            </div>
          </div>
          {switchScheduleOrderState ? (
            <div className=" h-[80px] mt-[20px] rounded-[12px] bg-white px-8  items-center py-[10px]">
              <p className="text-[18px] pb-[5px] font-[600] leading-[18px]">
                Please Select Your date
              </p>

              <DatePicker
                className="w-full"
                showTime
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                onOk={onOk}
              />
            </div>
          ) : (
            ""
          )}

          <div className="lg:mt-20 mt-[20px]">
            <div className="lg:mb-10 mb-[20px]">
              <p className="lg:text-[32px] text-[18px] font-[700] leading-[32px]">
                Selected items
              </p>
            </div>
            <CheckoutSelectItems
              datalist={datalist}
              filterSlug={restaurantCode}
            />

            <div className=" mt-10 hidden">
              <FaPlus className="h-[20px]" />{" "}
              <p className="text-[18px] font-[600] leading-[18px] px-3">
                Add more items
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <p className="lg:text-[32px] text-[18px] font-[700] leading-[32px] lg:mt-14 mt-[20px]">
              Payment details
            </p>
          </div>
          {!switchScheduleOrderState ? (
            <>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value="online_payment">
                  <div className="flex justify-between items-center h-[80px] rounded-[12px] lg:px-8 px-[10px] bg-white my-8">
                    <div className="flex items-center">
                      <ImCreditCard className="lg:block hidden" />
                      <div className="flex flex-col px-3">
                        <p className="text-[18px] font-[400] leading-[18px] text-brandColor pb-1">
                          Online payment
                        </p>
                        <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                          Please select a online payment
                        </p>
                      </div>
                    </div>
                    <div>
                      <BsCashCoin className="text-[24px]" />
                    </div>
                  </div>
                </Radio>
                <Radio value="cash_on_delivery">
                  <div className="flex justify-between items-center h-[80px] rounded-[12px] lg:px-8 px-[10px] bg-white my-8">
                    <div className="flex items-center">
                      <ImCreditCard className="lg:block hidden" />
                      <div className="flex flex-col px-3">
                        <p className="text-[18px] font-[400] leading-[18px] text-brandColor pb-1">
                          Choose a cash on delivery
                        </p>
                        <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                          Please select a cash on delivery
                        </p>
                      </div>
                    </div>
                    <div>
                      <BsCashCoin className="text-[24px]" />
                    </div>
                  </div>
                </Radio>
              </Radio.Group>
            </>
          ) : (
            <>
              <div className=" justify-between items-center h-[80px] rounded-[12px] lg:px-8 px-[10px] bg-white my-8 hidden">
                <div className="flex items-center">
                  <ImCreditCard className="lg:block hidden" />
                  <div className="flex flex-col px-3">
                    <p className="text-[18px] font-[400] leading-[18px] text-brandColor pb-1">
                      Choose a payment method
                    </p>
                    <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                      Please add a payment method to continue with your order
                    </p>
                  </div>
                </div>
                <div>
                  <VscChevronRight
                    className="text-[32px] font-bold cursor-pointer"
                    onClick={() => setShowPaymentMethodModal(true)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center h-[80px] rounded-[12px] lg:px-8 px-[10px] bg-white my-8">
                <div className="flex items-center">
                  <ImCreditCard className="lg:block hidden" />
                  <div className="flex flex-col px-3">
                    <p className="text-[18px] font-[400] leading-[18px] text-brandColor pb-1">
                      Choose a cash on delivery
                    </p>
                    <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                      Please select a cash on delivery
                    </p>
                  </div>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch onChange={(checked) => odrderSelect(checked)} />
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between items-center h-[80px] rounded-[12px] lg:px-8 px-[10px] bg-white my-8">
                <div className="flex items-center">
                  <ImCreditCard className="lg:block hidden" />
                  <div className="flex flex-col px-3">
                    <p className="text-[18px] font-[400] leading-[18px] text-brandColor pb-1">
                      Choose a payment method
                    </p>
                    <p className="text-[16px] font-[400] leading-[16px] text-[#94857B]">
                      Please add a payment method to continue with your order
                    </p>
                  </div>
                </div>
                <div>
                  <VscChevronRight
                    className="text-[32px] font-bold cursor-pointer"
                    onClick={() => setShowPaymentMethodModal(true)}
                  />
                </div>
              </div>
            </>
          )}

          {/* tip */}
          <div>
            <p className="lg:text-[32px] text-[18px] font-[700] leading-[32px] lg:mt-14 mt-[10px]">
              Tip the courier
            </p>
          </div>
          <div className="flex flex-col justify-around w-full  h-[156px] rounded-[12px] px-8 bg-white my-8 cursor-pointer">
            <div className="flex justify-between w-full ">
              <p className="text-[16px] font-[400] leading-[24px] text-[#94857B] w-[424px]">
                They will get 100% of your tip after the delivery. If you want
                to change or cancel the tip, please contact support for help.
              </p>
              <div className="flex justify-end">
                <p className="text-[16px] font-[400] leading-[24px] text-[#94857B]">
                  €0.00
                </p>
              </div>
            </div>

            <div className="flex">
              {/* tipsValue */}
              <div
                className={`w-[80px] h-[36px] rounded-[20px] mr-2 flex justify-center items-center ${
                  tipsValue === 0 ? "bg-[#EEE6E0]" : ""
                }`}
              >
                {" "}
                <p
                  onClick={() => setTipsValue(0)}
                  className="text-[16px] font-[400]  text-center flex justify-center items-center"
                >
                  0€
                </p>
              </div>
              <div
                className={`w-[80px] h-[36px] rounded-[20px] mr-2 flex justify-center items-center ${
                  tipsValue === 1 ? "bg-[#EEE6E0]" : ""
                }`}
              >
                {" "}
                <p
                  onClick={() => setTipsValue(1)}
                  className="text-[16px] font-[400] text-[#94857B] text-center"
                >
                  1€
                </p>
              </div>
              <div
                className={`w-[80px] h-[36px] rounded-[20px] mr-2 flex justify-center items-center ${
                  tipsValue === 20 ? "bg-[#EEE6E0]" : ""
                }`}
              >
                {" "}
                <p
                  onClick={() => setTipsValue(20)}
                  className="text-[16px] font-[400] text-[#94857B]  text-center"
                >
                  20€
                </p>
              </div>
              <div
                className={`w-[80px] h-[36px] rounded-[20px] mr-2 flex justify-center items-center ${
                  tipsValue === 30 ? "bg-[#EEE6E0]" : ""
                }`}
              >
                {" "}
                <p
                  onClick={() => setTipsValue(30)}
                  className="text-[16px] font-[400] text-[#94857B]  text-center"
                >
                  30€
                </p>
              </div>
              {/*    */}
            </div>
          </div>

          {/* Delivery Charge Modile View  */}
          <div className="lg:hidden block">
            <CheckoutPrices
              tipsValue={tipsValue}
              deliveryCharge={deliveryCharge}
            />

            {cashOrderStatus ? (
              <div className="mt-[10px] ">
                {isLoading ? (
                  <button className="bg-[#855e4b] w-full py-[15px] rounded-[5px]">
                    Loading
                  </button>
                ) : (
                  <button
                    onClick={() => orderCreate()}
                    className="bg-[#ffc9ae] w-full py-[15px] rounded-[5px]"
                  >
                    Order Create
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Delivery Charge Modile View End  */}
        </div>
        {/* Delivery Charge Desktop View  */}
        <div className="lg:w-1/2 pt-8 pl-24 lg:block  w-full hidden ">
          <div className="lg:!sticky lg:top-0">
            <CheckoutPrices
              tipsValue={tipsValue}
              deliveryCharge={deliveryCharge}
              filterSlug={restaurantCode}
            />

            {}
            <div className="mt-[10px] ">
              {isLoading ? (
                <button className="bg-[#855e4b] w-full py-[15px] rounded-[5px]">
                  Loading
                </button>
              ) : (
                <button
                  onClick={() => orderCreate()}
                  className="bg-[#ffc9ae] w-full py-[15px] rounded-[5px]"
                >
                  Order Create
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Delivery Charge Desktop View end  */}
      </div>

      <DefaultModal
        title={"Payment methods"}
        showModal={showPaymentMethodModal}
        setShowModal={setShowPaymentMethodModal}
      >
        <PaymentMethodsModal
          showPaymentMethodModal={showPaymentMethodModal}
          setShowPaymentMethodModal={setShowPaymentMethodModal}
          orderObj={{
            restaurant_id: cartItems[0]?.restaurant_id,
            city_id: address?.city_id,
            country_id: address?.country_id,
            address_id: address?.address_id,
            payment_id: "",
            promo_code: "",
            note: "",
            item_amount: totalPriceData,
            delivery_fee: "10,138.96€",
            service_fee: deliveryCharge?.service_fee,
            small_order_fee: deliveryCharge?.small_order_fee,
            discount_type: deliveryCharge?.delivery_offer_type,
            discount_amount: deliveryCharge?.delivery_offer_amount,
            tips: "",
            total_amount: totalPriceData,
            total_delivery_charge: deliveryCharge?.delivery_offer_amount,
            grand_total: grand_total.toFixed(2),
            delivery_method: "free delivery",
            delivery_time: deliveryCharge?.delivery_time,
            items: formattedItems,
          }}
        />
      </DefaultModal>
    </div>
  );
};
export default DeliveryCom;
