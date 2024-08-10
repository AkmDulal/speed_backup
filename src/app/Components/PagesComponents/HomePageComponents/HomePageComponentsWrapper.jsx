"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../../services/api/query/homepages";
import { setDocuments } from "../../../services/redux/slice/globalDataSlice";
import HomeAppSection from "./HomeAppSection";
import HomeBanner from "./HomeBanner";
import HomeCountries from "./HomeCountries";
import HomeDelivered from "./HomeDelivered";
import HomeHungrySection from "./HomeHungrySection";
import HomeKnowSection from "./HomeKnowSection";

const HomePageComponentsWrapper = () => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state?.reducer?.addressSlice);

  const [countryList, setcountryList] = useState([]);
  // const countryList = await countryListgetData();

  useEffect(() => {
    countryListgetData();
    // const modifiedData = {
    //   // ...selectedAddress,
    //   documents: {
    //     ...selectedAddress.documents,
    //     latitude: "",
    //     longitude: "",
    //   },
    // };
    const modifiedData = {
      ...selectedAddress,
      ...selectedAddress.documents,
      latitude: "",
      longitude: "",
    };
    dispatch(setDocuments(modifiedData));
  }, []);
  const countryListgetData = async () => {
    const countryList = await getCountry();
    setcountryList(countryList);
  };
  return (
    <div className="w-full">
      <HomeBanner />
      <HomeCountries countryList={countryList} />
      <HomeDelivered />
      <HomeKnowSection />
      <HomeAppSection />
      <HomeHungrySection />
    </div>
  );
};

export default HomePageComponentsWrapper;
