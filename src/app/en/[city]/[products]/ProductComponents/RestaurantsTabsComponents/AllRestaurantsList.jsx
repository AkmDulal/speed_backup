"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { restaurants } from "../../../../../services/api/query/homepages";

import RestaurantProductCard from "./RestaurantProductCard";

const AllRestaurantsList = ({ restaurantsList, obj }) => {
  const [listResturant, setListResturant] = useState(restaurantsList);
  const token = localStorage.getItem("token");
  const selectedAddress = useSelector(
    (state) => state?.reducer?.addressSlice?.documents
  );
  const countryCitySlice = useSelector(
    (state) => state?.reducer?.countryCitySlice || []
  );

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

  const categoriesData = async () => {
    const payload = {
      countryCode: obj?.countryCode,
      city: obj?.city,
      lat_lng: `${streetLat ? streetLat : lat} ${streetlng ? streetlng : lng}`,
      // lat_lng: `${lat}${lng}`,
    };
    const cityList = await restaurants(payload);
    setListResturant(cityList);
  };

  useEffect(() => {
    categoriesData();
  }, []);

  return (
    <>
      {listResturant?.length ? (
        listResturant?.map((item, i) => (
          <div
            key={i}
            className="lg:col-span-4 cursor-pointer md:col-span-3 col-span-12 bg-[#fff] rounded-[25px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Link
              href={`/en/${obj?.countryCode}/${obj?.city}/${item?.restaurant_slug}-${item?.restaurant_id}`}
              className="w-full"
              // to={`/en/${countryCode}/${city}/${item?.restaurant_slug}?${item?.restaurant_id}`}
            >
              <RestaurantProductCard
                item={{
                  name: item?.restaurant_name,
                  image: item?.restaurant_image,
                  alt: item?.restaurant_alt_txt,
                  deliveryTime: item?.restaurant_delivery_time,
                  rating: item?.restaurant_rating || 9.5,
                  status: item?.restaurant_status === "Open" ? false : true,
                  offer:
                    item?.restaurant_offer === "Free Delivery" ? true : false,
                  description: item?.restaurant_short_description,
                  price: "€0.00. €€€€",
                }}
              />
              {/* <br></br>
              <br></br>
              <br></br>
              <br></br>
              <ProductCard
                item={{
                  name: item?.restaurant_name,
                  image: item?.restaurant_image,
                  alt: item?.restaurant_alt_txt,
                  deliveryTime: item?.restaurant_delivery_time,
                  rating: item?.restaurant_rating || 9.5,
                  status: item?.restaurant_status === "Open" ? false : true,
                  offer:
                    item?.restaurant_offer === "Free Delivery" ? true : false,
                  description: item?.restaurant_short_description,
                  price: "€0.00. €€€€",
                }}
              /> */}
            </Link>
          </div>
        ))
      ) : (
        <h1 className="lg:col-span-12 text-center">No restaurants found</h1>
      )}
    </>
  );
};

export default AllRestaurantsList;
