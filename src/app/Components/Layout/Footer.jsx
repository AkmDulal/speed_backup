"use client";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-[#332922]  shadow-[0_10px_10px_-16px_rgba(0,0,0,0.3)] pt-[60px] ">
      <div className="grid lg:grid-cols-12 md:grid-cols-12  gap-4 container mx-auto px-[15px] pb-[45px]">
        <div className="lg:col-span-2 md:col-span-2 col-span-3">
          <Image
            width={120}
            height={78}
            className="mb-[25px]"
            // src="./assets/images/logo.svg"
            src={"/" + "../../assets/images/logo.svg"}
            alt="logo"
          />
          <Image
            width={120}
            height={78}
            onClick={() => {
              window.open(
                "https://apps.apple.com/fi/app/sped-delivery-food-and-more/id6448701507"
              );
            }}
            className="cursor-pointer mt-10 md:mt-4 lg-mt-10 md:hidden lg:flex w-[150px]"
            src={"/" + "../../assets/images/appStore.svg"}
            alt="App Store"
          />
          {/* <Image
            width={120}
            height={78}
            onClick={() => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.Sped.Delivery&pcampaignid=web_share"
              );
            }}
            className="cursor-pointer mt-10 md:mt-4 lg-mt-10 md:hidden lg:flex w-[150px]"
            src={"/" + "../../assets/images/GooglePlayStore.png"}
            alt="Google Play Store"
          /> */}
        </div>

        <div className="lg:col-span-2 md:col-span-2 col-span-3">
          <h3 className="text-[18px] font-[600] text-[#FAF7F5] lg:pb-[20px] md:pb-[20px] pb-[10px]">
            {" "}
            Partner with Sped{" "}
          </h3>
          <ul>
            <li>
              {" "}
              <Link
                href="/en/couriers"
                className="text-[16px] font-[400] text-[#CCBDB3]"
              >
                {" "}
                For couriers{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/en/merchants"
                className="text-[16px] font-[400] text-[#CCBDB3] "
              >
                {" "}
                For merchants{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 md:col-span-2 col-span-3">
          <h3 className="text-[18px] font-[600] text-[#FAF7F5] lg:pb-[20px] md:pb-[20px] pb-[10px]">
            {" "}
            Company{" "}
          </h3>
          <ul>
            <li>
              {" "}
              <Link
                href="/en/about-us"
                className="text-[16px] font-[400] text-[#CCBDB3]"
              >
                {" "}
                About us{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href="/en/sped-stand-for"
                className="text-[16px] font-[400] text-[#CCBDB3] "
              >
                {" "}
                What we stand for{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href="/en/sped-jobs"
                className="text-[16px] font-[400] text-[#CCBDB3]"
              >
                {" "}
                Jobs{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href="/en/sustainability"
                className="text-[16px] font-[400] text-[#CCBDB3] "
              >
                {" "}
                Sustainability{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href="/en/security"
                className="text-[16px] font-[400] text-[#CCBDB3]"
              >
                {" "}
                Security{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Investors{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 md:col-span-2 col-span-3">
          <h3 className="text-[18px] font-[600] text-[#FAF7F5] lg:pb-[20px] md:pb-[20px] pb-[10px]">
            {" "}
            Products{" "}
          </h3>
          <ul>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Sped Drive{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Sped Market{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Sped+{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Sped for Work{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 md:col-span-2 col-span-3">
          <h3 className="text-[18px] font-[600] text-[#FAF7F5] lg:pb-[20px] md:pb-[20px] pb-[10px]">
            {" "}
            Useful links{" "}
          </h3>
          <ul>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Support{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Media{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Contact{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Speak up{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Promo codes{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Developers{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 md:col-span-2 col-span-6">
          <h3 className="text-[18px] font-[600] text-[#FAF7F5] lg:pb-[20px] md:pb-[20px] pb-[10px]">
            {" "}
            Follow us{" "}
          </h3>
          <ul>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Blog{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Engineering Blog{" "}
              </Link>{" "}
            </li>
            {/* <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3]">
                {" "}
                Instagram{" "}
              </Link>{" "}
            </li> */}
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                <span
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/speddeliveryapp",
                      "_blank"
                    );
                  }}
                >
                  Facebook
                </span>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Twitter{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                <span
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/company/speddeliveryapps/mycompany/",
                      "_blank"
                    );
                  }}
                >
                  LinkedIn
                </span>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/" className="text-[16px] font-[400] text-[#CCBDB3] ">
                {" "}
                Sped Life{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full bg-[#2C231D] h-[80px]">
        <div className="container mx-auto px-[15px] w-full flex items-center justify-between  h-full text-[16px] font-[400] text-white">
          <div className="w-1/3  flex justify-between items-center ">
            <Link href="/" className="text-[16px] font-[400] text-white ">
              Accessibility Statement User
            </Link>
            <Link
              href="/en/terms-and-conditions"
              className="text-[16px] font-[400] text-white "
            >
              Terms of Service
            </Link>
            <Link
              href="/en/privacy-policy"
              className="text-[16px] font-[400] text-white "
            >
              Privacy Statement
            </Link>
          </div>

          <div className=" flex justify-between items-center">
            <p>©️ Sped 2023–2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
