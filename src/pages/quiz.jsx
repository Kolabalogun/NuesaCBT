import { useEffect, useState } from "react";
import Contact from "../components/Home/Contact";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../functions/context";
import { Phy115QuestionsArray, questionsArray } from "../components/questions";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/Firebase";
import { useToast } from "@chakra-ui/react";
import showToast from "../components/Toast";
const Quiz = () => {
  const { selectedCourse, setSelectedCourseList, selectedCourseList, user } =
    useGlobalContext();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState(
    selectedCourse === "PHY 115" ? Phy115QuestionsArray : questionsArray
  );
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const toast = useToast();
  let score = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);

      if (timeLeft === 0) {
        clearInterval(timer);
        // Call a function to handle quiz completion due to time expiration
        // onQuizComplete();
        setCurrentQuestionIndex(questions.length - 1);
        setSelectedCourseList([...selectedCourseList, selectedCourse]);
        localStorage.setItem(
          "selectedCourseList",
          JSON.stringify([...selectedCourseList, selectedCourse])
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (selectedOption) => {
    // Store the user's answer for the current question
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionIndex: currentQuestionIndex, selectedOption },
    ]);

    // Move to the next question or finish the quiz if it's the last question
    if (currentQuestionIndex === questions.length - 1) {
      // onQuizComplete();
      setSelectedCourseList([...selectedCourseList, selectedCourse]);
      JSON.stringify([...selectedCourseList, selectedCourse]);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Helper function to calculate the user's score
  const handleScoreUpdate = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user);

      await updateDoc(userRef, {
        [selectedCourse]: parseInt(calculateScore()),
      });
      showToast(toast, "Login.", "success", "Score Updated Successfully.");
      navigate("/choose-course");
      setSelectedCourseList([...selectedCourseList, selectedCourse]);
      localStorage.setItem(
        "selectedCourseList",
        JSON.stringify([...selectedCourseList, selectedCourse])
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      showToast(toast, "Error.", "error", "Error Updating Score.");
      setLoading(false);
    }
  };

  // Helper function to calculate the user's score
  const calculateScore = () => {
    userAnswers.forEach((userAnswer) => {
      const { questionIndex, selectedOption } = userAnswer;
      const correctAnswer = questions[questionIndex].correctAnswer;

      if (selectedOption === correctAnswer) {
        score++;
      }
    });

    return score;
  };

  return (
    <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
      <Navbar />
      <div className="min-h-[50vh] flex flex-col  justify-center">
        <h2 className="font-semibold text-4xl mt-16">{selectedCourse}</h2>
        <h2 className="font-semibold text-lg mt-5">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        {currentQuestionIndex < questions.length - 1 && (
          <p className="font-medium mt-5">
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </p>
        )}

        {currentQuestionIndex < questions.length - 1 && (
          <div className="my-16">
            <p className="text-3xl font-medium">
              {questions[currentQuestionIndex].questionText}
            </p>
            <ul className="mt-16">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li
                  className="border-[1px] rounded py-4 px-10 w-full mb-10 font-medium cursor-pointer"
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentQuestionIndex === questions.length - 1 && (
          <div className="mt-16 font-medium">
            <h2 className="font-semibold text-4xl my-5">Yayy Scholar! </h2>
            <p>Congratulations! You have completed this quiz.😊</p>

            {/* <p className="text-black text-4xl">
              Your Score: {calculateScore()} / {questions.length}
            </p> */}
            <p>Click the button below to progress to the next Mock Test</p>

            <button
              disabled={loading}
              onClick={handleScoreUpdate}
              className="bg-black text-base text-white py-3 px-6 font-medium rounded-md mt-9"
            >
              {loading ? "Loading..." : "Proceed"}
            </button>
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
};

export default Quiz;
