import { getCountry } from "../../../services/api/query/homepages";
import HomeAppSection from "./HomeAppSection";
import HomeBanner from "./HomeBanner";
import HomeCity from "./HomeCity";
import HomeDelivered from "./HomeDelivered";
import HomeHungrySection from "./HomeHungrySection";
import HomeKnowSection from "./HomeKnowSection";

const countryListgetData = async () => {
  const countryList = await getCountry();
  return countryList;
};

const HomePageCityComponentsWrapper = async ({ cityList }) => {
  const countryList = await countryListgetData();

  return (
    <div className="w-full">
      <HomeBanner />
      <HomeCity countryList={countryList} cityList={cityList} />
      <HomeDelivered />
      <HomeKnowSection />
      <HomeAppSection />
      <HomeHungrySection />
    </div>
  );
};

export default HomePageCityComponentsWrapper;
