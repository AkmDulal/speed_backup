"use client";
import Image from "next/image";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiEmotionHappyLine } from "react-icons/ri";
import LocationIcon from "../../../../../assets/icons/local_activity.svg";
function RestaurantProductCard({ item }) {
  console.log(item, "itemitemitemitemitemitemitemitemitem");
  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="">
          {item?.image &&
            (item?.image.startsWith("http") ? (
              <Image
                width={500}
                height={150}
                className="w-full !object-cover !h-[300px]"
                src={item?.image}
                alt={item?.alt}
              />
            ) : (
              <Image
                width={500}
                height={150}
                className="w-full object-cover !h-[150px]"
                src={"/" + item?.image}
                alt={item?.alt}
              />
            ))}
        </div>

        {item?.percentage ? (
          <div className="absolute top-0 right-0 bg-brandColor text-[#fff] leading-0 lg:px-[15px] px-[10px] rounded-tr-[15px] rounded-bl-[15px]">
            <p className="lg:text-[14px] text-[12px]">
              {" "}
              {item?.percentageNumber}{" "}
            </p>
          </div>
        ) : (
          ""
        )}

        {item?.offer && !item?.status ? (
          <div className="flex bg-brandColor items-center absolute bottom-[10px] right-0 leading-0 lg:bottom-[20px] sm:bottom-[10px] rounded-tl-[30px] rounded-bl-[30px]   px-[15px] font-[400] text-[#fff] text-[16px]">
            <p className="mr-[5px] lg:text-[14px] text-[12px] !lg:leading-3 !leading-[10px] py-[10px]">
              {" "}
              Free Delivery
            </p>
            <Image
              width={20}
              height={20}
              className="w-[20px]"
              src={LocationIcon}
              alt="icon"
            />
          </div>
        ) : (
          ""
        )}
        {item?.discountText && !item?.status ? (
          <div className="flex bg-brandColor items-center absolute bottom-[10px] right-0 leading-0 lg:bottom-[20px] sm:bottom-[10px] rounded-tl-[30px] rounded-bl-[30px]   px-[15px] font-[400] text-[#fff] text-[16px]">
            <p className="mr-[5px] lg:text-[14px] text-[12px] !lg:leading-3 !leading-[10px] py-[10px]">
              {" "}
              {item?.discountText}{" "}
            </p>
            <Image
              width={20}
              height={20}
              className="w-[20px]"
              src={LocationIcon}
              alt="icon"
            />
          </div>
        ) : (
          ""
        )}

        {item?.status ? (
          <>
            <div className="absolute top-0 w-full h-[100%] flex items-center justify-center bg-[#CE54548C] rounded-tl-[20px] rounded-tr-[20px]">
              <h3 className="font-[400] text-[22px] text-[#FF0000]"> Close </h3>
              <p className="text-[16px] absolute bottom-2 right-4">
                {" "}
                Open in 5 hours{" "}
              </p>
            </div>
          </>
        ) : (
          <> </>
        )}
      </div>

      <div className=" w-full bg-[#fff] flex-col">
        <div className="flex p-[15px] justify-between relative ">
          <div className="">
            <h3 className="lg:text-[14px] text-[12px] leading-[14px]  font-[600] text-titleColor">
              {item?.name && item.name.length > 15
                ? item.name.slice(0, 15) + "..."
                : item?.name}
            </h3>

            <p className=" text-[12px] text-[#94857B] font-[400]">
              {/* {item?.text} */}
              {item?.description && item.description.length > 15
                ? item.description.slice(0, 15) + "..."
                : item?.description}
            </p>
          </div>
          <button className="w-[70px] lg:block hidden !h-[45px] bg-[#FFF0E5] text-[14px] !text-brandColor rounded-[10px] leading-[15px] py-[2px] px-[10px] font-[400]">
            {item?.deliveryTime}
          </button>
        </div>

        <div className="flex px-[10px] py-[10px] border-t-2 border-dotted border-[#2222] text-[12px] font-[400] items-center">
          <p className="lg:text-[14px] text-[12px]">
            {" "}
            <MdOutlineDeliveryDining />{" "}
          </p>
          <p className="px-[5px] !text-brandColor  lg:text-[14px] text-[8px]">
            {" "}
            {item?.price}{" "}
          </p>
          <RiEmotionHappyLine className="lg:text-[14px] text-[12px]" />
          {/* <p className="px-[10px]"> {item?.rating} </p> */}
          <p className="px-[5px] lg:text-[14px] text-[8px]">
            {" "}
            {item?.deliveryTime}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantProductCard;
