import { useEffect } from "react";
import Contact from "../components/Home/Contact";
import Navbar from "../components/Navbar";
import RegForm from "../components/auth/RegForm";

const Register = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
        <Navbar />
        <RegForm />
        <Contact />
      </div>
    </div>
  );
};

export default Register;
