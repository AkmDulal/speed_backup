"use client";
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { MdOutlineEmail } from "react-icons/md";
import email_Img from "../../../assets/icons/email_Img.svg";
import useAxiosPost from "../../../customHooks/useAxiosPost";
import Loader from "../../Loader";
const EmailModal = ({ setShowModal, userInfo }) => {
  const [, updateProfile, loaderOnUpdateProfile] = useAxiosPost();
  console.log("userInfo", userInfo);
  const formik = useFormik({
    initialValues: {
      email: userInfo?.customer_email,
    },
    onSubmit: (values) => {
      const payload = {
        first_name: userInfo?.customer_first_name,
        last_name: userInfo?.customer_last_name,
        email: values.email,
        phone_code: userInfo?.customer_phone_code,
        phone: userInfo?.customer_phone,
      };
      updateProfile(
        "/me/profile/update",
        payload,
        (res) => {
          localStorage.setItem("userInfo", JSON.stringify(res?.data));
          setShowModal(false);
        },
        true
      );
      console.log("payload", payload);
    },
  });
  return (
    <div className="  flex flex-col items-center w-[310px] ss:w-[340px] sm:w-full ">
      {loaderOnUpdateProfile && <Loader />}
      <div className="my-4">
        <img
          src={email_Img}
          alt="sped email image"
          className="w-[100px] ss:w-[150px] sm:w-full"
        />
      </div>
      <div className="w-full">
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-center w-full">
            <div className="bg-[#EDE7E4] h-[48px] w-[68px] flex items-center justify-center rounded-l-[12px]">
              <MdOutlineEmail className="w-[24px] h-[24px] fill-[#998A80]" />
            </div>
            <div className="w-full">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email Address"
                className="text-[16px] font-[400] leading-[24px] h-[48px] bg-[#EDE7E4] w-full focus:outline-none"
              />
            </div>
            <div className="bg-[#EDE7E4] h-[48px] w-[68px] flex items-center justify-center rounded-r-[12px]">
              {/* <ImCancelCircle className="w-[20px] h-[20px] fill-[#998A80]" /> */}
            </div>
          </div>

          <div className="w-full flex">
            <button
              onClick={() => setShowModal(false)}
              className="w-1/2 h-[48px] border-[1px] border-brandColor text-brandColor text-center rounded-[12px] text-[16px] font-[600] shadow-sm  mt-6 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 h-[48px] bg-brandColor text-white text-center rounded-[12px] text-[16px] font-[600] shadow-sm shadow-brandColor mt-6 ml-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
