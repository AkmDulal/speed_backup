"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  setCountryCity,
  setCustomerInfo,
  setDocuments,
  setcountryCityLatLngSlice,
} from "../../services/redux/slice/globalDataSlice";

import { FaApple } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addressMeGet, login } from "../../services/api/query/homepages";
import Loader from "../Loader";
import AccountCreateForm from "./AccountCreateForm";
import OtpForm from "./OtpForm";

const LoginComponent = ({ modalStatus }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState([]);
  const [currentFormData, setCurrentFormData] = useState([]);

  const popupCenter = (url, title) => {
    setLoader(false);
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  const handleFormSubmit = (formData) => {
    setCurrentFormData(formData);
  };
  const stepPosition = (id) => {
    console.log(id);
    setStep(id);
  };

  const googleloginFunction = useCallback(async () => {
    setLoader(true);
    if (status === "authenticated") {
      try {
        const obj = { email: session?.user?.email };
        const data = await login(obj);

        if (data?.api_token) {
          console.log(data, "datadatadatadatadatadata");
          localStorage.setItem("token", data?.api_token);
          dispatch(setCustomerInfo(data));
          const addressdata = await addressMeGet();
          const addreslist = addressdata?.find(
            (item) => Number(item?.is_default) === 1
          );
          const streetAddress = addreslist?.address.split(",")[0].trim();
          dispatch(setDocuments(addreslist));
          router.push(`/en/fin/${addreslist?.city}`);
          console.log(addreslist, "addreslist addreslist addreslist");
          dispatch(
            setCountryCity({
              country: addreslist?.country,
              city: streetAddress,
              address: addreslist?.address_type_label,
              lat: addreslist?.latitude,
              lng: addreslist?.longitude,
            })
          );

          axios
            .get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${addreslist?.city},${addreslist?.country}`
            )
            .then(function (response) {
              const data = response?.data;
              if (data && data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                dispatch(
                  setcountryCityLatLngSlice({
                    lat: latitude,
                    lng: longitude,
                  })
                );
              } else {
                console.log("Location not found");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          setLoader(false);
          modalStatus(false);
        } else {
          setStep(2);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error while logging in:", error);
      }
    } else {
      popupCenter("/google", {
        callbackUrl: `https://www.sped.delivery/api/auth/callback`,
      });
    }
  }, [status, session, dispatch, router]); // Add other dependencies if needed

  useEffect(() => {
    if (status === "authenticated") {
      googleloginFunction();
    }
  }, [status, googleloginFunction]);

  // Loader
  // const googleloginFunction = async () => {
  //   setLoader(true);
  //   if (`${status}` === "authenticated") {
  //     try {
  //       const obj = { email: session?.user?.email };
  //       const data = await login(obj);

  //       if (data?.api_token) {
  //         console.log(data, "datadatadatadatadatadata");
  //         localStorage.setItem("token", data?.api_token);
  //         dispatch(setCustomerInfo(data));
  //         const addressdata = await addressMeGet();
  //         const addreslist = addressdata?.find(
  //           (item) => Number(item?.is_default) === 1
  //         );
  //         const streetAddress = addreslist?.address.split(",")[0].trim();
  //         dispatch(setDocuments(addreslist));
  //         // -&longitude=${addreslist?.latitude}&longitude=${addreslist?.longitude}
  //         router.push(`/en/fin/${addreslist?.city}`);
  //         console.log(addreslist, "addreslist addreslist addreslist");
  //         dispatch(
  //           setCountryCity({
  //             country: addreslist?.country,
  //             city: streetAddress,
  //             address: addreslist?.address_type_label,
  //             lat: addreslist?.latitude,
  //             lng: addreslist?.longitude,
  //           })
  //         );

  //         axios
  //           .get(
  //             `https://nominatim.openstreetmap.org/search?format=json&q=${addreslist?.city},${addreslist?.country}`
  //           )
  //           .then(function (response) {
  //             const data = response?.data;
  //             if (data && data.length > 0) {
  //               const latitude = data[0].lat;
  //               const longitude = data[0].lon;
  //               dispatch(
  //                 setcountryCityLatLngSlice({
  //                   lat: latitude,
  //                   lng: longitude,
  //                 })
  //               );
  //             } else {
  //               console.log("Location not found");
  //             }
  //           })
  //           .catch(function (error) {
  //             // handle error
  //             console.log(error);
  //           });
  //         setLoader(false);
  //         modalStatus(false);
  //       } else {
  //         setStep(2);
  //         setLoader(false);
  //       }
  //     } catch (error) {
  //       console.error("Error while logging in:", error);
  //     }
  //   } else {
  //     popupCenter("/google", {
  //       callbackUrl: `https://www.sped.delivery/api/auth/callback`,
  //     });

  //     // https://www.backend.sped.delivery
  //   }
  // };
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     googleloginFunction();
  //   }
  // }, [status, googleloginFunction]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Login With Email
  const loginWithEmail = async (e) => {
    // setLoader(true);
    const email = e.target.value;
    if (validateEmail(email)) {
      try {
        const obj = { email: email };
        const data = await login(obj);
        if (data?.api_token) {
          localStorage.setItem("token", data?.api_token);
          dispatch(setCustomerInfo(data));
          const addressdata = await addressMeGet();
          const addreslist = addressdata?.find(
            (item) => Number(item?.is_default) === 1
          );
          const streetAddress = addreslist?.address.split(",")[0].trim();
          dispatch(setDocuments(addreslist));
          // -&longitude=${addreslist?.latitude}&longitude=${addreslist?.longitude}
          router.push(`/en/fin/${addreslist?.city}`);
          dispatch(
            setCountryCity({
              country: addreslist?.country,
              city: streetAddress,
              address: addreslist?.address_type_label,
            })
          );

          axios
            .get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${addreslist?.city},${addreslist?.country}`
            )
            .then(function (response) {
              const data = response?.data;
              if (data && data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                dispatch(
                  setcountryCityLatLngSlice({
                    lat: latitude,
                    lng: longitude,
                  })
                );
              } else {
                console.log("Location not found");
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
          setLoader(false);
          modalStatus(false);
        } else {
          setStep(2);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error while logging in:", error);
      }
    }
  };

  const allFormData = (data) => {
    setFormData(data);
  };
  const registryModalFun = (status) => {
    modalStatus(status);
  };
  console.log(step, "stepstepstepstepstepstep");
  return (
    <div>
      {loader ? <Loader /> : ""}
      {step === 1 ? (
        <div className=" ss:w-[335px] sx:w-[290px] sm:w-[475px]  lg:w-[526px] sx:h-[350px] ss:h-[460px] sm:h-full sx:px-1   lg:h-auto sx:overflow-scroll ss:overflow-hidden overflow-x-hidden">
          <div>
            <p className="sx:text-[12px] sm:text-[16px] leading-[16px] font-[400] text-[#94857B] mb-6">
              Log in below or create a new Sped account.
            </p>
          </div>
          <div
            onClick={() => googleloginFunction()}
            className="w-full sx:h-[38px] sm:h-[48px] bg-white flex items-center rounded-[4px] px-4 cursor-pointer"
          >
            <div>
              {/* <img src={googleIcon} alt="" className="sx:w-[14px] sm:w-full" /> */}
            </div>
            <div className="w-11/12 flex justify-center items-center h-[48px]">
              <p className="sx:text-[12px] sm:text-[16px] leading-[24px] font-[600] text-[#4B3C32]">
                Continue with Google
              </p>
            </div>
          </div>
          <div className="w-full sx:h-[38px] sm:h-[48px] bg-[#1A79FF] flex items-center rounded-[4px] px-4 my-3 md:my-6 cursor-pointer">
            <div>
              {/* <img src={facebookIcon} alt="" className="sx:w-[14px] sm:w-full" /> */}
            </div>
            <div className="w-11/12 flex justify-center items-center h-[48px]">
              <p className="sx:text-[12px] sm:text-[16px] leading-[24px] font-[600] text-white">
                Continue with Facebook
              </p>
            </div>
          </div>
          <div className="w-full sx:h-[38px] sm:h-[48px] bg-[#000000] flex items-center rounded-[6px] px-4 my-3 md:my-6 cursor-pointer">
            <div>
              <FaApple className="fill-white sx:w-[14px] sm:w-full" />
            </div>
            <div className="w-11/12 flex justify-center items-center h-[48px]">
              <p className="sx:text-[12px] sm:text-[16px] leading-[24px] font-[600] text-white">
                Continue with Apple
              </p>
            </div>
          </div>
          <div className="w-full h-[20px] flex items-center sx:my-3 my-6">
            <div className="w-1/3 border-[1px] border-[#ECE0D8] opacity-50"></div>
            <div className="sx:w-1/2 ss:w-1/3 sx:text-[12px] sm:text-[16px] leading-[16px] font-[400] text-[#332922] text-center">
              or log in with email
            </div>
            <div className="w-1/3 border-[1px] border-[#ECE0D8] opacity-50"></div>
          </div>
          <form>
            <div className="flex items-center w-full justify-center sx:h-[38px] sm:h-[48px]">
              <div className="bg-[#EDE7E4] sx:h-[38px] sm:h-[48px] w-[68px] flex items-center justify-center rounded-l-[4px]">
                <MdOutlineEmail className="sx:w-[14px] w-[24px] h-[24px] fill-[#998A80]" />
              </div>
              <div className="w-full rounded-r-[12px] sx:h-[38px] sm:h-[48px]">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => loginWithEmail(e)}
                  placeholder="Email address"
                  className="flex text-[14px] sm:text-[16px] font-[400] leading-[24px] h-full bg-[#EDE7E4] w-full focus:outline-none rounded-r-[4px]"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full sx:h-[38px] sm:h-[48px] bg-brandColor text-white text-center rounded-[4px] sx:text-[12px] sm:text-[16px] font-[600] shadow-sm shadow-brandColor mt-3 sm:mt-6"
            >
              Next
            </button>
          </form>
          <div className="w-full sx:mt-3 mt-6">
            <p className="sx:text-[9.6px] text-[14px] font-[400] leading-[25.5px] text-[#94857B] tracking-wide">
              Please visit{" "}
              <span className="font-[600] text-[#FF6600] underline">
                Sped Privacy Statement
              </span>{" "}
              to learn more about personal data processing at Sped. You can
              access the local Privacy Statement related to your Sped account
              after you have provided the country and language preferences
              applicable to you during registration. This site is protected by
              hCaptcha. The hCaptcha{" "}
              <span className="font-[500] text-[#FF6600] underline">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="font-[500] text-[#FF6600] underline">
                Terms of Service
              </span>{" "}
              apply.
            </p>
          </div>
        </div>
      ) : step === 2 ? (
        <AccountCreateForm
          session={session}
          onSubmit={handleFormSubmit}
          stepPosition={stepPosition}
          allFormData={allFormData}
        />
      ) : step === 3 ? (
        <OtpForm
          // backButton={stepPosition}
          currentFormData={currentFormData}
          formData={formData}
          stepPosition={stepPosition}
          registryModalStatus={registryModalFun}
          modalStatus={registryModalFun}
        />
      ) : (
        ""
      )}

      {/* ) : step === 4 ? (
        <UserAddressModal
          modalStatus={registryModalFun}
          // setModalStatus={setShowUserAddressModal}
        />
      ) : (
        ""
      )} */}
    </div>
  );
};
export default LoginComponent;

// UserAddressModal
