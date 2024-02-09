/* eslint-disable react/no-unescaped-entities */
import * as Yup from "yup";
import { useFormik } from "formik";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import showToast from "../Toast";

const LoginForm = () => {
  const toast = useToast();

  const navigate = useNavigate();
  // Define validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    // Validation rules for form fields

    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),

    password: Yup.string().required("Jamb Reg is required"),
  });

  // Use useFormik hook to manage form state, validation, and submission
  const formik = useFormik({
    // Form initial values
    initialValues: {
      email: "",
      password: "",
    },
    // Form validation schema using Yup
    validationSchema: RegisterSchema,
    // Form submission handler
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const { email, password } = values;

      try {
        await signInWithEmailAndPassword(auth, email, password.toUpperCase());

        setSubmitting(false);
        showToast(toast, "Login.", "success", "Login Successfully.");
        navigate("/choose-course");
      } catch (error) {
        console.log(error);
        showToast(toast, "Error.", "error", "Login Failed.");
        setSubmitting(false);
      }
    },
  });

  // Destructure properties from formik for ease of use
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div className="min-h-[70vh]  flex flex-col justify-center ">
      <h1 className="font-semibold text-4xl mt-16   ">
        Heyy Scholar, Welcome Back!
      </h1>

      <div className="mt-16">
        <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label className="text-base font-medium  mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="bg-inherit border-[#acacac] p-3 rounded-lg border-[1px] outline-none"
              type="email"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 py-0.5 text-xs font-medium ">
                {errors.email}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-medium  mb-1" htmlFor="password">
              Jamb Reg
            </label>
            <div className="flex items-center   bg-inherit border-[#acacac] rounded-lg border-[1px] relative ">
              <input
                id="password"
                type={"text"}
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
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </div>

          {/* <div className="my-5">
            <p className="text-center text-[#5d5d5d] text-sm font-medium">
              Don't have an account?{" "}
              <Link to={"/register"}>
                <span className="text-[#000]">Sign Up</span>
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
