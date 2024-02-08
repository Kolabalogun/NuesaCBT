import { useEffect } from "react";
import Contact from "../components/Home/Contact";
import Navbar from "../components/Navbar";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
        <Navbar />
        <LoginForm />
        <Contact />
      </div>
    </div>
  );
};

export default Login;
