import Contact from "../components/Home/Contact";
import Help from "../components/Home/Help";
import FAQ from "../components/Home/FAQ";
import Hero from "../components/Home/Hero";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../functions/context";

const Home = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
          <Navbar />
          <Hero />
          <FAQ />
          <Help />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Home;
