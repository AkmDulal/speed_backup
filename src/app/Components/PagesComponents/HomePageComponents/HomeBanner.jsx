"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setCountryCity } from "../../../services/redux/slice/globalDataSlice";

function HomeBanner() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getCountryCodeFromCountryName = (countryName) => {
    return countryName.slice(0, 3).toLowerCase();
  };

  const selectedAddress = useSelector(
    (state) => state?.reducer?.addressSlice?.documents
  );
  const customerInformation = useSelector(
    (state) => state.reducer.customerInformation
  );
  console.log(
    selectedAddress,
    "selectedAddress selectedAddress selectedAddress selectedAddress"
  );
  const countryCitySlice = useSelector(
    (state) => state?.reducer?.countryCitySlice || []
  );
  const token = localStorage.getItem("token");

  const lat =
    selectedAddress?.latitude && token
      ? `&latitude=${selectedAddress?.latitude}`
      : "";
  const lng =
    selectedAddress?.longitude && token
      ? `&longitude=${selectedAddress?.longitude}`
      : "";
  const streetLat = countryCitySlice?.lat
    ? `&latitude=${countryCitySlice?.lat}`
    : "";
  const streetlng = countryCitySlice?.lng
    ? `&longitude=${countryCitySlice?.lng}`
    : "";

  console.log(lat, "lat lat lat");
  console.log(lng, "lng  lng lng");
  console.log(streetLat, "streetLat streetLat streetLat");
  console.log(streetlng, "streetlng");
  console.log(`${streetLat}${streetlng}`, "stre${streetLat}${streetlng}etlng");
  // localStorage.setItem("resturant_lat", `${streetLat}${streetlng}`);
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    const countryDetails = place?.value?.terms;
    const country = countryDetails[countryDetails.length - 1].value;
    const city = countryDetails[countryDetails.length - 2].value.toLowerCase();
    const countryCode = getCountryCodeFromCountryName(country);
    const streetAddressplace = place?.value?.description?.split(",")[0].trim();
    console.log(countryCode, "countryCode countryCode");
    console.log(city, "city city");

    const address = `${place?.value?.terms
      ?.map((item) => item.value)
      .join(", ")}`;

    axios
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      )
      .then(function (res) {
        const data = res?.data;
        if (data && data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;

          if (country && city) {
            router.push(`/en/${countryCode}/${city}`);
          }
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          if (place?.value?.terms.length === 3) {
            dispatch(
              setCountryCity({
                country: countryCode,
                city: city,
                address: streetAddressplace,
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
                address: streetAddressplace,
                lable: streetAddressplace,
                lat: "",
                lng: "",
              })
            );
          }
        } else {
          console.log("Location not found");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // dispatch(setCountryCity({ country: countryCode, city: city }));
    // if (country && city) {
    //   router.push(`/${countryCode}/${city}`);
    // }
    // const modifiedData = {
    //   ...selectedAddress,
    //   documents: {
    //     ...selectedAddress?.documents,
    //     latitude: "",
    //     longitude: "",
    //   },
    // };
    // dispatch(setDocuments(modifiedData));
    // const streetAddress = selectedAddress?.address.split(",")[0].trim();
    // localStorage.setItem("userState", streetAddress);
  };

  return (
    <div className=" py-10 lg:px-[20px] w-full bg-[#fff]">
      <div className=" lg:grid-cols-1 lg:flex grid grid-cols-1 gap-4">
        <div className="col-span-5 w-full">
          <h3 className="text-titleColor font-[600] mb-[20px] lg:pt-[10%] lg:text-[50px] md:text-[30px] lg:leading-[60px] leading-[25px] md:leading-[40px] w-full !text-left ">
            Feeling useless in <br></br> the{" "}
            <span className="text-brandColor">kitchen</span>?
          </h3>

          <GooglePlacesAutocomplete
            apiKey={"AIzaSyAn9hdgGsFJ2pGRLjICHFF_sWywPjjPAWg"}
            selectProps={{
              value: selectedPlace,
              onChange: handlePlaceSelect,
            }}
            placeholder={selectedPlace}
            inputClassName="w-full h-[30px]"
          />
          <div className="flex mt-[15px] md:w-[250px]">
            <img src="./assets/images/share_location.svg" alt="icon" />
            <p className="!text-[#332922] !text-[16px] !ml-[10px] !font-[400] cursor-pointer">
              {" "}
              Share location{" "}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <img className="" src="./assets/images/banner_img.png" alt="banner" />
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
