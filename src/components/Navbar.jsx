import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.jpg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

import useMediaQuery from "../Hook/useMediaQuery";
import { NavLinks } from "./links";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex py-10 justify-between items-center w-full ">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" className="h-9 w-9 rounded-full" />
          <p className="uppercase font-bold text-lg text-black ">
            NUESA MOCK TEST
          </p>
        </div>

        {isAboveMediumScreens ? (
          <div>
            {NavLinks.map(({ title, link }, idx) => (
              <Link
                key={idx}
                to={link}
                className={
                  "   uppercase cursor-pointer font-medium  py-2 linked mx-8 text-black  "
                }
              >
                {title}
              </Link>
            ))}
          </div>
        ) : (
          <button
            className="rounded-full bg-secondary-500 p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img src={menu} className="w-8 h-10 fill-black" alt="menu" />
          </button>
        )}
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-[1001] h-full w-[300px] bg-[#2d2d2d] drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <img src={close} className="w-6 h-8 fill-black" alt="close" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-5 flex flex-col gap-10 text-2xl">
            {NavLinks.map(({ title, link }, idx) => (
              <Link
                key={idx}
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                className={
                  "text-base font-medium linked cursor-pointer py-2  mx-10 text-white  "
                }
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
