"use client";
/* eslint-disable react/prop-types */
import _ from "lodash";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import DefaultModal from "../Modals/DefaultModal";
import UserAddressModal from "./UserAddressModal";

const AddressComponent = ({ textStatus, addressModalStatus }) => {
  const [showUserAddressModal, setShowUserAddressModal] =
    useState(addressModalStatus);
  // const [, getUserAddressList, loaderOnGetUserAddressList] = useAxiosGet();
  const cartItem = useSelector((state) => state.reducer?.cart?.items);
  const countryCitySlice = useSelector(
    (state) => state?.reducer?.countryCitySlice
  );

  // useEffect(() => {
  //   getUserAddressList("/me/addresses");
  // }, [cartItem]);

  const modalStatus = (status) => {
    setShowUserAddressModal(status);
  };

  console.log(countryCitySlice, "textStatus textStatus textStatus");
  return (
    <div className="bg-[#faf2ed] h-12 md:h-auto lg:px-[15px] shadow-[0_10px_10px_-16px_rgba(0,0,0,0.3)] relative py-[7px] w-full z-10">
      {/* {loaderOnGetUserAddressList && <Loader />} */}
      <div onClick={() => setShowUserAddressModal(true)}>
        {_.isEmpty(countryCitySlice?.city) ? (
          <> </>
        ) : (
          <div className="flex items-center cursor-pointer">
            <div className="bg-[#FFE0CC] w-[40px] h-[40px] rounded-full flex items-center hover:bg-[#fed3b6] justify-center cursor-pointer">
              <CiLocationOn
                className="text-[#ff6601] cursor-pointer text-[20px]"
                onClick={() => setShowUserAddressModal(true)}
              />
            </div>
            {_.isEmpty(countryCitySlice?.city) ? (
              <> </>
            ) : (
              <>
                {!_.isEmpty(countryCitySlice) && (
                  <p
                    onClick={() => setShowUserAddressModal(true)}
                    className="flex items-center font-[600] px-[15px] text-brandColor"
                  >
                    {countryCitySlice?.address ? (
                      countryCitySlice?.address
                    ) : (
                      <>
                        {" "}
                        {countryCitySlice?.address}{" "}
                        {`(${countryCitySlice?.city})`}{" "}
                      </>
                    )}
                    <IoIosArrowDown className="pt-[5px] text-[24px] pl-[5px]" />{" "}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <DefaultModal
        title={""}
        showModal={showUserAddressModal}
        setShowModal={setShowUserAddressModal}
      >
        <UserAddressModal
          modalStatus={modalStatus}
          setModalStatus={setShowUserAddressModal}
        />
      </DefaultModal>
    </div>
  );
};

export default AddressComponent;
