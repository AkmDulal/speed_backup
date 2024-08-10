// import { foodsGet, registerGet } from "@/services/api/query/homepages";
import BodySection from "./BodySection";
import HeaderSection from "./HeaderSection";
// import ResturandDeatls from "./ResturandDeatls";
const DetailsPageCom = ({ foodsList, restaurantsList }) => {
  return (
    <div className="bg-[#fff]">
      <HeaderSection
        headerdata={{
          restaurant_cover_alt_txt:
            restaurantsList?.restaurant.restaurant_alt_txt,
          restaurant_cover_image:
            restaurantsList?.restaurant.restaurant_cover_image,
          restaurant_image: restaurantsList?.restaurant.restaurant_image,
          restaurant_name: restaurantsList?.restaurant.restaurant_name,
          restaurant_short_description:
            restaurantsList?.restaurant.restaurant_short_description,
          restaurant_slug: restaurantsList?.restaurant.restaurant_slug,
          restaurant_status: restaurantsList?.restaurant.restaurant_status,
          restaurant_offer: restaurantsList?.restaurant.restaurant_offer,
          restaurant_delivery_time:
            restaurantsList?.restaurant.restaurant_delivery_time,
          restaurant_minimum_order:
            restaurantsList?.restaurant.restaurant_minimum_order,
          restaurant_latitute: restaurantsList?.restaurant.restaurant_latitute,
          restaurant_longitude:
            restaurantsList?.restaurant.restaurant_longitude,
        }}
        restaurantsList={restaurantsList}
      />
      <BodySection foodsList={foodsList} restaurantsList={restaurantsList} />
      {/* <ResturandDeatls />{" "} */}
    </div>
  );
};

export default DetailsPageCom;
