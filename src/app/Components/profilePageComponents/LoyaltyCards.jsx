import loyaltyImg from "../../assets/images/loyalty_img.svg";
const LoyaltyCards = () => {
  return (
    <div className="pt-10 pb-20">
      <div className="flex w-full justify-center flex-col items-center">
        <img src={loyaltyImg} alt="" />
        <p className="text-[32px] font-[700] text-[#332922] mt-4">
          You haven’t added any loyalty cards yet
        </p>
        <p className="text-[16px] font-[400] text-[#665C55]">
          Add loyalty cards to collect points with your Sped orders!
        </p>
      </div>
      <div className="w-full flex justify-center mt-[30px] ">
        <button className="h-[56px] w-[446px] bg-brandColor rounded-[12px] text-white text-[20px] font-[600]">
          + Add new loyalty card
        </button>
      </div>
    </div>
  );
};

export default LoyaltyCards;
