"use client";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import _ from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCountry, otpSend } from "../../services/api/query/homepages";

function AccountCreateForm({ session, onSubmit, stepPosition, allFormData }) {
  // console.log(session, "session session");
  const [countryList, setCountryList] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: session ? `${session?.user?.email}` : "",
      country: "10",
      firstName: session ? `${session?.user?.name}` : "",
      lastName: "",
      phone: "",
      phoneCode: "358",
      referralCode: "",
      otp: null,
      isEmailVerified: false,
    },
    onSubmit: () => {},
  });
  useEffect(() => {
    countrylistCall();
  }, []);

  const countrylistCall = async () => {
    const countryListgetData = async () => {
      const countryList = await getCountry();
      return countryList;
    };
    const countryList = await countryListgetData();
    setCountryList(countryList);
  };
  const submitFunction = async () => {
    if (!formik.values.country) return toast.warn("Please select country");
    if (!formik.values.firstName) return toast.warn("Please enter first name");
    if (!formik.values.lastName) return toast.warn("Please enter last name");
    if (!formik.values.email) return toast.warn("Please enter email");
    if (!formik.values.phoneCode) return toast.warn("Please enter phone code");
    if (!formik.values.phoneNumber)
      return toast.warn("Please enter phone number");
    const otpPayload = {
      phone: formik?.values?.phoneNumber,
      phone_code: formik?.values?.phoneCode,
    };
    console.log(otpPayload, "otpPayloadotpPayloadotpPayloadotpPayload");
    const otpStatus = await otpSend(otpPayload);
    console.log(_.isNumber(otpStatus), "otpStatus otpStatus otpStatus");
    if (_.isNumber(otpStatus)) {
      allFormData(formik?.values);
      stepPosition(3);
    }
  };

  return (
    <div className=" ss:w-[335px] sx:w-[290px] sm:w-[475px]  lg:w-[526px] sx:h-[350px] ss:h-[450px] sm:h-full sx:px-1 lg:h-auto sx:overflow-scroll ss:overflow-hidden sx:overflow-x-hidden">
      <h5 className="lg:text-[20px] text-[15px] font-[600] pb-[10px]">
        Create an account
      </h5>
      <div className="lg:pb-[20px] py-[5px]">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            value={formik.values.country}
            label="Country"
            onChange={formik.handleChange}
            name="country"
          >
            {countryList?.map((country) => (
              <MenuItem
                key={country.country_name}
                value={country.country_id}
                label={country.country_name}
              >
                {country.country_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex lg:pb-[20px]  py-[5px]">
        <div className="w-[50%] mr-[15px]">
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              name="firstName"
              className="w-full"
            />
          </FormControl>
        </div>
        {/* {console.log("values", formik.values)} */}

        <div className="w-[50%]">
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              name="lastName"
            />
          </FormControl>
        </div>
      </div>

      <div className="lg:pb-[20px] py-[5px]">
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
        </FormControl>
      </div>
      <div className="lg:pb-[20px] py-[5px]">
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            name="phoneNumber"
            placeholder="1234567890"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <select
                    style={{ border: "none", background: "transparent" }}
                    id="country-code-select"
                    value={formik.values.phoneCode}
                    onChange={() => {
                      formik.setFieldValue("phoneCode", event.target.value);
                    }}
                  >
                    <option value="+358">+358</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </div>
      <div className="lg:pb-[20px] py-[5px]">
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Referral Code"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.referralCode}
            name="referralCode"
          />
        </FormControl>
      </div>
      <button
        type="button"
        className="w-full sx:h-[38px] sm:h-[48px] bg-brandColor text-white text-center rounded-[4px] sx:text-[12px] sm:text-[16px] font-[600] shadow-sm shadow-brandColor mt-3 sm:mt-6"
        onClick={() => {
          submitFunction();
        }}
      >
        Next
      </button>
    </div>
  );
}

export default AccountCreateForm;
