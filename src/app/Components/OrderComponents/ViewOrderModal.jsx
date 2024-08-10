"use client";
import CheckoutSelectItems from "../CheckoutPageComponents/CheckoutSelectItems";

const ViewOrderModal = ({ cartdata, setShowModal }) => {
  console.log(cartdata, "cartdata cartdata cartdata");
  return (
    // <div className="w-[668px] h-[600px]">
    <div>
      <div className=" mt-8">
        <CheckoutSelectItems datalist={cartdata} setShowModal={setShowModal} />
      </div>
      {/* <div className="w-full border-[1px] border-[#ECE0D8] opacity-50 my-3"></div> */}

      {/* <div className=" ">
        <ModalSliderComponents perView={2.5} spaceBetween={30} navigation={true}>
          {datalist?.map((item, i) => (
            <SwiperSlide className="w-full" key={i}>
              <RecommendationsComponent item={item} />
            </SwiperSlide>
          ))}
        </ModalSliderComponents>
      </div> */}
    </div>
  );
};

export default ViewOrderModal;
