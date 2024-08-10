import { getCategories } from "../../../../../services/api/query/homepages";
import AllRestaurants from "./AllRestaurants";
import BrowseCategoriesPages from "./BrowseCategoriesPages";
// import PagesSeo from "./PagesSeo";

const RestaurantTabComponentsWrapper = async ({ params }) => {
  console.log(params, "paramsparams params");
  const categoriesData = async (param) => {
    const cityList = await getCategories(param);
    return cityList;
  };
  const categoriesDataList = await categoriesData(
    `${params?.city}/${params?.products}`
  );

  return (
    <div>
      {/* <PagesSeo /> */}
      <BrowseCategoriesPages categoriesDataList={categoriesDataList} />
      <AllRestaurants params={params} />
    </div>
  );
};
export default RestaurantTabComponentsWrapper;
