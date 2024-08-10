const HomeDelivered = () => {
  return (
    <div className="bg-[#faf7f5] md:py-[60px] flex justify-center py-[40px] ">
      <div className="container mx-auto w-full lg:w-[1185px] flex flex-col md:flex-row gap-0 justify-between rounded-[15px] shadow-lg bg-white !px-[0px]">
        <div className="lg:col-span-6 lg:flex  hidden">
          <div className="lg:pl-16 md:py-16 p-4">
            <p className="font-[600] text-[24px] lg:mb-14 mb-7 leading-6 font-defaultfont ">
              What is Sped?
            </p>
            <p className="font-[700] md:text-[48px] text-[38px] lg:mb-14 mb-7 leading-6 font-defaultfont ">
              Delivered.
            </p>
            <p className="md:w-[356px] w-full  font-[400] text-[20px]  leading-[30.6px] text-[#80736A] ">
              Sped makes it incredibly easy for you to discover and get what you
              want. Delivered to you – quickly, reliably and affordably.
            </p>
            <div className="flex items-center lg:mt-14 mt-7">
              <div className="lg:w-[64px] lg:h-[64px] md:w-[60px] md:h-[50px] w-[40px] h-[40px] rounded-full bg-brandColor flex justify-center items-center hover:cursor-pointer">
                <img src="./assets/icons/play_arrow.svg" alt="sped-icon" />
              </div>
              <p className="md:w-[356px]  font-[400] text-[18px] px-6 leading-[18px] text-brandColor">
                Watch video
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 md:w-full relative h-full ">
          <img
            className="w-full h-full md:p-0 "
            src="./assets/images/delivered_img.png"
            alt="sped-delivered"
          />
          <div className="lg:pl-16 md:py-16 px-16 py-10 lg:hidden absolute top-0 flex flex-col justify-between h-full bg-[#000000] w-full bg-opacity-30">
            <div>
              <p className="font-[600] text-[24px] lg:mb-14 mb-7 leading-6 font-defaultfont text-white lg:text-[#000000]">
                What is Sped?
              </p>
              <p className="font-[700] md:text-[48px] text-[38px] lg:mb-14 mb-7 leading-6 font-defaultfont text-white lg:text-[#000000]">
                Delivered.
              </p>
            </div>

            <div className="flex items-center lg:mt-14 mt-7 ">
              <div className="lg:w-[64px] lg:h-[64px] md:w-[60px] md:h-[60px] w-[40px] h-[40px] rounded-full bg-brandColor flex justify-center items-center hover:cursor-pointer">
                <img src="./assets/icons/play_arrow.svg" alt="sped-icon" />
              </div>
              <p className="md:w-[356px]  font-[400] text-[18px] px-3 leading-[18px] text-white">
                Watch video
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeDelivered;
