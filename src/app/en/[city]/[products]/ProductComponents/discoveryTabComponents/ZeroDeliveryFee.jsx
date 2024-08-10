"use client";
import ProductCard from "../../../../Components/Card/ProductCard.jsx";
function ZeroDeliveryFee() {
  const datalist = [
    {
      id: "1",
      images: "/images/products/Rectangle_72.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "2",
      images: "/images/products/Rectangle_74.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "3",
      images: "/images/products/Rectangle_76.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: false,
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "4",
      images: "/images/products/Rectangle_78.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "5",
      images: "/images/products/Rectangle_72.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
    {
      id: "6",
      images: "/images/products/Rectangle_74.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      status: "Open",
      restaurant_offer: "Free Delivery",
      description: "test desc",
    },
  ];
  return (
    <div>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 rounded-[30px] pt-[50px]">
        <div className="lg:col-span-12 md:col-span-12 col-span-12 flex items-center justify-between lg:mb-[15px] mb-[0px]">
          <h3 className="text-titleColor lg:text-[35px] text-[20px] font-[700] tracking-tight">
            Zero € delivery fee
          </h3>
          <button className="bg-[#FFE0CC] text-brandColor flex items-center justify-center text-[16px] font-[400] py-[5px] px-[30px] rounded-[5px]">
            See all
          </button>
        </div>
        {datalist?.map((item, i) => (
          <div
            key={i}
            className="lg:col-span-3 cursor-pointer md:col-span-4 col-span-12 flex flex-col items-center justify-center bg-[#fff] rounded-[25px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <ProductCard
              item={{
                name: item?.title,
                image: item?.images,
                alt: item?.text,
                deliveryTime: item?.delivery_time,
                rating: item?.rating || 4.5,
                status: item?.status === "Open" ? false : true,
                offer:
                  item?.restaurant_offer === "Free Delivery" ? true : false,
                description: item?.restaurant_description || "test desc",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZeroDeliveryFee;
