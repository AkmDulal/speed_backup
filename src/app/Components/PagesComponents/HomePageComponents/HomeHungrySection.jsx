import "./style.css";
const HomeHungrySection = () => {
  const datalist = [
    {
      id: "1",
      images: "./assets/images/1.webp",
      title: "Get paid as a courier partner",
    },
    {
      id: "2",
      images: "./assets/images/2.webp",
      title: "Serve more people as a restaurant partner",
    },
    {
      id: "3",
      images: "./assets/images/3.webp",
      title: "Enter a new chapter and find a job at Sped",
    },
  ];
  return (
    <div className="md:py-20 py-10 bg-[#faf7f5] w-full ">
      <div className="w-full container mx-auto lg:px-[0px]">
        <div className=" w-full flex justify-center md:pb-14 pb-7">
          <p className="w-full md:w-[687px] text-center font-[700] md:text-[48px] text-[22px] leading-[42px] md:leading-[57.6px]">
            Hungry for more than food?
          </p>
        </div>
        <div className=" justify-center mx-auto  w-full">
          <div className="flex w-full flex-col md:flex-row">
            {datalist?.map((item, i) => (
              <div
                key={i}
                className="bg-white  md:w-1/3 mx-3 rounded-[15px] shadow_css mt-4 md:mt-0"
              >
                <div className="flex flex-col items-center ">
                  <img className="w-full" src={item?.images} alt="image" />
                  <div className="lg:px-[25px] px-[25px] md:px-[10px] pb-8">
                    <p className=" text-center lg:h-[60px] md:h-[100px] h-[60px] font-[600] text-[16px] lg:text-[22px] leading-[26.4px] py-3 ">
                      {" "}
                      {item?.title}{" "}
                    </p>
                    <p className="underline text-center font-[400] text-[18px] leading-[21.4px] mt-6 text-brandColor">
                      Apply now
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHungrySection;
