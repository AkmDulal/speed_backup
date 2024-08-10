"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFoodListStore } from "../../../../services/redux/slice/globalDataSlice";
import ProductCard from "./ProductCard";
import UseInView from "./UseInView";
// restaurantCode

const BodySection = ({ restaurantName, restaurantsList, foodsList }) => {
  const dispatch = useDispatch();
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    dispatch(setFoodListStore(foodsList));
  }, [selectedMenuId, dispatch, foodsList]);

  const handleMenuClick = (menuId) => {
    setSelectedMenuId(menuId);
    const element = document.getElementById(menuId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuIds = restaurantsList?.menus?.map((item) => item.subcategory_id);
  const activeSectionId = UseInView(menuIds);
  console.log(foodsList, "foodsList foodsList foodsList");
  console.log(restaurantsList, "99999999999999999");
  console.log(
    activeSectionId,
    "activeSectionId activeSectionId activeSectionId"
  );
  console.log(
    activeSectionId,
    "activeSectionId activeSectionId activeSectionId"
  );
  return (
    <div className="container mx-auto ">
      {/* {laoderOnGetCategoryList && <Loader />} */}
      <div className="lg:flex flex flex-wrap lg:flex-none lg:!sticky lg:top-[72px] z-50 py-[10px] bg-[#fff] ">
        {restaurantsList?.menus?.map((item, i) => (
          <div key={i} className="">
            <div
              className={`flex items-center justify-center cursor-pointer ${
                item.subcategory_id === Number(activeSectionId)
                  ? "bg-[#FFE0CC]"
                  : ""
              }`}
              onClick={() => handleMenuClick(item.subcategory_id)}
            >
              <p
                className={`text-[14px] px-[15px] text-[#94857B] font-[500]  hover:text-brandColor py-[10px] mr-[10px] ${
                  item.subcategory_id === Number(activeSectionId)
                    ? "bg-[#FFE0CC]"
                    : ""
                }`}
              >
                {item?.subcategory_name}
                {/* {item.subcategory_id} -
                {activeSectionId} */}
              </p>
            </div>
          </div>
        ))}
      </div>

      {foodsList?.map((item, i) => (
        <div
          id={item?.subcategory_id}
          key={i}
          className=""
          ref={selectedMenuId === item.subcategory_id ? scrollRef : null}
        >
          <div className="my-6">
            <p className="text-[22px] leading-[22px] font-[700]">
              {item?.subcategory_name}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-4 lg:gap-x-6 lg:gap-y-6 2xl:gap-5">
            {item?.foods?.map((foodsitem, index) => (
              <div
                key={index}
                className=" "
                id={`restaurant-item-${foodsitem.food_id}`}
                onScroll={() => handleRestaurantItemScroll(foodsitem.food_id)}
              >
                <ProductCard
                  item={{
                    id: foodsitem?.food_id,
                    name: foodsitem?.food_name,
                    price: `€ ${foodsitem?.food_price}`,
                    images: foodsitem?.food_image,
                    title: foodsitem?.food_description,
                  }}
                  restaurantName={restaurantName}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default BodySection;
