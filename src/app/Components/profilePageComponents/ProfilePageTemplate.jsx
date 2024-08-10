// "use client";
// import { useState } from "react";
// import { LuMessagesSquare } from "react-icons/lu";
// import Address from "./Address";
// import EarnSpedCredits from "./EarnSpedCredits";
// import LoyaltyCards from "./LoyaltyCards";
// import OrderHistory from "./OrderHistory";
// import PaymentMethods from "./PaymentMethods";
// import PersonalInfo from "./PersonalInfo";
// import RedeemCode from "./RedeemCode";
// import Settings from "./Settings";

// const ProfilePageTemplate = () => {
//   const [activeTab, setActiveTab] = useState("tab1");

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };
//   return (
//     <div className="lg:container mx-auto  w-full  pt-6">
//       <div className="w-full flex justify-between  pt-4">
//         <p className="text-[50px] font-[700] leading-[50px] ">Profile</p>
//         <button className=" flex justify-around items-center px-[25px] py-[12px] bg-[#FFE0CC] rounded-[8px]">
//           <LuMessagesSquare className="w-[25px] fill-brandColor mx-2" />
//           <p className="text-[18px] font-[600] leading-[18px] text-brandColor">
//             Get help
//           </p>
//         </button>
//       </div>

//       <div className="w-full grid grid-cols-8 h-[12px] mt-8 mb-2 ">
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab1" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab1")}
//           >
//             Personal info
//           </p>
//         </div>

//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab2" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab2")}
//           >
//             Payment methods
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab3" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab3")}
//           >
//             Address
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab4" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab4")}
//           >
//             Loyalty cards
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab5" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab5")}
//           >
//             Order history
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab6" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab6")}
//           >
//             Earn Sped credits
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab7" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab7")}
//           >
//             Redeem code
//           </p>
//         </div>
//         <div className="col-span-1 flex justify-center">
//           <p
//             className={`text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
//               activeTab === "tab8" ? " text-brandColor" : "text-[#000000]"
//             }`}
//             onClick={() => handleTabClick("tab8")}
//           >
//             Settings
//           </p>
//         </div>
//       </div>
//       <div className="w-full grid grid-cols-8 h-[4px] rounded-sm  bg-[#F3EBE5]">
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab1" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab2" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab3" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab4" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab5" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab6" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab7" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//         <div
//           className={`col-span-1 rounded-md ${
//             activeTab === "tab8" ? " bg-brandColor" : "bg-[#F3EBE5]"
//           }`}
//         ></div>
//       </div>
//       <div>
//         {activeTab === "tab1" && (
//           <div>
//             <PersonalInfo />
//           </div>
//         )}

//         {activeTab === "tab2" && (
//           <div>
//             <PaymentMethods />
//           </div>
//         )}
//         {activeTab === "tab3" && (
//           <div>
//             <Address />
//           </div>
//         )}
//         {activeTab === "tab4" && (
//           <div>
//             <LoyaltyCards />
//           </div>
//         )}
//         {activeTab === "tab5" && (
//           <div>
//             <OrderHistory />
//           </div>
//         )}
//         {activeTab === "tab6" && (
//           <div>
//             <EarnSpedCredits />
//           </div>
//         )}
//         {activeTab === "tab7" && (
//           <div>
//             <RedeemCode />
//           </div>
//         )}
//         {activeTab === "tab8" && (
//           <div>
//             <Settings />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePageTemplate;

"use client";
import { useState } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import Address from "./Address";
import EarnSpedCredits from "./EarnSpedCredits";
import LoyaltyCards from "./LoyaltyCards";
import OrderHistory from "./OrderHistory";
import PaymentMethods from "./PaymentMethods";
import PersonalInfo from "./PersonalInfo";
import RedeemCode from "./RedeemCode";
import Settings from "./Settings";

const ProfilePageTemplate = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="lg:container mx-auto w-full pt-6 px-4 lg:px-0">
      <div className="w-full flex justify-between pt-4">
        <p className="text-3xl lg:text-[50px] font-[700] leading-[50px]">
          Profile
        </p>
        <button className="flex justify-around items-center px-6 py-3 bg-[#FFE0CC] rounded-lg">
          <LuMessagesSquare className="w-6 h-6 lg:w-[25px] lg:h-[25px] fill-brandColor mx-2" />
          <p className="text-lg lg:text-[18px] font-[600] leading-[18px] text-brandColor">
            Get help
          </p>
        </button>
      </div>

      <div className="w-full grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 h-12 mt-8 mb-2">
        {[
          { label: "Personal info", tab: "tab1" },
          { label: "Payment methods", tab: "tab2" },
          { label: "Loyalty cards", tab: "tab4" },
          { label: "Order history", tab: "tab5" },
          { label: "Address", tab: "tab3" },
          { label: "Earn Sped credits", tab: "tab6" },
          { label: "Redeem code", tab: "tab7" },
          { label: "Settings", tab: "tab8" },
        ].map(({ label, tab }) => (
          <div key={tab} className="flex justify-center">
            <p
              className={`text-[12px] lg"text-[14px] font-[600] leading-[14px] flex justify-center items-center cursor-pointer ${
                activeTab === tab ? "text-brandColor" : "text-[#000000]"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full lg:grid grid-cols-8 h-1 rounded-sm bg-[#F3EBE5] lg:block hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`col-span-1 rounded-md ${
              activeTab === `tab${index + 1}` ? "bg-brandColor" : "bg-[#F3EBE5]"
            }`}
          ></div>
        ))}
      </div>

      <div>
        {activeTab === "tab1" && <PersonalInfo />}
        {activeTab === "tab2" && <PaymentMethods />}
        {activeTab === "tab3" && <Address />}
        {activeTab === "tab4" && <LoyaltyCards />}
        {activeTab === "tab5" && <OrderHistory />}
        {activeTab === "tab6" && <EarnSpedCredits />}
        {activeTab === "tab7" && <RedeemCode />}
        {activeTab === "tab8" && <Settings />}
      </div>
    </div>
  );
};

export default ProfilePageTemplate;
