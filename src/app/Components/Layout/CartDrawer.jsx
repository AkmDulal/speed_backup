"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDeliveryDining } from "react-icons/md";
import LoginComponent from "../Auth/LoginComponent";
import BigScreenSliderComponents from "../CommonSlider/BigScreenSliderComponents";
import DefaultModal from "../Modals/DefaultModal";
import ProductCard from "./ProductCard";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addItem,
  singleDataRemove,
} from "../../services/redux/slice/globalDataSlice";

function CartDrawer({
  totalItems,
  totalPrice,
  resturantOrder,
  restaurantName,
}) {
  const [open, setOpen] = React.useState(false);
  const [resturantData, setResturantData] = React.useState([]);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const foodsList = useSelector((state) => state?.reducer?.foods?.foods);
  const param = useParams();
  const dispatch = useDispatch();
  const lastValue = param?.details?.split("-").pop();
  const countryCode = param?.city;
  const city = param?.products;
  const restaurantCode = lastValue;
  const router = useRouter();

  console.log(foodsList, "foodsList foodsList foodsList");

  const allFoods = foodsList.reduce((acc, subcategory) => {
    return acc.concat(subcategory.foods);
  }, []);

  console.log(allFoods, "allFoods allFoods allFoods");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const datalist = [
    {
      id: "1",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "2",
      images: "./assets/images/products/Rectangle_74.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "3",
      images: "./assets/images/products/Rectangle_76.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: false,
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "4",
      images: "./assets/images/products/Rectangle_78.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "5",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "6",
      images: "./assets/images/products/Rectangle_74.svg",
      icon: <MdOutlineDeliveryDining />,
      title: "Turkinpippuri Seinajoki",
      restaurant_description: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
  ];

  React.useEffect(() => {
    if (resturantOrder) {
      setResturantData(resturantOrder[0]?.items);
    }
  }, [resturantOrder]);

  const handleAddItem = (item) => {
    console.log(item, "item item");
    dispatch(
      addItem({
        restaurant_name: restaurantName,
        country: countryCode,
        city: city,
        restaurant_slug: restaurantCode,
        food_id: item.food_id,
        food_price: item.food_price,
        restaurant_id: param,
        quantity: 1,
        totalPrice: parseFloat(1 * item?.food_price + totalPrice).toFixed(2),
        images: item?.food_image,
        description: item?.food_description,
        // variations: selectedVariationsData,
        name: item?.food_name,
      })
    );
    // setShowModal(false);
  };

  const handleDecrement = (item) => {
    console.log(item, "itemitemitemitem");
    dispatch(singleDataRemove(item?.food_id));
    // decrementQuantity(parentIndex);
  };

  const token = localStorage.getItem("token");

  const drawerChackoutFunction = () => {
    if (token !== null) {
      const rid =
        resturantData?.length > 0 ? resturantData[0]?.restaurant_slug : "";
      router.push(`/en/${countryCode}/${city}/checkout/${rid}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const modalStatus = (status) => {
    setShowAuthModal(status);
  };

  console.log(token, "token token");

  const DrawerList = (
    <Box sx={{ width: 550, padding: "10px" }} role="presentation">
      <h3 className="w-full px-[15px] mb-[30px] mt-[15px] flex justify-between text-[20px] font-[600]">
        {" "}
        Your Order{" "}
        <button onClick={toggleDrawer(false)}>
          <IoMdClose />
        </button>{" "}
      </h3>

      <div className="h-[350px] overflow-y-auto">
        {resturantData?.map((item, i) => (
          <div key={i} className="flex group cursor-pointer">
            <div key={i} className="pb-5 lg:flex w-full relative">
              <div className="w-full flex justify-between py-[10px] border-b border-[#2222]">
                <div className="lg:px-5 flex">
                  <img
                    className="lg:h-[80px] lg:w-[80px] w-full pb-[15px] h-[40px]"
                    src={item.images}
                    alt=""
                  />
                  <div className="w-[350px]">
                    <p className="text-[18px] font-[600] leading-[18px] pb-[10px]">
                      {item.name}
                    </p>{" "}
                    {item?.variations?.map((vlist, vi) => (
                      <p
                        key={vi}
                        className="text-[12px] font-[600] leading-[18px] pb-[10px]"
                      >
                        {vlist.variation_name} {vlist.quantity} Pices{" "}
                        {vlist.variation_price} €
                      </p>
                    ))}
                    <p className="text-[18px] font-[600] leading-[18px] text-[#FF6600]">
                      {parseFloat(item.food_price).toFixed(2)}€
                    </p>
                  </div>
                </div>

                <div className="relative bg-[#fff] border border-[#2222] w-[60px] h-[40px] mr-[15px]  flex  justify-around rounded-[10px] items-center">
                  <p className="text-brandColor text-[18px] font-[400]">
                    {item?.quantity}
                  </p>
                  <FaRegTrashAlt
                    onClick={() => handleDecrement(item)}
                    className="absolute top-[-7px] right-0 cursor-pointer text-brandColor hidden group-hover:block "
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BigScreenSliderComponents navigation={true} responsiveview="1.5">
        {allFoods?.map((item, i) => (
          <SwiperSlide className="w-full items-stretch" key={i}>
            <ProductCard
              handleAddItem={handleAddItem}
              singledata={item}
              item={{
                name: item?.food_name,
                image: item?.food_image,
                alt: item?.food_alt_txt,
                description: item?.food_description,
                price: item?.food_price,
              }}
            />
          </SwiperSlide>
        ))}
      </BigScreenSliderComponents>

      <button
        onClick={() => drawerChackoutFunction()}
        className="bg-[#ff6601] p-[10px] rounded-[10px] text-[#fff] flex items-center justify-center w-full mt-[15px] "
      >
        {" "}
        <span className="w-[20px] h-[20px] bg-[#fff] text-[#ff6601] flex items-center justify-center rounded-full mr-[10px] ">
          {" "}
          {totalItems}{" "}
        </span>{" "}
        Go to checkout{" "}
        <span className="ml-[10px]"> {totalPrice.toFixed(2)} </span>{" "}
      </button>
    </Box>
  );
  console.log(resturantData, "resturantOrder resturantOrder resturantOrder");
  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <button
        onClick={toggleDrawer(true)}
        className="bg-[#ff6601] p-[10px] rounded-[10px] text-[#fff] flex items-center justify-center "
      >
        {" "}
        <span className="w-[20px] h-[20px] bg-[#fff] text-[#ff6601] flex items-center justify-center rounded-full mr-[10px] ">
          {" "}
          {totalItems}{" "}
        </span>{" "}
        View Order <span className="ml-[10px]"> {totalPrice.toFixed(2)} </span>{" "}
      </button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <DefaultModal
        title={""}
        showModal={showAuthModal}
        setShowModal={setShowAuthModal}
      >
        <LoginComponent
          setShowModal={setShowAuthModal}
          modalStatus={modalStatus}
        />
      </DefaultModal>
    </div>
  );
}

export default CartDrawer;
