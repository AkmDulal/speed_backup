"use client";
import { useFormik } from "formik";
import numberImage from "../../../assets/icons/Number_img.svg";
import Loader from "../../../Components/Loader/Loader";
import useAxiosPost from "../../../customHooks/useAxiosPost";

const NameModal = ({ setShowModal, userInfo }) => {
  const [, updateProfile, loaderOnUpdateProfile] = useAxiosPost();

  const formik = useFormik({
    initialValues: {
      first_name: userInfo?.customer_first_name || "",
      last_name: userInfo?.customer_last_name || "",
    },
    onSubmit: (values) => {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: userInfo?.customer_email,
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
    },
  });
  return (
    <div className="w-[310px] ss:w-[340px] sm:w-[450px] flex flex-col items-center">
      {loaderOnUpdateProfile && <Loader />}
      <div className="mb-6">
        <img
          src={numberImage}
          alt=""
          className="w-[100px] ss:w-[150px] sm:w-full"
        />
      </div>
      <div className="w-full mb-3 sm:mb-6">
        <p className="text-[24px] sm:text-[34px] font-[700] sm:leading-[34px] text-[#332922]">
          Name
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-center w-full">
            <div className="w-full flex flex-col    py-2">
              <div className="w-full mb-2 bg-[#EDE7E4] px-4 rounded-lg py-2">
                <div className=" h-[18px] w-full flex items-center ">
                  <p className="text-[14px] font-[400] leading-[14px] text-[#665C55]">
                    First Name
                  </p>
                </div>
                <div className="flex items-center w-full">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    placeholder=""
                    className="text-[18px] font-[400] leading-[18px] h-[32px] bg-[#EDE7E4]  w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="w-full bg-[#EDE7E4] px-4 rounded-lg py-2">
                <div className=" h-[18px] w-full flex items-center ">
                  <p className="text-[14px] font-[400] leading-[14px] text-[#665C55]">
                    Last Name
                  </p>
                </div>
                <div className="flex items-center w-full">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    placeholder=""
                    className="text-[18px] font-[400] leading-[18px] h-[32px] bg-[#EDE7E4]  w-full focus:outline-none"
                  />
                </div>
              </div>
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

export default NameModal;
