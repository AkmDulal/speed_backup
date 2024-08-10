"use client";
/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import numberImage from "../../../assets/icons/Number_img.svg";
import OptMan from "../../../assets/images/otpman.png";
import Loader from "../../../Components/Loader/Loader";
import useAxiosPost from "../../../customHooks/useAxiosPost";

const MobileNumberModal = ({ setShowModal, userInfo }) => {
  const [, updateProfile, loaderOnUpdateProfile] = useAxiosPost();
  const { customer_phone_code, customer_phone } = userInfo;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const inputRefs = useRef([]);
  const [, verifyPhoneNumber, loaderOnVerifyPhoneNumber] = useAxiosPost();
  const [seconds, setSeconds] = useState(90);
  const [timerStarted, setTimerStarted] = useState(false);
  const [, getOtp, loaderOnGetOtp] = useAxiosPost();

  const formik = useFormik({
    initialValues: {
      phoneCode: customer_phone_code || "",
      phoneNumber: customer_phone || "",
    },
    onSubmit: (values) => {
      const payload = {
        first_name: userInfo?.customer_first_name,
        last_name: userInfo?.customer_last_name,
        email: userInfo?.customer_email,
        phone_code: values.phoneCode,
        phone: values.phoneNumber,
      };
      updateProfile(
        "/me/profile/update",
        payload,
        (res) => {
          localStorage.setItem("userInfo", JSON.stringify(res?.data));
          const otpPayload = {
            phone: formik?.values?.phoneNumber,
            phone_code: formik?.values?.phoneCode,
          };
          getOtp("/phone/send-otp", otpPayload, null, true);
          setStep(2);
          startTimer();
        },
        true
      );
    },
  });

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const otpCopy = [...otp];
      otpCopy[index - 1] = "";
      setOtp(otpCopy);
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    let timer;

    if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, seconds]);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value >= 0 && value <= 9) {
      const otpCopy = [...otp];
      otpCopy[index] = value;
      setOtp(otpCopy);
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
      if (index === otp.length - 1 && value !== "") {
        const otpPayload = {
          phone: formik.values.phoneNumber,
          otp: otpCopy.join(""),
          phone_code: formik.values.phoneCode,
        };
        verifyPhoneNumber(
          "/phone/verify",
          otpPayload,
          () => {
            setShowModal(false);
          },
          true
        );
      }
    }
  };

  const startTimer = () => {
    setTimerStarted(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      {step === 1 ? (
        <div className="w-[310px] ss:w-[340px] sm:w-full flex flex-col items-center">
          {loaderOnUpdateProfile && <Loader />}
          <div className="mb-6">
            <img
              src={numberImage}
              alt=""
              className="w-[100px] ss:w-[150px] sm:w-full"
            />
          </div>
          <div className="w-full mb-6">
            <p className="text-[24px] sm:text-[34px] font-[700] leading-[34px] text-[#332922]">
              Mobile number
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit} className="">
              <div className="flex items-center w-full ">
                <div className="w-1/3">
                  <div className="w-full flex h-[64px] items-center">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Phone Code
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          formik.values.phoneCode
                            ? formik.values.phoneCode
                            : customer_phone_code
                        }
                        label="Phone Code"
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={"+1"}>+1</MenuItem>
                        <MenuItem value={"+2"}>+2</MenuItem>
                        <MenuItem value={"+3"}>+3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="w-2/3 pl-2">
                  <div className="w-full flex h-[64px] items-center">
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Phone number"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                        name="phoneNumber"
                        className="w-full"
                      />
                    </FormControl>
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
      ) : (
        <div className="ss:w-[335px] sx:w-[290px] sm:w-[475px]  lg:w-[526px] sx:h-[370px] ss:h-[450px] sm:h-full sx:px-1   lg:h-auto sx:overflow-scroll ss:overflow-hidden sx:overflow-x-hidden">
          {(loaderOnVerifyPhoneNumber || loaderOnGetOtp) && <Loader />}
          <div className="w-[25px] cursor-pointer h-[25px] absolute top-[17px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
            {" "}
            <IoArrowBack
              className="text-[#ff6600]"
              onClick={() => {
                setStep(1);
                setOtp(["", "", "", ""]);
              }}
            />{" "}
          </div>

          <div className="m-auto w-[30%] sm:w-[40%]">
            <img src={OptMan} alt="sped-otp" />
          </div>
          <p className="text-[14px] md:text-[18px] font-[600]">
            Enter your code
          </p>
          <p className="text-[12px] md:text-[16px] font-[500] leading-5 md:leading-[25px]">
            {`We’ve sent a verification code to ${
              formik.values.phoneCode + formik.values.phoneNumber
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
            {timerStarted && (
              <small>Resend code in {formatTime(seconds)}s</small>
            )}
          </div>
          <button
            disabled={timerStarted}
            type="button"
            className="w-full sx:h-[38px] sm:h-[48px] bg-brandColor text-white text-center rounded-[4px] sx:text-[12px] sm:text-[16px] font-[600] shadow-sm shadow-brandColor mt-3 sm:mt-3"
            onClick={() => {
              const otpPayload = {
                phone: formik?.values?.phoneNumber,
                phone_code: formik?.values?.phoneCode,
              };
              getOtp(
                "/phone/send-otp",
                otpPayload,
                (res) => {
                  console.log(res?.data, "res");
                },
                true
              );
            }}
          >
            I didn&apos;t get code
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNumberModal;
