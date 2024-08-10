"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { addressMeGet, logout } from "../../services/api/query/homepages";
// import { useParams } from "next/navigation";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddressComponent from "../Address/AddressComponent";
// import { useRouter } from 'next/navigation';
import { FaCircleUser } from "react-icons/fa6";
import UserAddressModal from "../Address/UserAddressModal";
import LoginComponent from "../Auth/LoginComponent";
import DefaultModal from "../Modals/DefaultModal";
import ViewOrderModal from "../OrderComponents/ViewOrderModal";
import DefaultSelect from "../Select/DefaultSelect";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const path = usePathname();
  const url = `${path}`;
  const pathname = url.replace("/en", "");
  const paramsName = useParams();
  console.log(paramsName, "paramsName");
  console.log(pathname, "pathname");

  const lastrestaurantSlug = paramsName?.details?.split("-").pop();
  const router = useRouter();

  const customerInformation = useSelector(
    (state) => state.reducer.customerInformation
  );
  const cartItems = useSelector((state) => state?.reducer?.cart?.items);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);
  const [modifiedCartItems, setModifiedCartItems] = useState([]);
  // const [showUserAddressModal, setShowUserAddressModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [addressData, setAddressData] = useState([]);

  const [showUserAddressModal, setShowUserAddressModal] = useState(false);

  const cartItem = useSelector((state) => state.reducer.cart?.items || []);
  const modalStatus = (status) => {
    setShowAuthModal(status);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // getUserAddressList("/me/addresses");
    const grouped = cartItem.reduce((acc, item) => {
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
  }, [cartItem]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // addressMe
    if (customerInformation?.all_data?.api_token) {
      const addressSave = async () => {
        const datalist = await addressMeGet();
        if (datalist?.length > 0) {
          setShowUserAddressModal(false);
        } else {
          setShowUserAddressModal(true);
        }
        setAddressData(datalist);
        console.log(datalist, "datalist datalist datalist");
      };
      addressSave();
    }
    // addressMe
    // getUserAddressList("/me/addresses");
  }, [customerInformation]);

  const memoizedAddressComponent = useMemo(() => {
    if (customerInformation?.all_data?.api_token) {
      return (
        <div className="hidden">
          <AddressComponent
            addressModalStatus={
              _.isEmpty(customerInformation) &&
              customerInformation?.all_data?.api_token !== null
                ? true
                : false
            }
            textStatus={false}
          />
        </div>
      );
    } else {
      return null;
    }
  }, [customerInformation?.all_data?.api_token]);

  console.log(customerInformation, "session session session");

  const logoutFunction = async () => {
    const response = await logout();
    console.log(response, "responseresponseresponseresponseresponse");
    handleOptionClick();
    // localStorage.removeItem("nextauth.message");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    // localStorage.clear();
    router.push(`/`);
    window.location.reload();
    // signOut("google");
  };

  const userInfo = localStorage.getItem("userInfo") || "";
  const userInfolist = userInfo ? JSON.parse(userInfo) : "";

  console.log(modifiedCartItems, "pathname pathname pathname");

  const resturantOrder = modifiedCartItems.filter(
    (item) => item?.restaurantSlug === lastrestaurantSlug
  );
  console.log(
    resturantOrder,
    "resturantOrderresturantOrderresturantOrderresturantOrderresturantOrderresturantOrderresturantOrder"
  );

  let totalItems = 0;
  let totalPrice = 0;

  // Iterate through the filtered items to calculate total items and total price
  resturantOrder.forEach((order) => {
    order.items.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += parseFloat(item.totalPrice);
    });
  });

  console.log(pathname, "datat datat datat");

  return (
    <div className="bg-[#faf2ed] md:h-auto lg:px-[15px] shadow-[0_10px_10px_-16px_rgba(0,0,0,0.3)] sticky top-0 py-[7px] w-full z-10">
      {customerInformation?.all_data?.api_token ? (
        <DefaultModal
          title={""}
          showModal={showUserAddressModal}
          setShowModal={setShowUserAddressModal}
        >
          <UserAddressModal modalStatus={modalStatus} />
        </DefaultModal>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 gap-4 ">
        <div className="mx-auto  w-full md:flex lg:px:[0px] px:[10px]">
          <div className=" flex items-center w-full justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-[20px]">
                <Image
                  src={`./assets/images/logo.svg`}
                  width={150}
                  height={100}
                  alt="sped-logo"
                />
              </Link>
              <div className="">
                {pathname === `/${paramsName?.city}/${paramsName?.products}` ? (
                  <div className="lg:block hidden">
                    <AddressComponent />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center">
              {/* pathname */}
              {/* {pathname === `/en/${countryCode}/${city}` ? ( */}
              <div
                className="flex items-center 
                ml-[10px] max-[768px]:hidden"
              >
                {/* {userAddressList?.data?.length ? ( */}
                <div className=" items-center justify-between px-[15px] hidden">
                  <div className="ml-[30px] pr-[25px]">
                    <DefaultSelect
                      data={[]}
                      // onChange={handleSelectChange}
                    />
                  </div>
                </div>
                {/* ) : null} */}
              </div>
              {/* // ) : null} */}
            </div>

            <div className="flex">
              {`${totalItems}` === "0" ? (
                <>
                  {customerInformation?.all_data?.api_token ? (
                    <>
                      <div className="relative">
                        <button onClick={toggleDropdown} className=" ">
                          {session ? (
                            <Image
                              src={session?.user?.image}
                              width={40}
                              height={30}
                              alt="sped-logo"
                              className="!rounded-[100px]"
                            />
                          ) : (
                            <FaCircleUser style={{ fontSize: "40px" }} />
                          )}
                        </button>
                        {isOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                          >
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <div
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={handleOptionClick}
                            >
                              Language
                            </div>
                            <div
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={handleOptionClick}
                            >
                              Get Help
                            </div>
                            <div
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={() => {
                                logoutFunction();
                              }}
                            >
                              {/* logout */}
                              Logout
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <Link
                        href="/"
                        className="lg:text-[18px] md:text-[14px] sm:text-[14px] text-[14px] font-[500] text-[#4B3C32] lg:px-[20px] px-[10px]"
                        onClick={() => setShowAuthModal(true)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/"
                        className="ml-4 lg:text-[18px] md:text-[14px] text-[14px]  font-[600]  bg-[#FFE0CC] lg:px-[20px] py-1 px-[10px] rounded-[4px] text-[#FF6600]"
                        onClick={() => setShowAuthModal(true)}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}

                  {modifiedCartItems?.length ? (
                    <>
                      {/* {pathname ===
                  `/en/${countryCode}/${city}/${restaurantCode}` ? null : ( */}
                      <div className="relative mr-5">
                        <IoCartOutline
                          className=" ml-2 text-[#ff6601] text-[35px] cursor-pointer"
                          onClick={() => setShowOrderModal(true)}
                        />
                        <span className="bg-[#ff6601] w-[20px] text-[12px] flex items-center justify-center h-[20px] rounded-[30px] text-[#fff] absolute -top-2 -right-2">
                          {modifiedCartItems?.length}
                        </span>
                      </div>
                      {/* // )} */}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <CartDrawer
                    resturantOrder={resturantOrder}
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                  />
                  {/* <button className="bg-[#ff6601] p-[10px] rounded-[10px] text-[#fff] flex items-center justify-center ">
                    {" "}
                    <span className="w-[20px] h-[20px] bg-[#fff] text-[#ff6601] flex items-center justify-center rounded-full mr-[10px] ">
                      {" "}
                      {totalItems}{" "}
                    </span>{" "}
                    View Order{" "}
                    <span className="ml-[10px]"> {totalPrice.toFixed(2)} </span>{" "}
                  </button> */}
                  {/* <p>Total Items: {totalItems}</p>
                  <p>Total Price: {totalPrice.toFixed(2)}</p> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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

      <DefaultModal
        title={"Your order"}
        showModal={showOrderModal}
        setShowModal={setShowOrderModal}
      >
        <ViewOrderModal setShowModal={setShowOrderModal} />
      </DefaultModal>

      <DefaultModal
        title={""}
        showModal={showUserAddressModal}
        setShowModal={setShowUserAddressModal}
      >
        <UserAddressModal modalStatus={modalStatus} />
      </DefaultModal>
    </div>
  );
};

export default Header;
