/* eslint-disable react/no-unescaped-entities */

import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";

import { useGlobalContext } from "../../functions/context";

const Contact = () => {
  const { pageContent } = useGlobalContext();

  return (
    <div
      className="max-w-[1240px] mx-auto  md:pt-32 pb-6 pt-10  px-5 sm:px-10 xl:px-0  "
      id="contact"
    >
      {/* <div className="h-[1px] w-full  mt-40 bg-[#000]"></div> */}

      <div className="flex flex-col items-center justify-center bg-white py-[80px]">
        <div className="flex">
          <a
            href={pageContent?.footerTwitterLink}
            target={"_blank"}
            rel="noreferrer"
            className="rounded-[50px] p-2 bg-black mx-3 hover:bg-twitter cursor-pointer hover:bg-[#987efc]"
          >
            <img src={twitter} alt="twitter" className="h-5" />
          </a>

          <a
            href={pageContent?.footerInstagramLink}
            target={"_blank"}
            rel="noreferrer"
            className="rounded-[50px] p-2 bg-black hover:bg-ig  mx-3 cursor-pointer hover:bg-[#987efc]"
          >
            <img src={instagram} alt="instagram" className="h-5" />
          </a>

          <a
            href={pageContent?.footerLinkedInLink}
            target={"_blank"}
            rel="noreferrer"
            className="rounded-[50px] p-2 hover:bg-linked  bg-black mx-3 cursor-pointer hover:bg-[#987efc]"
          >
            <img src={linkedin} alt="linkedin" className="h-4" />
          </a>
        </div>

        <p className="text-black my-8 font-semibold ">
          NUESA, University of Ilorin
        </p>
        <a
          href="https://ibrahimkolabalogun.web.app/"
          target={"_blank"}
          rel="noreferrer"
          className="text-black font-medium mt-8  mb-[-60px] text-[15px]"
        >
          Developed by <span className="text-[#2c244d] ">Ibrahim</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
