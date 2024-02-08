import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import ErrorPage from "../pages/error";
import Register from "../pages/register";

import Login from "../pages/login";
import CourseSelection from "../pages/choosecourse";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Protected from "../components/auth/Protected";
import Quiz from "../pages/quiz";
import UnAuthenticated from "../components/auth/UnAuthenticated";
import AddVoters from "../pages/addVoters";
import Contactt from "../pages/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contactt />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addVoters",
    element: <AddVoters />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <UnAuthenticated>
        <Register />
      </UnAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <UnAuthenticated>
        <Login />
      </UnAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/choose-course",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <CourseSelection />
        </Protected>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/quiz",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Quiz />
        </Protected>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);
export default router;
