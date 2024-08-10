"use client";
import { FormControl, TextField } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  otpSend,
  phone_verify,
  register,
} from "../../services/api/query/homepages";
import { setCustomerInfo } from "../../services/redux/slice/globalDataSlice";
import UserAddressModal from "../Address/UserAddressModal";
import DefaultModal from "../Modals/DefaultModal";
// phone_verify

function OtpForm({
  backButton,
  currentFormData,
  stepPosition,
  formData,
  registryModalStatus,
}) {
  // console.log(
  //   currentFormData,
  //   "currentFormData currentFormDatacurrentFormData"
  // );
  // console.log(formData, "formData formData    formDataformDataformData");
  const formik = useFormik({
    initialValues: {
      phone: "",
      otp: null,
    },
    onSubmit: () => {},
  });
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(90);
  const [timerStarted, setTimerStarted] = useState(false);
  const inputRefs = useRef([]);
  const [addressStatus, setAddressStatus] = useState(false);
  const otpFunction = async () => {
    const otpPayload = {
      phone: formData?.phoneNumber,
      phone_code: formData?.phoneCode,
    };
    const otpStatus = await otpSend(otpPayload);
    console.log(
      otpStatus,
      "otpStatus otpStatus otpStatus otpStatusotpStatusotpStatus"
    );
  };

  useEffect(() => {
    let timer;
    if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setTimerStarted(false);
    }
    return () => clearInterval(timer);
  }, [timerStarted, seconds]);

  useEffect(() => {
    // stepPosition(4);
    startTimer();
  }, []);

  const startTimer = () => {
    setTimerStarted(true);
  };

  const handleInputChange = async (index, value) => {
    if (!isNaN(value) && value >= 0 && value <= 9) {
      const otpCopy = [...otp];
      otpCopy[index] = value;
      setOtp(otpCopy);
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
      if (index === otp.length - 1 && value !== "") {
        const otpPayload = {
          phone: formData.phoneNumber,
          otp: otpCopy.join(""),
          phone_code: formData.phoneCode,
        };
        const phone_verifid = await phone_verify(otpPayload);
        console.log(
          phone_verifid,
          "phone_verifidphone_verifidphone_verifidphone_verifidphone_verifidphone_verifid"
        );
        // if (phone_verifid) {
        const userLoginPayload = {
          first_name: formData?.firstName,
          last_name: formData?.lastName,
          email: formData?.email,
          phone: formData?.phoneNumber,
          phone_code: formData?.phoneCode,
          email_verified: true,
          country_id: formData?.country,
          email_verified_at: 1,
          phone_verified: 1,
          phone_verified_at: 1,
        };
        const reg = await register(userLoginPayload);
        stepPosition(4);
        localStorage.setItem("token", reg?.api_token);
        localStorage.setItem("userInfo", JSON.stringify(reg?.customer));
        // registryModalStatus(false);
        dispatch(setCustomerInfo(reg));
        modalStatus(true);
        // }
      }
    }
  };
  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const otpCopy = [...otp];
      otpCopy[index - 1] = "";
      setOtp(otpCopy);
      inputRefs.current[index - 1].focus();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const modalStatus = (status) => {
    setAddressStatus(status);
  };

  const userInfo = localStorage.getItem("userInfo") || "";
  const userInfolist = userInfo ? JSON.parse(userInfo) : "";

  return (
    <div>
      {/* {addressStatus ? <UserAddressModal /> : ""} */}

      {userInfolist?.customer_phone_verified ? (
        <DefaultModal
          title={""}
          showModal={addressStatus}
          setShowModal={setAddressStatus}
        >
          <UserAddressModal modalStatus={modalStatus} />
        </DefaultModal>
      ) : (
        ""
      )}
      <div className="ss:w-[335px] sx:w-[290px] sm:w-[475px]  lg:w-[526px] sx:h-[370px] ss:h-[450px] sm:h-full sx:px-1   lg:h-auto sx:overflow-scroll ss:overflow-hidden sx:overflow-x-hidden">
        <div className="w-[25px] cursor-pointer h-[25px] absolute top-[17px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
          {" "}
          <IoArrowBack
            className="text-[#ff6600]"
            onClick={() => {
              backButton(2);
              setOtp(["", "", "", ""]);
            }}
          />{" "}
        </div>

        <div className="m-auto w-[30%] sm:w-[40%]">
          {/* <img src={"/" + "./assets/images/otpman.png"} alt="sped-otp" /> */}
          <Image
            src={"./assets/images/otpman.png"}
            alt="sped-otp"
            width={400}
            height={400}
          />
        </div>
        <p className="text-[14px] md:text-[18px] font-[600]">Enter your code</p>
        <p className="text-[12px] md:text-[16px] font-[500] leading-5 md:leading-[25px]">
          {`We’ve sent a verification code to ${
            formData.phoneCode + formData.phoneNumber
          }. Enter the 4-digit
            code below to confirm your phone number.`}
        </p>
        <FormControl fullWidth className="">
          <div className="flex justify-between mt-[10px]">
            {otp.map((digit, index) => (
              <div className="md:mr-[15px] mr-2 " key={index}>
                <TextField
                  inputRef={(ref) => (inputRefs.current[index] = ref)}
                  id={`otp-${index}`}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  inputProps={{ maxLength: 1 }}
                />
              </div>
            ))}
          </div>
        </FormControl>
        <div className="flex justify-end sm:mt-3">
          {timerStarted && <small>Resend code in {formatTime(seconds)}s</small>}
        </div>
        <button
          //   disabled={timerStarted}
          type="button"
          className="w-full sx:h-[38px] sm:h-[48px] bg-brandColor text-white text-center rounded-[4px] sx:text-[12px] sm:text-[16px] font-[600] shadow-sm shadow-brandColor mt-3 sm:mt-3"
          onClick={async () => {
            setTimerStarted(true);
            otpFunction();
          }}
        >
          I didn&apos;t get code
        </button>
      </div>
    </div>
  );
}

export default OtpForm;
