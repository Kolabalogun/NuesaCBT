/**
 * UnAuthenticated Component
 *
 * The UnAuthenticated component is a route guard that checks if the user is not authenticated.
 * If the user is not authenticated, it renders the children components; otherwise, it redirects
 * the user to the dashboard page.
 *
 * @param {Object} props - React props containing the children components.
 * @returns {JSX.Element} - The UnAuthenticated component JSX.
 */

import { Navigate } from "react-router-dom";

import { useGlobalContext } from "../../functions/context";

// eslint-disable-next-line react/prop-types
const UnAuthenticated = ({ children }) => {
  const { user: isAuthenticated } = useGlobalContext();

  // Render children if not authenticated, otherwise, redirect to the dashboard page
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/choose-course"} replace />
  );
};

export default UnAuthenticated;
