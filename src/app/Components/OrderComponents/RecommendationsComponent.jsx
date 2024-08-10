"use client";

function RecommendationsComponent({ item }) {
  return (
    <div className="  flex flex-col items-center border-[1px] p-3 border-[#FFE0CC] rounded-[12px]">
      <div className="w-full ">
        <div className=" w-full ">
          <img src={item.images} alt="" className="w-full" />
          <div className=" my-4 w-full !mb-[0px] ">
            <p className="text-[18px] font-[600] leading-[18px] text-[#FF6600]">
              {item.price}€
            </p>
            <p className="text-[16px]  font-[400] leading-[16px] mt-3 ">
              {item.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecommendationsComponent;
