"use client";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import Loader from "../../Components/Loader/Loader";
// import DefaultModal from "../../../components/Modals/DefaultModal";
import useAxiosPost from "../../customHooks/useAxiosPost";
import DefaultModal from "../Modals/DefaultModal";
import DeleteAccountModal from "../profilePageComponents/ProfilePageModal/DeleteAccountModal";
import EmailModal from "../profilePageComponents/ProfilePageModal/EmailModal";
import MobileNumberModal from "../profilePageComponents/ProfilePageModal/MobileNumberModal";
import NameModal from "../profilePageComponents/ProfilePageModal/NameModal";
// import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [, userLogout, loaderOnUserLogout] = useAxiosPost();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const navigate = useNavigate();

  return (
    <div className="w-full pt-10 pb-40">
      {loaderOnUserLogout && <Loader />}
      <div className="w-full">
        <div className="w-full h-[88px] flex justify-between items-center mt-6 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Home 2
            </p>
            <p className="text-[14px] leading-[14px] font-[400] text-[#94857B] px-3 mt-2">
              The selected country determines the currency of your referral code
            </p>
          </div>

          <div>
            <div className="w-[261px] h-[60px] border-[1px] rounded-[15px] border-[#EBDDD3] flex justify-between items-center px-3">
              <p className="text-[18px] text-[#000000] font-[400] leading-[18px]">
                Finland
              </p>
              <FaAngleRight className="text-[24px]" />
            </div>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Email
            </p>
          </div>

          <div>
            <p
              className="text-[18px] text-brandColor font-[500] leading-[18px] px-2 cursor-pointer"
              onClick={() => setShowEmailModal(true)}
            >
              {userInfo?.customer_email}
            </p>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Mobile Number
            </p>
          </div>

          <div>
            <p
              className="text-[18px] text-brandColor font-[500] leading-[18px] px-2 cursor-pointer"
              onClick={() => setShowNumberModal(true)}
            >
              {userInfo?.customer_phone_code + userInfo?.customer_phone}
            </p>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Name
            </p>
          </div>

          <div>
            <p
              className="text-[18px] text-brandColor font-[500] leading-[18px] px-2 cursor-pointer"
              onClick={() => setShowNameModal(true)}
            >
              {userInfo?.customer_full_name}
            </p>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Delete account
            </p>
          </div>

          <div>
            <p
              className="text-[18px] text-[#f44949] font-[500] leading-[18px] px-2 cursor-pointer"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete
            </p>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Send receipts to email
            </p>
          </div>

          <div>
            <IoToggle className="fill-brandColor" />
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Clear auto-translation settings
            </p>
          </div>

          <div>
            <p className="text-[18px] text-brandColor font-[500] leading-[18px] px-2">
              Reset
            </p>
          </div>
        </div>

        <div className="w-full h-[78px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60">
          <div>
            <p className="text-[16px] leading-[16px] font-[600] text-[#000000] px-3">
              Clear auto-translation settings
            </p>
          </div>

          <div>
            <p
              onClick={() => {
                userLogout(
                  "/logout",
                  null,
                  () => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("address");
                    localStorage.removeItem("userInfo");
                    // navigate("/");
                  },
                  true
                );
              }}
              className="text-[18px] text-brandColor font-[500] leading-[18px] px-2 cursor-pointer"
            >
              Log out
            </p>
          </div>
        </div>

        <div className="w-full h-[108px] flex justify-between items-center mt-1 border-b-[1px] border-[#E0DAD6] border-opacity-60 ">
          <div className="h-full items-start flex flex-col justify-center ">
            <p className="text-[16px] leading-[32px] font-[700] text-[#332922] px-3 mb-4">
              Profile
            </p>
            <p className="text-[16px] leading-[16px] font-[600] text-[#332922] px-3">
              Allow marketing notifications
            </p>
          </div>

          <div className="flex items-end h-full mb-2">
            <IoToggle className="fill-brandColor" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-[30px]">
        <p className="text-[16px] leading-[16px] font-[400] text-[#94857B] px-3">
          You joined Sped on September 14th 2022. You’ve been using Sped for 486
          days ‪🎉
        </p>
      </div>

      <DefaultModal
        title={""}
        showModal={showEmailModal}
        setShowModal={setShowEmailModal}
      >
        <EmailModal setShowModal={setShowEmailModal} userInfo={userInfo} />
      </DefaultModal>

      <DefaultModal
        title={""}
        showModal={showNumberModal}
        setShowModal={setShowNumberModal}
      >
        <MobileNumberModal
          setShowModal={setShowNumberModal}
          userInfo={userInfo}
        />
      </DefaultModal>

      <DefaultModal
        title={""}
        showModal={showNameModal}
        setShowModal={setShowNameModal}
      >
        <NameModal setShowModal={setShowNameModal} userInfo={userInfo} />
      </DefaultModal>

      <DefaultModal
        title={""}
        showModal={showDeleteAccountModal}
        setShowModal={setShowDeleteAccountModal}
      >
        <DeleteAccountModal
          setShowModal={setShowDeleteAccountModal}
          userInfo={userInfo}
        />
      </DefaultModal>
    </div>
  );
};

export default Settings;
