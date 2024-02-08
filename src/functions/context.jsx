/* eslint-disable react/prop-types */
import { useState, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../utils/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //loading state
  const [loading, setloading] = useState(false);
  const [notification, setnotification] = useState(false);

  const [user, setUser] = useState(localStorage.getItem("nuesa-user") || null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseList, setSelectedCourseList] = useState(
    JSON.stringify(localStorage.getItem("selectedCourseList")) || []
  );

  useEffect(() => {
    setloading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const unsubscribeSnapshot = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            // const userData = snapshot.data();
            localStorage.setItem("nuesa-user", user.uid);
            setUser(user.uid);
            setloading(false);
          } else {
            setUser(null);
            localStorage.setItem("nuesa-user", null);
            setloading(false);
          }
        });

        // Cleanup the snapshot listener on component unmount or when user signs out

        setloading(false);
        return () => unsubscribeSnapshot();
      } else {
        // User is signed out
        setUser(null);
        localStorage.setItem("nuesa-user", null);

        setloading(false);
      }
    });

    // Cleanup the auth state change listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogOut = async () => {
    await signOut(auth);
    localStorage.setItem("nuesa-user", null);
    setSelectedCourseList([]);
    localStorage.setItem("selectedCourseList", []);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setloading,
        user,
        selectedCourse,
        setSelectedCourse,
        selectedCourseList,
        setSelectedCourseList,

        notification,
        setnotification,
        handleLogOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
