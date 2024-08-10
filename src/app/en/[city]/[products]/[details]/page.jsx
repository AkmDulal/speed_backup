import {
  foodsGet,
  registerGet,
} from "../../../../services/api/query/homepages";
import DetailsPageCom from "./DetailsPageCom";
// import ResturandDeatls from "./ResturandDeatls";
const ProductDeatils = async ({ params }) => {
  console.log(params, "paramparamparamparamparam");
  const lastValue = params?.details?.split("-").pop();
  const restaurantsList = await registerGet(lastValue);
  const foodsList = await foodsGet(lastValue);
  // const registerGetData = async () => {
  //   // const lastValue = params?.details?.split("-").pop();
  //   // console.log(lastValue, "lastValue lastValue lastValue");
  //   const cityList = await registerGet();
  //   return cityList;
  // };
  // const restaurantsList = await registerGetData();
  // console.log(
  //   restaurantsList,
  //   "restaurantsList 999999999999 99999999999999 999999999999999999"
  // );

  return (
    <div className="bg-[#fff]">
      <DetailsPageCom foodsList={foodsList} restaurantsList={restaurantsList} />

      {/* <BodySection foodsList={foodsList} restaurantsList={restaurantsList} /> */}
      {/* <ResturandDeatls />{" "} */}
    </div>
  );
};

export default ProductDeatils;
