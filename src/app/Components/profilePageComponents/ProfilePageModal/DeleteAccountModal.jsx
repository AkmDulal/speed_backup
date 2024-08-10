"use client";
import { useFormik } from "formik";

import { IoIosArrowForward } from "react-icons/io";
import deleteImg from "../../../assets/icons/delete_img.svg";

const DeleteAccountModal = ({ setShowModal, showModal }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {},
  });
  return (
    <div className="w-[310px] ss:w-[340px] sm:w-[500px] flex flex-col items-center">
      <div className="mb-6">
        <img
          src={deleteImg}
          alt=""
          className="w-[100px] ss:w-[150px] sm:w-full"
        />
      </div>
      <div className="w-full mb-6">
        <p className="text-[24px] sm:text-[34px] font-[700] leading-[34px] text-[#332922]">
          Delete Account
        </p>
        <p className="text-[14px] font-[400] leading-[14px] text-[#665C55] mt-3">
          Mst we re really sorry to see you go 😢 Are you sure you want to
          delete your account?
        </p>
      </div>

      <div className="w-full">
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-center w-full ">
            <div className="w-full">
              <div className="w-full flex h-[64px] items-center justify-between rounded-lg bg-[#EDE7E4] px-4 py-2">
                <div className="w-full">
                  <div className=" h-[18px] w-full flex items-center ">
                    <p className="text-[14px] font-[400] leading-[14px] text-[#665C55]">
                      Reason for deletion
                    </p>
                  </div>
                  <div className="flex items-center w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Choose a reason"
                      className="text-[16px] placeholder-[#332922] font-[400] leading-[18px] h-[32px] bg-[#EDE7E4]  w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="w-4 h-full items-center flex">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex">
            <button
              type="submit"
              className="w-1/2 h-[48px] border-[1px] border-brandColor text-brandColor text-center rounded-[12px] text-[16px] font-[600] shadow-sm  mt-6 mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              type="submit"
              className="w-1/2 h-[48px] bg-[#FF8181] text-[#FF2B2B] text-center rounded-[12px] text-[16px] font-[600] shadow-sm shadow-[#FF2B2B] mt-6 ml-2"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
