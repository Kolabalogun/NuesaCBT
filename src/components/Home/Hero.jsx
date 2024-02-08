import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative w-full min-h-[75vh]  flex flex-col items-center justify-center text-center"
      id="home"
    >
      <p className="lg:-mt-16   font-medium text-lg">
        Powered by the Legacy Era!
      </p>
      <h1 className="font-semibold text-4xl lg:text-[55px] text-center lg:leading-[75px] leading-[50px] mt-2">
        Welcome to NUESA Mock Test. <br className="hidden lg:block" />
        <span className="hidden lg:inline "> Unlock Your Potential:</span>{" "}
        Elevate Your Learning with Interactive CBT Quizzes!
      </h1>

      <Link to={"/login"}>
        <button className="bg-black  lg:text-xl text-white py-4 px-8 font-medium rounded-md mt-9">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Hero;
