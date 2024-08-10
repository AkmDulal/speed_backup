"use client";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { MdApartment, MdHomeFilled } from "react-icons/md";
// import Loader from "../../../components/CommonComponents/Loader/Loader";
import UserAddressModal from "../Address/UserAddressModal";
import DefaultModal from "../Modals/DefaultModal";
// import DefaultModal from "../../../components/Modals/DefaultModal";
// import UserAddressModal from "../../../components/Navbar/UserAddressModal";
import useAxiosGet from "../../customHooks/useAxiosGet";
const Address = () => {
  const [addressData, getAddressData, loaderOnGetAddressData] = useAxiosGet();

  const [openAddressModal, setOpenAddressModal] = useState(false);

  const userInfo = localStorage.getItem("userInfo") || "";
  const userInfolist = userInfo ? JSON.parse(userInfo) : "";

  useEffect(() => {
    getAddressData("/me/addresses");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full pb-16">
      {/* {loaderOnGetAddressData && <Loader />} */}
      <div className="w-full">
        {addressData?.data?.length
          ? addressData?.data?.map((address, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[88px] flex justify-between items-center mt-6 border-b-[1px] border-[#E0DAD6] border-opacity-60"
                >
                  <div className="flex items-center">
                    <div className="w-[38px] h-[38px] bg-[#DBD6D2] rounded-full flex justify-center items-center">
                      {address?.address_type_label === "Home" ? (
                        <MdHomeFilled />
                      ) : address?.address_type_label === "Apartment" ? (
                        <MdApartment />
                      ) : address?.address_type_label === "Office" ? (
                        <HiOutlineBuildingOffice />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[16px] leading-[16px] font-[600] text-brandColor px-3">
                        {address?.address_type_label}
                      </p>
                      <p className="text-[14px] leading-[14px] font-[400] text-[#94857B] px-3 mt-1">
                        {address?.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="text-[26px]  font-[800] text-black w-[38px] h-[38px] bg-[#DBD6D2] flex justify-center items-center rounded-full">
                      <BsThreeDots />
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="w-full flex justify-center mt-[50px] ">
        <button
          onClick={() => {
            setOpenAddressModal(true);
          }}
          className="h-[56px] w-[446px] bg-brandColor rounded-[12px] text-white text-[20px] font-[600]"
        >
          + Add new address
        </button>
      </div>

      {userInfolist?.customer_phone_verified ? (
        <DefaultModal
          title={""}
          showModal={openAddressModal}
          setShowModal={setOpenAddressModal}
        >
          <UserAddressModal
            modalActiveStep={1}
            disableFirstStepBackButton={true}
          />
        </DefaultModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Address;
