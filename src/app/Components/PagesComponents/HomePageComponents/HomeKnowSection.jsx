import "./style.css";
const HomeKnowSection = () => {
  return (
    <div className="bg-gradient w-full md:py-16 py-8">
      {/* container w-[1185px] flex gap-0 justify-between rounded-[15px] shadow-lg bg-white !px-[0px] */}
      <div className=" container flex gap-0  mx-auto  justify-center w-full">
        <div className="grid gap-9 md:grid-cols-12">
          <div className="lg:col-span-6 md:col-span-6  flex justify-center ">
            <img
              className="w-[300px] md:w-full "
              src="./assets/images/man_with_logo.png"
              alt=""
            />
          </div>
          <div className="lg:col-span-6 md:col-span-6 flex justify-center items-center ">
            <p className="lg:mt-12 w-full lg:w-[474px] lg:text-[22px] text-[14px] font-[400] leading-[24.6px]  md:leading-[39.6px] text-center md:text-left  text-[#060606]  lg:text-[#80736A]  ">
              <span className="w-full  text-[25.5px] md:text-[48px] text-[#332922] font-[700]  md:!text-left flex justify-center md:justify-start mb-[30px] ">
                Did you know?
              </span>
              Getting home-delivered sushi is more than your life made easy.
              When you order with Sped, you help thousands of hard-working
              restaurant and store owners and couriers make a living.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeKnowSection;
