"use client";
import { useFormik } from "formik";
import RedeemCodeImg from "../../assets/images/RedeemCode.svg";
const RedeemCode = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: () => {},
  });
  return (
    <div className="pt-10 pb-20">
      <div className="flex w-full justify-center flex-col items-center">
        <img src={RedeemCodeImg} alt="" />
        <p className="text-[32px] font-[700] text-[#332922] mt-4">
          Redeem code
        </p>
        <p className="text-[16px] font-[400] text-[#665C55]">
          If you have a Sped code, enter it below to get your gift!
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className=" flex justify-center mt-3"
      >
        <div className="w-[444px]  flex justify-center mt-[30px] bg-[#F4EDE8]  px-2 py-2 rounded-[12px]">
          <input
            id="code"
            name="code"
            type="text "
            onChange={formik.handleChange}
            value={formik.values.code}
            placeholder="Enter promo code"
            className="text-[16px] font-[400] leading-[24px] px-2 bg-[#F4EDE8] w-full focus:outline-none"
          />
          <button
            type="submit"
            className="text-brandColor bg-[#FFE0CC] px-[25px] py-[6px] text-[18px] font-[600] rounded-[8px]"
          >
            Redeem
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedeemCode;
