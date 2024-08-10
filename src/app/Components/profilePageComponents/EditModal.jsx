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
// import useAxiosPost from "../../../customHooks/useAxiosPost";
// import Loader from "../../../components/CommonComponents/Loader/Loader";

const EditModal = ({ userInfo, setOpenEditModal }) => {
  const [, updateProfile, loaderOnUpdateProfile] = useAxiosPost();
  const { customer_phone_code, customer_phone } = userInfo;
  const formik = useFormik({
    initialValues: {
      phoneCode: customer_phone_code || "",
      phoneNumber: customer_phone || "",
    },
    onSubmit: (values) => {
      const payload = {
        ...userInfo,
        customer_phone_code: values.phoneCode,
        customer_phone: values.phoneNumber,
      };
      // updateProfile(
      //   "/me/profile/update",
      //   payload,
      //   (res) => {
      //     localStorage.setItem("userInfo", JSON.stringify(res?.data));
      //     setOpenEditModal(false);
      //   },
      //   true
      // );
    },
  });
  return (
    <div>
      {/* {loaderOnUpdateProfile && <Loader />} */}
      <div className="flex lg:pb-[20px] pb-[10px] gap-1">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Phone Code</InputLabel>
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
      <button
        type="button"
        className="w-full sx:h-[38px] sm:h-[48px] bg-brandColor text-white text-center rounded-[4px] sx:text-[12px] sm:text-[16px] font-[600] shadow-sm shadow-brandColor mt-3 sm:mt-6"
        onClick={formik.handleSubmit}
      >
        Update
      </button>
    </div>
  );
};

export default EditModal;
