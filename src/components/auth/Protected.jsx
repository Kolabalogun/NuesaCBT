/**
 * Protected Component
 *
 * The Protected component is a route guard that checks if the user is authenticated.
 * If the user is authenticated, it renders the children components; otherwise, it redirects
 * the user to the login page with the current location saved in the state for redirection after login.
 *
 * @param {Object} props - React props containing the children components.
 * @returns {JSX.Element} - The Protected component JSX.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../functions/context";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {
  const { user: isAuthenticated } = useGlobalContext();

  // Get the current location
  const location = useLocation()?.pathname;

  // Render children if authenticated, otherwise, redirect to the login page
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default Protected;
