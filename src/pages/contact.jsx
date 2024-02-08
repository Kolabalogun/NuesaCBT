import { useEffect } from "react";
import Contact from "../components/Home/Contact";
import Help from "../components/Home/Help";
import Navbar from "../components/Navbar";

const Contactt = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);
  return (
    <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto h-screen flex flex-col justify-between">
      <Navbar />

      <Help />

      <Contact />
    </div>
  );
};

export default Contactt;
