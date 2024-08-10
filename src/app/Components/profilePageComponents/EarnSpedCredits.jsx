import { PiUploadSimple } from "react-icons/pi";
import JarImg from "../../assets/images/Jar.svg";
const EarnSpedCredits = () => {
  return (
    <div className="w-full justify-center flex flex-col items-center pb-40">
      <div>
        <img src={JarImg} alt="" />
        <p className="text-[32px] text-[#332922] font-[700] leading-[32px] mt-[12px]">
          Invite friends and get discounts
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center">
          <p className="w-[52px] h-[52px] rounded-full bg-[#FFE0CC] text-[#FF6600] text-[22px] font-[700] flex justify-center items-center mx-3">
            1
          </p>
          <p className="text-[16px] leading-[24px] font-[400] text-[#665C55] w-[512px]">
            Your friends will get €4.00 in Sped credits when they use your code
            for each of their first 3 delivery orders.
          </p>
        </div>
        <div className="flex items-center mt-3">
          <p className="w-[52px] h-[52px] rounded-full bg-[#FFE0CC] text-[#FF6600] text-[22px] font-[700] flex justify-center items-center mx-3">
            2
          </p>
          <p className="text-[16px] leading-[24px] font-[400] text-[#665C55] w-[512px]">
            You’ll get €4.00 in Sped credits for each of your friend’s first 3
            delivery orders. You can earn a maximum of €120.00 in credits by
            inviting your friends to join Sped.
          </p>
        </div>
      </div>

      <p className="text-[18px] text-[#FF6600] font-[600] mb-6 mt-8">
        How do referral codes work?
      </p>

      <div className="w-[554px] h-[94px] bg-[#FFFFFF] flex justify-between items-center rounded-[12px] px-4">
        <div>
          <p className="text-[16px] leading-[16px] text-[#94857B] font-[400]">
            Your referral code
          </p>
          <p className="text-[22px] leading-[22px] text-[#332922] font-[400] mt-2">
            SPED524XSE
          </p>
        </div>
        <div className="w-[52px] h-[52px] rounded-full bg-[#FFE0CC] flex justify-center items-center">
          <PiUploadSimple className="text-[#FF6600]" />
        </div>
      </div>
    </div>
  );
};

export default EarnSpedCredits;
