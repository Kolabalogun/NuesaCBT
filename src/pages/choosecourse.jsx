/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import Contact from "../components/Home/Contact";
import Help from "../components/Home/Help";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../functions/context";
import { useNavigate } from "react-router-dom";

const CourseSelection = () => {
  const { setSelectedCourse, selectedCourseList, handleLogOut } =
    useGlobalContext();

  useEffect(() => {
    scroll(0, 0);
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const courses = [
    "MAT 111",
    "MAT 113",
    "PHY 115",
    "PHY 125",
    "PHY 191",
    "CHM 101",
    "CHM 115",
    "STA 131",
  ];

  const allCoursesSelected = courses.every((course) =>
    selectedCourseList.includes(course)
  );

  return (
    <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
      <Navbar />
      <div className="min-h-[65vh] flex flex-col justify-center pb-16">
        <h2 className="font-semibold text-4xl mt-16">
          {allCoursesSelected ? "Test Completed" : "Select a Course"}
        </h2>

        {allCoursesSelected && (
          <div className="">
            <h2 className="font-medium text-2xl lg:text-3xl mt-16">
              Congratulations on completing the Mock Test! We trust you've
              gained valuable insights. Your results will be announced shortly.
              Kindly log out and exit the hall. Thank you and best wishes! 😊
            </h2>

            <button
              // disabled={loading}
              onClick={handleLogOut}
              className="bg-black text-base text-white py-3 px-12 font-medium rounded-md mt-9"
            >
              Log Out
            </button>
          </div>
        )}

        <ul className="mt-16">
          {courses.map((course, index) => {
            if (!selectedCourseList.includes(course)) {
              return (
                <li
                  key={course}
                  onClick={() => {
                    setSelectedCourse(course);
                    navigate("/quiz");
                  }}
                  className="border-[1px] rounded py-4 px-10 w-full mb-10 font-medium cursor-pointer"
                >
                  {index + 1}. {course}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      <Help />

      <Contact />
    </div>
  );
};

export default CourseSelection;
