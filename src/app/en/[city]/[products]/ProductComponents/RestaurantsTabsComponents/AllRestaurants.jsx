import { restaurants } from "../../../../../services/api/query/homepages";
import AllRestaurantsList from "./AllRestaurantsList";
const AllRestaurants = async ({ params }) => {
  const countryCode = params?.city;
  const city = params?.products;

  // const data = localStorage.getItem("resturant_lat") || "";
  // console.log(data, "datadatadatadatadatadatadatadatadatadatadata");
  const obj = {
    countryCode: countryCode,
    city: city,
    lat_lng: "",
  };
  const restaurantsList = await restaurants(obj);
  console.log(restaurantsList, "restaurantsList restaurantsList");

  return (
    <div>
      {/* {loaderOnGetRestaurantsList && <Loader />} */}
      <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 rounded-[30px] lg:pt-[50px] pt-[10px]">
        <div className="lg:col-span-12 md:col-span-12 col-span-12 flex items-center justify-between lg:mb-[15px] mb-[0px]">
          <h3 className="text-titleColor  lg:text-[35px] text-[20px] font-[700] tracking-tight">
            All restaurants
          </h3>
        </div>
        <AllRestaurantsList restaurantsList={restaurantsList} obj={obj} />
      </div>
    </div>
  );
};

export default AllRestaurants;

// export default AllRestaurants222
