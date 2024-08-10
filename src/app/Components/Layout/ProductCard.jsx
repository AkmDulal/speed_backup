"use client";
/* eslint-disable react/prop-types */
"use client";
// // eslint-disable-next-line react/prop-types
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { foodsGet } from "../../services/api/query/homepages.js";
const ProductCard = ({ item, restaurantName, handleAddItem, singledata }) => {
  const searchParams = useParams();
  const lastValue = searchParams?.details?.split("-").pop();
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch();
  const [foodsList, setFoodsList] = useState([]);

  const cardModalOpen = async () => {
    // getFoodsList(`/foods/${param}/${item?.id}`);
    const param = `${lastValue}/${item?.id}`;
    const foodsListData = await foodsGet(param);
    setFoodsList(foodsListData);
    setShowModal(true);
    // handleAddItem();
    // addItem(foodsList?.data)
  };

  return (
    <div className="items-stretch">
      <div className="w-full h-[230px] bg-white flex flex-col-reverse lg:flex-row justify-between rounded-[12px] relative p-5 cursor-pointer border border-[#2222]">
        <div onClick={() => cardModalOpen()}>
          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 min:h-[130px]">
            <div className="col-span-2">
              <div className="flex flex-col justify-around ">
                <div>
                  <div className="">
                    <img
                      className="w-[150px] h-[80px] "
                      src={item.image}
                      alt=""
                    />
                    <span className="text-[16px] lg:text-[18px] leading-[18px] font-[600]">
                      {item.id}.
                    </span>
                    <p className="text-[16px] lg:text-[16px]  leading-[18px] font-[600] mb-2">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-[12px] leading-[20px] font-[400] text-[#94857B]">
                    {" "}
                    {item.title}
                  </p>
                </div>
                <div className="mt-[20px]">
                  <p className="text-[18px] leading-[18px] font-[600] text-brandColor">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="" onClick={() => handleAddItem(singledata)}>
              <div className=" ">
                <div className="w-[48px] h-[48px] bg-[#FFE0CC] absolute right-0 top-0 lg:top-none rounded-tr-[12px] rounded-bl-[12px] flex justify-center items-center">
                  <FaPlus className="fill-brandColor h-[20px] w-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
