"use client";
// import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
function AllRestaurants() {
  const datalist = [
    {
      id: "1",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: "./images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      free_delivery: true,
      orderStatus: true,
      restaurantCode: "Turkinpippuri",
    },
    {
      id: "2",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: "./images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      free_delivery: true,
      orderStatus: true,
    },
    {
      id: "3",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: "./images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      free_delivery: true,
      orderStatus: true,
    },
    {
      id: "4",
      images: "./assets/images/products/Rectangle_72.svg",
      icon: "/images/products/logo_icon.svg",
      title: "Turkinpippuri Seinajoki",
      text: "Maukkaat pizzat ja kebabit",
      delivery_time: "10-15 min",
      price: "1,99€ . €€€€ . ",
      rating: "9.8",
      free_delivery: true,
      orderStatus: true,
    },
  ];

  // const navigate = useNavigate();

  return (
    <div>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 rounded-[30px] lg:pt-[50px] pt-[0px]">
        {/* {datalist?.map((item, i) => (
          <div
            key={i}
            className="lg:col-span-3 cursor-pointer md:col-span-3 col-span-6 flex flex-col items-center justify-center bg-[#fff] rounded-[25px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <ProductCard
              item={item}
            />
          </div>
        ))} */}

        {datalist?.map((item, i) => (
          <div
            key={i}
            className="lg:col-span-3 cursor-pointer md:col-span-3 col-span-6 flex flex-col items-center justify-center bg-[#fff] rounded-[25px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <ProductCard
              item={{
                name: item?.title,
                image: item?.images,
                alt: item?.text,
                deliveryTime: item?.delivery_time,
                rating: item?.rating || 4.5,
                status: item?.status === "Open" ? false : true,
                description: item?.restaurant_description || "test desc",
                price: item?.price,
                icon: item?.icon,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRestaurants;
