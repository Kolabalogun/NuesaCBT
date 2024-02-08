/* eslint-disable react/no-unescaped-entities */
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import showToast from "../Toast";
import { useNavigate } from "react-router-dom";

const RegForm = () => {
  const toast = useToast();

  const navigate = useNavigate();
  // Define validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    // Validation rules for form fields
    fullName: Yup.string()
      .min(2, "Must be more than 2 characters")
      .required("Please enter your full name"),
    jambReg: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("Your Jamb Reg Number can't be empty"),
    department: Yup.string()
      .min(2, "Must be more than 2 characters")
      .required("Your department can't be empty"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")

      .matches(/^\S*$/, "Password cannot contain spaces"),
  });

  // Use useFormik hook to manage form state, validation, and submission
  const formik = useFormik({
    // Form initial values
    initialValues: {
      fullName: "",
      jambReg: "",
      email: "",
      department: "",
      password: "",
    },
    // Form validation schema using Yup
    validationSchema: RegisterSchema,
    // Form submission handler
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const { fullName, jambReg, email, department, password } = values;

      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const res = userCredential.user;

        const userData = {
          uid: res.uid,
          email: email.toLowerCase(),
          fullName,
          jambReg,
          department,
        };

        // Set initial user data in db
        await setDoc(doc(db, "users", res.uid), {
          ...userData,
          createdAt: serverTimestamp(),
        });
        setSubmitting(false);
        showToast(
          toast,
          "Account created.",
          "success",
          "We've created your account for you."
        );
        navigate("/choose-course");
      } catch (error) {
        console.log(error);
        showToast(toast, "Error.", "error", "Registration Failed.");
        setSubmitting(false);
      }
    },
  });

  // Destructure properties from formik for ease of use
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // Define form data for rendering input fields
  const formData = [
    { name: "Full Name", value: "fullName" },
    { name: "Jamb Reg Number", value: "jambReg" },
    { name: "Email Address", value: "email" },
    { name: "Department", value: "department" },
  ];

  return (
    <div className="min-h-[70vh]  flex flex-col justify-center ">
      <h1 className="font-semibold text-4xl mt-16">Hello, who's this?</h1>

      <div className="mt-16">
        <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
          {formData.map(({ name, value }, idx) => (
            <div key={idx} className="flex flex-col ">
              <label className="text-base font-medium  mb-1" htmlFor={value}>
                {name}
              </label>
              <input
                id={value}
                readOnly={value === "referral"}
                className="bg-inherit border-[#acacac] p-3 rounded-lg border-[1px] outline-none"
                type={value === "phoneNumber" ? "number" : "text"}
                {...getFieldProps(value)}
              />
              {touched[value] && errors[value] ? (
                <div className="text-red-500 py-0.5 text-xs ">
                  {errors[value]}
                </div>
              ) : null}
            </div>
          ))}

          <div className="flex flex-col ">
            <label className="text-base font-medium  mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex items-center   bg-inherit border-[#acacac] rounded-lg border-[1px] relative ">
              <input
                id="password"
                type={"password"}
                className="flex-1 bg-inherit rounded-lg  outline-none p-3 "
                required
                {...getFieldProps("password")}
              />
            </div>
            {touched.password && errors.password ? (
              <div className="text-red-500 py-0.5 text-xs ">
                {errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              size="lg"
              className="bg-[#000] py-4 px-8 mt-5 rounded-md font-semibold  w-full  text-white"
            >
              {isSubmitting ? "Loading..." : "Create Account"}
            </button>
          </div>

          <div className="my-5">
            <p className="text-center text-[#5d5d5d] text-sm font-medium">
              Already have account?{" "}
              <Link to={"/login"}>
                <span className="text-[#000]">Sign In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegForm;
