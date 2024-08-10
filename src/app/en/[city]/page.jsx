import HomePageCityComponentsWrapper from "../../Components/PagesComponents/HomePageComponents/HomePageCityComponentsWrapper";
import { getCity } from "../../services/api/query/homepages";

const Page = async ({ params }) => {
  const cityListgetData = async (param) => {
    const cityList = await getCity(param);
    return cityList;
  };
  const cityList = await cityListgetData(params.city);
  return (
    <div>
      <HomePageCityComponentsWrapper cityList={cityList} />
    </div>
  );
};

export default Page;
