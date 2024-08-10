"use client";
import "./style.css";
const HomeAppSection = () => {
  return (
    <div className="w-full pb-10 md:pb-0 bg-[#fff]">
      <div className="flex  w-full">
        <div className="flex flex-col-reverse md:flex-row justify-between w-full ">
          <div className=" flex flex-col items-center justify-center  w-full md:w-1/2 container mx-auto">
            <div className="flex flex-col  justify-center items-center md:items-start w-full lg:w-4/5 lg:pl-[110px] mt-8 md:mt-0">
              <p className="lg:text-[48px] text-[36px] leading-[37px] font-[700] lg:leading-[57px]">
                Honey, we’re not
                <br />
                cooking tonight
              </p>
              <p className="lg:mt-10 mt-5  text-center md:text-left lg:w-[496px] text-[14px] md:text-[16px] font-[400] leading-[24.6px] text-[#80736A]">
                Get the Apple-awarded Sped app and choose from 40,000
                restaurants and hundreds of stores in 20+ countries. Discover
                and get what you want – our courier partners bring it to you.
              </p>
              <img
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/fi/app/sped-delivery-food-and-more/id6448701507"
                  );
                }}
                className="cursor-pointer mt-10 md:mt-4 lg-mt-10 md:hidden lg:flex w-[150px]"
                src={"./assets/images/AppStore.png"}
                alt="App Store"
              />
              <img
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.Sped.Delivery&pcampaignid=web_share"
                  );
                }}
                className="cursor-pointer mt-10 md:mt-4 lg-mt-10 md:hidden lg:flex w-[150px]"
                src={"/" + "../../assets/images/AppStore.png"}
                alt="Google Play Store"
              />
            </div>
          </div>
          <div className=" flex justify-end w-full md:w-1/2">
            <img
              src="./assets/images/mobile.png"
              alt=""
              className="md:h-full  lg:h-[750px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeAppSection;
