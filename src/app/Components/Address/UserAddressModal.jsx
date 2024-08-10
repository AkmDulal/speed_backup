"use client";
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GoHomeFill, GoPlus } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoArrowBack, IoHomeOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineOtherHouses } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { toast } from "react-toastify";
import { getCity, getCountry } from "../../services/api/query/homepages";
import { getInTypeOptions, officeDeliveryTypeOptions } from "./helper";

import { useDispatch, useSelector } from "react-redux";
import {
  addressMe,
  addressMeDefaultSave,
  addressMeGet,
} from "../../services/api/query/homepages";
import {
  setCountryCity,
  setDocuments,
  setLatLng,
} from "../../services/redux/slice/globalDataSlice";
import LocationCreate from "./LocationCreate";

// import AddressImg from "../../assets/images/address-images.png";

// import { setRestaurantsLatLng } from "../../commonRedux/slice";

// Instructions
// step null: show all the address
// step 1: add new address
// step 2: kind of location
// step 3: address details
// step 4: map

const UserAddressModal = ({
  modalStatus,
  setModalStatus,
  modalActiveStep = null,
  disableFirstStepBackButton = true,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const address = useSelector((state) => state?.reducer?.address?.documents);
  const addressLatLngSlice = useSelector(
    (state) => state.reducer.addressLatLngSlice
  );
  const [mapStatusIsLocation, setMapStatusIsLocation] = useState(false);
  const [disabledStatus, setdisabledFun] = useState(true);

  const [step, setStep] = useState(modalActiveStep);
  const [addressLabelData, setAddressLabel] = useState("");
  const [cityError, setCityError] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userplace, setPlace] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [userAddressList, setuserAddressList] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleOptionClick = (data) => {
    // console.log(data?.type, "datadata");
    setSelectedOption(data?.type);
    setAddressLabel(data?.type);
  };

  const formik = useFormik({
    initialValues: {
      country: "",
      address: "",
      city: "",
      street: "",
      state: "",
      locationType: "",
      entrance: "",
      noOnDoor: "",
      floor: "",
      getInType: "",
      apartment: "",
      intercom: "",
      doorCode: "",
      buildingName: "",
      officeDeliveryType: "",
      officeFloor: "",
      companyName: "",
      instructions: "",
    },
    onSubmit: (values) => {
      // console.log(values, "values values");
    },
  });

  const handlePlaceSelect = (place) => {
    // console.log(place, "place place place");
    setPlace(place);
    const street = place ? place.label : "";
    formik.setFieldValue("address", street);
    const parts = street.split(",");
    const streetName = parts[parts.length - 2].trim();
    const countryName = place
      ? place?.value?.structured_formatting?.secondary_text
      : "";
    const cityName = place
      ? place?.value?.structured_formatting?.main_text
      : "";

    axios
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${cityName},${countryName}`
      )
      .then(function (response) {
        const data = response?.data;
        if (data && data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          dispatch(
            setLatLng({
              lat: latitude,
              lng: longitude,
            })
          );
        } else {
          console.log("Location not found");
        }
      })
      .catch(function (error) {});
    if (!selectedCountry) {
      setCityError(true);
      return;
    }

    setSelectedPlace(place);
    formik.setFieldValue("city", streetName);
    formik.setFieldValue("state", streetName);
    formik.setFieldValue("street", streetName);
  };

  const locationTypeOptions = [
    {
      name: "House",
      icon: <IoHomeOutline />,
    },
    {
      name: "Apartment",
      icon: <RiHomeOfficeLine />,
    },
    {
      name: "Office",
      icon: <HiOutlineBuildingOffice />,
    },
    {
      name: "Other",
      icon: <MdOutlineOtherHouses />,
    },
  ];
  const locationTypeOptionsFitter = locationTypeOptions?.filter(
    (option) => option.name !== "Apartment"
  );

  const getCountryCodeFromCountryName = (countryName) => {
    return countryName.slice(0, 3).toLowerCase();
  };

  const addressSave = async () => {
    const datalis = await addressMe({
      address: formik?.values?.address,
      floor: formik?.values?.floor,
      apartment: formik?.values?.apartment,
      entrance_staircase: formik?.values?.entrance,
      city: formik?.values?.city,
      state: formik?.values?.state,
      country: formik?.values?.country,
      landmark: "",
      latitude: `${addressLatLngSlice?.lat}`,
      longitude: `${addressLatLngSlice?.lng}`,
      location_type: formik?.values?.locationType,
      we_get_in: formik?.values?.getInType,
      address_type_label: addressLabelData,
      other_instractions: "",
      is_default: 1,
    });

    // if (datalis) {
    handleButtonClick(datalis);
    const streetAddress = datalis?.address.split(",")[0].trim();
    dispatch(
      setCountryCity({
        country: datalis?.country,
        city: streetAddress,
        address: streetAddress,
        lat: addressLatLngSlice?.lat,
        lng: addressLatLngSlice?.lng,
      })
    );
    modalStatus(false);
    router.push(`/en/${datalis?.country}/${datalis?.city}`);
    // }
  };

  const addressFunction = (data) => {
    dispatch(setDocuments(data));
  };

  const handleButtonClick = async (item) => {
    console.log(item, "item item item");
    const res = await addressMeDefaultSave({
      address_id: item?.address_id,
    });
    if (res) {
      setClickedButtons((prevClickedButtons) => [
        ...prevClickedButtons,
        item.address_type_label,
      ]);
      const countryCode = item?.country?.slice(0, 3).toLowerCase();
      const city = item?.city?.toLowerCase();
      const streetAddress = item?.address.split(",")[0].trim();
      dispatch(
        setCountryCity({
          country: item?.country,
          city: item?.city,
          address: streetAddress,
          lable: item?.location_type,
          lat: item?.latitude,
          lng: item?.longitude,
        })
      );
      router.push(`/en/${countryCode}/${city}`);
    }
  };
  const handleButtonClickCity = async (item) => {
    console.log(item, "item item item");
    setClickedButtons((prevClickedButtons) => [
      ...prevClickedButtons,
      item.item?.city_name,
    ]);
    dispatch(
      setCountryCity({
        country: item?.country?.country_code,
        city: item?.city_name,
        address: streetAddress,
        lable: item?.location_type,
        lat: item?.latitude,
        lng: item?.longitude,
      })
    );
    router.push(`/en/${item?.country?.country_code}/${item?.city_slug}`);
  };

  const disabledFun = (status) => {
    setdisabledFun(status);
  };

  useEffect(() => {
    const addressData = async () => {
      // token
      const token = localStorage.getItem("token");
      if (token) {
        const datalis = await addressMeGet();
        setuserAddressList(datalis);
        console.log(datalis, "datalisdatalisdatalisdatalis");
      }
    };
    addressData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (formik.values.locationType === "Apartment") {
      setSelectedOption("House");
    } else {
      setSelectedOption(formik.values.locationType);
    }
  }, [formik.values.locationType]);

  const token = localStorage.getItem("token");
  console.log(token, "token tokentokentoken");

  useEffect(() => {
    const cityListgetData = async () => {
      const list = await getCountry();
      setcountryList(list);
    };
    const citygetData = async (param) => {
      const cityListdata = await getCity("fin");
      setCityList(cityListdata);
    };
    citygetData();
    cityListgetData();
  }, []);
  const countryListData = countryList?.map((cityType) => ({
    code: cityType?.country_code,
    label: cityType?.country_name,
    alt: cityType?.alt_image,
    images: cityType?.country_image,
  }));

  console.log(cityList, "stepstepstep");
  console.log(selectedCountry, "stepselectedCountrystepstep");

  return (
    <div className="lg:w-[470px] w-full">
      {step === null ? (
        <div>
          <h3 className="text-[24px] font-[600] text-[#222] absolute top-[15px]">
            {" "}
            Where to?{" "}
          </h3>
          {userAddressList?.length ? (
            <div>
              {userAddressList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    addressFunction(item);
                    modalStatus(false);
                  }}
                  className="flex items-center justify-between border-b border-[#e2e2e2] "
                >
                  <div className="flex">
                    <div className="w-[30px]  flex items-center justify-center">
                      <GoHomeFill className="text-[30px] text-[#222]" />
                    </div>
                    <div className="ml-[15px] py-[10px]">
                      <p className="text-[#222] text-[16px] font-[600]">
                        {item?.address_type_label || item?.location_type}
                      </p>
                      <p className="text-[#222] text-[13px] font-[400]">
                        {item?.address}
                      </p>
                    </div>
                  </div>
                  {item?.is_default === 1 ? (
                    ""
                  ) : (
                    <>
                      {item.address_id !== 1 &&
                        !clickedButtons.includes(item.address_type_label) && (
                          <div>
                            <button
                              onClick={() => handleButtonClick(item)}
                              className="text-[16px] font-[500] bg-[#ffe0cc] text-brandColor py-[5px] px-[10px] rounded-[5px]"
                            >
                              Choose
                            </button>
                          </div>
                        )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div>
            <h6
              className="flex cursor-pointer w-full text-[13px] items-center py-[10px] mt-[20px] border-t-2 border-[#2222] font-[600]"
              onClick={() => {
                setStep(1);
              }}
            >
              <span className="flex items-center justify-center w-[50px]">
                <GoPlus className="text-[24px]  font-[600]" />
              </span>
              <span className="text-[16px] pl-[10px]"> Add New Address</span>
            </h6>

            <h6
              className="flex cursor-pointer w-full text-[13px] items-center py-[10px] border-t-2 border-[#2222] font-[600] leading-0"
              onClick={() => {
                setStep(6);
              }}
            >
              <span className="flex items-center justify-center w-[50px]">
                <TfiMenuAlt className="text-[20px]  font-[600]" />
              </span>
              <span className="text-[16px] pl-[10px]"> All Sped Cities </span>
            </h6>
          </div>
        </div>
      ) : null}
      {step === 1 ? (
        <div>
          {disableFirstStepBackButton && (
            <div className="w-[25px] cursor-pointer h-[25px] absolute top-[15px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
              {" "}
              <IoArrowBack
                className="text-[#ff6600]"
                onClick={() => setStep(null)}
              />{" "}
            </div>
          )}
          <p>Add new address</p>
          <div className=" overflow-hidden">
            <div className="lg:pb-[20px] pb-[10px] mt-[15px]">
              <FormControl fullWidth>
                <Autocomplete
                  id="country-select-demo"
                  options={countryListData}
                  autoHighlight
                  onChange={(event, newValue) => {
                    formik.setFieldValue("country", newValue?.label);
                    setSelectedCountry(newValue?.code);
                    setSelectedPlace("");
                    setCityError(false);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              </FormControl>
            </div>

            <div className="lg:pb-[20px] pb-[10px]">
              <FormControl fullWidth>
                <GooglePlacesAutocomplete
                  apiKey={"AIzaSyAn9hdgGsFJ2pGRLjICHFF_sWywPjjPAWg"}
                  selectProps={{
                    value: selectedPlace,
                    onChange: handlePlaceSelect,
                  }}
                  placeholder={selectedPlace}
                  inputClassName="w-full"
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: selectedCountry ? `${selectedCountry}` : "fin",
                    },
                  }}
                />
                {cityError && (
                  <p className="text-[#f00] font-[600] mt-[5px]">
                    Please select a country first
                  </p>
                )}
              </FormControl>
            </div>
            <div className="lg:pb-[20px] pb-[10px]">
              {token ? (
                <button
                  onClick={() => {
                    if (!formik.values.country) {
                      return toast.error("Please select country");
                    }
                    if (!formik.values.street) {
                      return toast.error("Please enter address");
                    }
                    setStep(2);
                  }}
                  className="w-full h-[56px] bg-brandColor text-[20px] font-[400] text-white rounded-[3px] shadow-sm shadow-brandColor"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() => {
                    const place = userplace;
                    const countryDetails = place?.value?.terms;
                    const country =
                      countryDetails[countryDetails.length - 1].value;
                    const city =
                      countryDetails[
                        countryDetails.length - 2
                      ].value.toLowerCase();
                    const countryCode = getCountryCodeFromCountryName(country);

                    const streetAddressplace = place?.value?.description
                      ?.split(",")[0]
                      .trim();
                    localStorage.setItem("userState", streetAddressplace);

                    const googleApiKey =
                      "AIzaSyDgZsCH8rHBgX7a2zb_RvdPK9GhM60u0jE";

                    let queryArray = [];
                    place?.value?.terms?.forEach((item) => {
                      queryArray.push(item.value);
                    });
                    const query = queryArray.join(",");

                    // AIzaSyDgZsCH8rHBgX7a2zb_RvdPK9GhM60u0jE

                    const address = `${place?.value?.terms
                      ?.map((item) => item.value)
                      .join(", ")}`;
                    // setStep(2);

                    axios
                      .get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
                      )
                      .then(function (response) {
                        const data = response?.data;
                        if (data && data.length > 0) {
                          const latitude = data[0].lat;
                          const longitude = data[0].lon;

                          console.log(`${country}`, "country");
                          console.log(`${city}`, "city");
                          console.log(`${countryCode}`, "countryCode");

                          if (countryCode && city) {
                            router.push(`/en/${countryCode}/${city}`);
                          }
                          console.log("Latitude:", latitude);
                          console.log("Longitude:", longitude);
                          if (place?.value?.terms.length === 3) {
                            dispatch(
                              setCountryCity({
                                country: countryCode,
                                city: city,
                                lable: streetAddressplace,
                                lat: latitude,
                                lng: longitude,
                              })
                            );
                          } else {
                            dispatch(
                              setCountryCity({
                                country: countryCode,
                                city: city,
                                lable: streetAddressplace,
                                lat: "",
                                lng: "",
                              })
                            );
                          }
                        } else {
                          console.log("Location not found");
                        }
                        modalStatus(false);
                      })
                      .catch(function (error) {
                        // handle error
                        console.log(error);
                      });
                  }}
                  className="w-full h-[56px] bg-brandColor text-[20px] font-[400] text-white rounded-[3px] shadow-sm shadow-brandColor"
                >
                  Continue
                </button>
              )}

              {/* <img
                src={AddressImg}
                alt="sped-address-images"
                className="w-full   pt-4"
              /> */}
            </div>
          </div>
        </div>
      ) : null}
      {step === 2 ? (
        <div>
          <div className="w-[25px] cursor-pointer h-[25px] absolute top-[15px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
            <IoArrowBack
              className="text-[#ff6600]"
              onClick={() => {
                formik.setFieldValue("country", "");
                formik.setFieldValue("street", "");
                setStep(1);
              }}
            />
          </div>

          <h6>What kind of location is this?</h6>
          <p className="leading-[20px] font-[500] text-[14px]">
            Help us find you faster by identifying the type of location this is.
          </p>
          <div>
            {locationTypeOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  addressFunction(item);
                  // modalStatus(false);
                }}
                className="flex items-center justify-between border-b border-[#e2e2e2] py-[15px]"
              >
                <div className="flex items-center">
                  <div className="w-[30px]  h-[30px] rounded-[30px] mr-[15px] bg-[#2222] flex items-center justify-center text-[14px]">
                    {item?.icon}
                  </div>
                  <p className="text-[#222] text-[16px] font-[600]">
                    {item?.name}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      formik.setFieldValue("locationType", item?.name);
                      setStep(3);
                    }}
                    className="bg-[#ffe0cc] leading-[15px] py-[13px] px-[25px] text-[13px] rounded-[5px] text-[#ff6601]"
                  >
                    Choose
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {step === 3 ? (
        <div>
          <div className="w-[25px] cursor-pointer h-[25px] absolute top-[15px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
            <IoArrowBack
              className="text-[#ff6600]"
              onClick={() => {
                formik.setFieldValue("locationType", "");
                formik.setFieldValue("entrance", "");
                formik.setFieldValue("apartment", "");
                formik.setFieldValue("getInType", "");
                formik.setFieldValue("intercom", "");
                formik.setFieldValue("doorCode", "");
                formik.setFieldValue("buildingName", "");
                formik.setFieldValue("officeDeliveryType", "");
                setStep(2);
              }}
            />
          </div>

          <h6>Address details</h6>
          <p className="leading-[20px] font-[500] text-[14px] pb-[20px]">
            Giving exact address details helps us deliver your order faster.
          </p>
          <div className="lg:pb-[20px] pb-[10px]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Location Type
              </InputLabel>
              <Select
                labelId="country-label"
                id="locationType-select"
                value={formik.values.locationType}
                label="locationType"
                onChange={formik.handleChange}
                name="locationType"
                required
              >
                {locationTypeOptions?.map((country) => (
                  <MenuItem key={country.name} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {formik?.values?.locationType &&
          formik?.values?.locationType === "House" ? (
            <div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Entrance / Staircase"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.entrance}
                    name="entrance"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Name / Number on door"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.noOnDoor}
                    name="noOnDoor"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Other instructions for the courier"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.instructions}
                    name="instructions"
                    className="w-full"
                  />
                </FormControl>
              </div>
            </div>
          ) : formik?.values?.locationType &&
            formik?.values?.locationType === "Apartment" ? (
            <div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Entrance / Staircase"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.entrance}
                    name="entrance"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Floor"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.floor}
                    name="floor"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Appartment"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.apartment}
                    name="apartment"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                How do we get in?
                {/* radio */}
                {getInTypeOptions.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      className="w-[20px] h-[20px] border-4 mr-[10px]"
                      name="getInType"
                      id={item.name}
                      value={item.name}
                      checked={formik.values.getInType === item.name}
                      onChange={formik.handleChange}
                    />
                    <label className="font-[500]" htmlFor={item.name}>
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
              {formik?.values?.locationType &&
              formik?.values?.getInType === "Doorbell / Intercom" ? (
                <div className="lg:pb-[20px] pb-[10px]">
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Intercom"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.intercom}
                      name="intercom"
                      className="w-full"
                    />
                  </FormControl>
                </div>
              ) : null}
              {formik?.values?.locationType &&
              formik?.values?.getInType === "Door code" ? (
                <div className="lg:pb-[20px] pb-[10px]">
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Door code"
                      variant="outlined"
                      onChange={formik.handleChange}
                      value={formik.values.doorCode}
                      name="doorCode"
                      className="w-full"
                    />
                  </FormControl>
                </div>
              ) : null}
            </div>
          ) : formik?.values?.locationType === "Office" ? (
            <div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Building Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.buildingName}
                    name="buildingName"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <p>Where should we bring the delivery?</p>
                {officeDeliveryTypeOptions.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="officeDeliveryType"
                      className="w-[20px] h-[20px] border-4 mr-[10px]"
                      id={item.name}
                      value={item.name}
                      checked={formik.values.officeDeliveryType === item.name}
                      onChange={formik.handleChange}
                    />
                    <label className="font-[500]" htmlFor={item.name}>
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Floor"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.officeFloor}
                    name="officeFloor"
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Company Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    name="companyName"
                    className="w-full"
                  />
                </FormControl>
              </div>
            </div>
          ) : formik?.values?.locationType === "Other" ? (
            <div>
              <div className="lg:pb-[20px] pb-[10px]">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Address details"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.address_details}
                    name="address_details"
                    className="w-full"
                  />
                </FormControl>
              </div>
            </div>
          ) : null}
          <div>
            <p>Address location</p>
            <p className="leading-[20px] font-[500] text-[14px] pb-[20px]">
              Pinpointing your exact location on the map helps us find you fast.
            </p>

            {mapStatusIsLocation ? (
              <div className="h-[100px]">
                {" "}
                <LocationCreate
                  addressLatLngSlice={{
                    lat: Number(addressLatLngSlice?.lat),
                    lng: Number(addressLatLngSlice?.lng),
                  }}
                  height="100px"
                />{" "}
              </div>
            ) : (
              <button
                onClick={() => setStep(4)}
                className="w-full flex items-center justify-center h-[56px] bg-brandColor text-[16px] font-[400] text-white rounded-[3px] shadow-sm shadow-brandColor"
              >
                <IoLocationOutline className="text-[20px] mr-[10px]" /> Edit
                entrance location on a map
              </button>
            )}
            <p className="pt-[10px]">Address label</p>
            <p className="leading-[20px] font-[500] text-[14px] pb-[20px]">
              Labelling addresses helps you to choose between them. Choose
              &apos;Other&apos; to create your own custom label.
            </p>

            {/* formik.values.locationType */}

            <div className="grid lg:grid-cols-3 grid-cols-3 gap-4 mb-[25px]">
              {locationTypeOptionsFitter?.map((item, index) => (
                <div
                  key={index}
                  className="items-center cursor-pointer"
                  onClick={() =>
                    handleOptionClick({
                      index: index,
                      type: item.name,
                    })
                  }
                >
                  <div
                    className={`flex flex-col justify-center rounded-[10px] items-center p-[20px] border-2 ${
                      selectedOption === item.name
                        ? "border-[#ff6600] text-[#ff6600]"
                        : "border-[#000]"
                    }`}
                  >
                    <p className="text-[24px]"> {item?.icon} </p>
                    <p className="text-[14px]"> {item?.name} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* {addressLabelData} */}
          {addressLabelData === "Other" ? (
            <div className="lg:pb-[20px] pb-[10px]">
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  // onChange={formik.handleChange}
                  // value={formik.values.instructions}
                  name="other"
                  className="w-full"
                />
              </FormControl>
            </div>
          ) : (
            ""
          )}

          <div className="lg:pb-[20px] pb-[10px]">
            <button
              onClick={() => {
                addressSave();
              }}
              className="w-full h-[56px] bg-brandColor text-[20px] font-[400] text-white rounded-[3px] shadow-sm shadow-brandColor"
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
      {step === 4 ? (
        <div>
          <div className="w-[25px] cursor-pointer h-[25px] absolute top-[15px] bg-[#ffe0cc] rounded-full justify-center items-center flex">
            <IoArrowBack
              className="text-[#ff6600]"
              onClick={() => {
                setStep(3);
              }}
            />
          </div>

          <LocationCreate
            addressLatLngSlice={{
              lat: Number(addressLatLngSlice?.lat),
              lng: Number(addressLatLngSlice?.lng),
            }}
            disabledFun={disabledFun}
          />

          <button
            disabled={disabledStatus}
            type="button"
            className={`w-full bg-[#ff6600] py-[15px] rounded-[10px] mt-[20px] text-[#fff] text-[18px] cursor-pointer ${
              disabledStatus ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              setStep(3);
              setMapStatusIsLocation(true);
            }}
          >
            {" "}
            Continue{" "}
          </button>
          {/*  */}
        </div>
      ) : step === 6 ? (
        <>
          {cityList?.length ? (
            <div>
              <h3 className="text-[24px] font-[600] text-[#222] absolute top-[15px] flex items-center">
                {" "}
                <IoArrowBack
                  className="text-[#ff6600] mr-[10px]"
                  onClick={() => {
                    setStep(null);
                  }}
                />{" "}
                Sped Cities
              </h3>

              {cityList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    // addressFunction(item);
                    modalStatus(false);
                  }}
                  className="flex items-center justify-between border-b border-[#e2e2e2] "
                >
                  <div className="flex">
                    <div className="w-[30px]  flex items-center justify-center">
                      <GoHomeFill className="text-[30px] text-[#222]" />
                    </div>
                    <div className="ml-[15px] py-[10px]">
                      <p className="text-[#222] text-[16px] font-[600]">
                        {item?.city_name}
                      </p>
                      <p className="text-[#222] text-[13px] font-[400]">
                        {item?.city_name} {item?.country?.country_name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleButtonClickCity(item)}
                      className="text-[16px] font-[500] bg-[#ffe0cc] text-brandColor py-[5px] px-[10px] rounded-[5px]"
                    >
                      Choose
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : null}
    </div>
  );
};

// cityList

export default UserAddressModal;
