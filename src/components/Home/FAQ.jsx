import { useState } from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "Why should I take these quizzes?",
      answer:
        "Our quizzes provide an interactive learning experience, helping you grasp concepts more effectively. They are designed to reinforce your knowledge and prepare you for success in your exams and beyond.",
    },
    {
      question: "How do the quizzes benefit me?",
      answer:
        "By taking these quizzes, you can identify your strengths and weaknesses in various subjects. This self-assessment helps tailor your study approach, focusing on areas that need improvement, ultimately boosting your academic performance.",
    },
    {
      question: "Are the quizzes time-consuming?",
      answer:
        "No, the quizzes are designed to be time-efficient. Each quiz has a 10-minute time limit per course, ensuring that you can seamlessly integrate them into your study routine without disrupting your schedule.",
    },
    // Add more questions and answers as needed
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className=" bg-white min-h-[85vh] py-16">
      <h1 className="font-semibold text-4xl lg:text-[55px] text-center lg:leading-[75px] leading-[50px]">
        Mock FAQs:
      </h1>

      <div className="flex items-center justify-center flex-col lg:mt-32 mt-16">
        <div className=" text-center  max-w-[800px]">
          {faqData.map((item, index) => (
            <div key={index} className="accordion-item py-10 border-t-2 ">
              <div
                className={`font-semibold text-2xl lg:text-3xl  ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => handleAccordionClick(index)}
              >
                {item.question}
              </div>
              {activeIndex === index && (
                <div className="accordion-content py-3">
                  <p className="font-medium">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
