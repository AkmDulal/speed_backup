// "use client";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { PiLighthouse } from "react-icons/pi";
// import RestaurantTabComponentsWrapper from "./ProductComponents/RestaurantsTabsComponents/RestaurantTabComponentsWrapper";
// import StoreTabComponentsWrapper from "./ProductComponents/StoreTabComponents/StoreTabComponentsWrapper";
// import DiscoveryTabComponentsWrapper from "./ProductComponents/discoveryTabComponents/DiscoveryTabComponentsWrapper";

// const ProductsTabComponentsWrapper = () => {
//   const params = useParams();

//   const [showUserAddressModal, setShowUserAddressModal] = useState(false);
//   const [buttonStatus, setButtonStatus] = useState("discovery");

//   const handleTabClick = (tab) => {
//     setButtonStatus(tab);
//   };

//   return (
//     <div className="overflow-hidden">
//       <div className="px-4 py-8 bg-[#faf7f5]">
//         <div className="container m-auto !px-0">
//           <div className="hidden lg:block w-[40%] m-auto">
//             <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 bg-[#fff] rounded-[30px]">
//               <div className="lg:col-span-4 md:col-span-4 col-span-4 flex items-center justify-center">
//                 <button
//                   className={`focus:outline-none h-[40px] w-full text-[16px] font-[400] py-2 px-2 flex justify-center items-center ${
//                     buttonStatus === "discovery"
//                       ? "bg-brandColor text-[#fff] rounded-[30px] py-[10px] font-semibold"
//                       : "text-[#D9C5B8]"
//                   }`}
//                   onClick={() => handleTabClick("discovery")}
//                 >
//                   <PiLighthouse className="mr-[5px] text-[18px]" />
//                   Discovery
//                 </button>
//               </div>

//               <div className="lg:col-span-4 md:col-span-4 col-span-4 flex items-center justify-center">
//                 <button
//                   className={`focus:outline-none w-full h-[40px] text-[16px] font-[400] py-2 px-2 flex justify-center items-center ${
//                     buttonStatus === "restaurants"
//                       ? "bg-brandColor text-[#fff] rounded-[30px] py-[10px] font-semibold"
//                       : "text-[#D9C5B8]"
//                   }`}
//                   onClick={() => handleTabClick("restaurants")}
//                 >
//                   Restaurants
//                 </button>
//               </div>

//               <div className="lg:col-span-4 md:col-span-4 col-span-4 flex items-center justify-center">
//                 <button
//                   className={`focus:outline-none h-[40px] w-full text-[16px] font-[400] py-2 px-2 flex justify-center items-center ${
//                     buttonStatus === "stores"
//                       ? "bg-brandColor text-[#fff]  rounded-[30px] py-[10px] font-semibold"
//                       : "text-[#D9C5B8]"
//                   }`}
//                   onClick={() => handleTabClick("stores")}
//                 >
//                   Stores
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between z-50">
//             <div
//               className={`text-center w-full text-[14px] font-[400] flex-col py-2 px-4 flex justify-center items-center hover:text-brandColor cursor-pointer ${
//                 buttonStatus === "discovery"
//                   ? "text-brandColor font-semibold"
//                   : "text-titleColor"
//               }`}
//               onClick={() => handleTabClick("discovery")}
//             >
//               <PiLighthouse className="text-[18px]" />
//               <p className="!leading-[15px] text-[13px]">Discovery</p>
//             </div>
//             <div
//               className={`text-center w-full text-[14px] font-[400] py-2 px-4 flex flex-col justify-center items-center hover:text-brandColor cursor-pointer ${
//                 buttonStatus === "restaurants"
//                   ? "text-brandColor font-semibold"
//                   : "text-titleColor"
//               }`}
//               onClick={() => handleTabClick("restaurants")}
//             >
//               <p className="!leading-[15px]  text-[13px]"> Restaurants </p>
//             </div>
//             <div
//               className={`text-center w-full text-[14px] font-[400] py-2 px-4 flex flex-col justify-center items-center hover:text-brandColor cursor-pointer ${
//                 buttonStatus === "stores"
//                   ? "text-brandColor font-semibold"
//                   : "text-titleColor"
//               }`}
//               onClick={() => handleTabClick("stores")}
//             >
//               <p className="!leading-[15px]  text-[13px]"> Stores </p>
//             </div>
//           </div>

//           <div className="mt-0 lg:mt-8">
//             {buttonStatus === "discovery" && (
//               <div>
//                 {" "}
//                 <DiscoveryTabComponentsWrapper />{" "}
//               </div>
//             )}
//             {buttonStatus === "restaurants" && (
//               <div>
//                 {" "}
//                 <RestaurantTabComponentsWrapper />{" "}
//               </div>
//             )}
//             {buttonStatus === "stores" && (
//               <div>
//                 {" "}
//                 <StoreTabComponentsWrapper />{" "}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsTabComponentsWrapper;

import RestaurantTabComponentsWrapper from "./ProductComponents/RestaurantsTabsComponents/RestaurantTabComponentsWrapper";
import StoreTabComponentsWrapper from "./ProductComponents/StoreTabComponents/StoreTabComponentsWrapper";
import DiscoveryTabComponentsWrapper from "./ProductComponents/discoveryTabComponents/DiscoveryTabComponentsWrapper";
function ProductsTabComponentsWrapper({ buttonStatus }) {
  return (
    <div>
      {" "}
      <div className="mt-0 lg:mt-8">
        {buttonStatus === "discovery" && <DiscoveryTabComponentsWrapper />}
        {buttonStatus === "restaurants" && <RestaurantTabComponentsWrapper />}
        {buttonStatus === "stores" && <StoreTabComponentsWrapper />}
      </div>
    </div>
  );
}

export default ProductsTabComponentsWrapper;
