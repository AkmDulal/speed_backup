"use client";
import { useState } from "react";

const ChackoutTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="overflow-hidden">
      <div className="px-4 py-8 bg-[#faf7f5]">
        <div className="container m-auto !px-0">
          <div className="hidden lg:block w-[40%] m-auto">
            <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-4 bg-[#fff] rounded-[30px]">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`lg:col-span-6 md:col-span-6 col-span-6 flex items-center justify-center`}
                >
                  <button
                    className={`focus:outline-none h-[40px] w-full text-[16px] font-[400] py-2 px-2 flex justify-center items-center ${
                      activeTab === tab.id
                        ? "bg-brandColor text-[#fff] rounded-[30px] py-[10px] font-semibold"
                        : "text-[#D9C5B8]"
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.icon && <tab.icon className="mr-[5px] text-[18px]" />}
                    {tab.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between z-50">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`text-center w-full text-[14px] font-[400] flex-col py-2 px-4 flex justify-center items-center hover:text-brandColor cursor-pointer ${
                  activeTab === tab.id
                    ? "text-brandColor font-semibold"
                    : "text-titleColor"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.icon && <tab.icon className="text-[18px]" />}
                <p className="!leading-[15px] text-[13px]">{tab.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-0 lg:mt-8">
            {tabs.map((tab) => (
              <div key={tab.id}>{activeTab === tab.id && tab.component}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChackoutTabs;
