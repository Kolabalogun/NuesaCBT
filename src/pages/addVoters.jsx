import { auth, db } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useGlobalContext } from "../functions/context";

// create firebase account with auth updating
const createUserWithoutAuthUpdate = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

function AddVoters() {
  // get data from context
  const { notification, setnotification, loading, setloading, matricNumbers } =
    useGlobalContext();

  const currentUserEmail = localStorage.getItem("email");
  const currentUserPassword = localStorage.getItem("password");

  const matricNoData = matricNumbers.map((data) => ({
    matricNumber: data.matricnumber,
    department: data.department,
    level: data.level,
  }));

  // handle create multiple accounts

  const handleCreateMultipleAccounts = async () => {
    setloading(true);
    try {
      const registeredStudents = [];
      const errors = [];

      for (const data of matricNoData) {
        const { matricNumber, department, level } = data;

        // Generate a random password
        const password = Math.random().toString(36).slice(2, 9);
        const email = `${matricNumber}@gmail.com`;

        try {
          const user = await createUserWithoutAuthUpdate(email, password);

          // Set display name as the department
          await updateProfile(user, {
            displayName: department,
          });

          await addDoc(collection(db, "voters"), {
            matricNumber: matricNumber,
            department: department,
            level,
            password: password,
            createdAt: serverTimestamp(),
            userId: user?.uid,
          });

          // Restore the original signed-in user if they were initially signed in

          try {
            await signInWithEmailAndPassword(
              auth,
              `${currentUserEmail}@gmail.com`,
              currentUserPassword
            );
          } catch (error) {
            console.error("Error signing in original user:", error);
          }

          setnotification("Accounts Created Successfully");

          setloading(false);
        } catch (error) {
          // Handle specific errors
          if (error.code === "auth/email-already-in-use") {
            errors.push(`Email (${email}) is already in use.`);
            setnotification(`Email (${email}) is already in use.`);
          } else if (error.code === "auth/invalid-email") {
            errors.push(`Invalid email format for (${email}).`);
            setnotification(`Invalid email format for (${email}).`);
          } else {
            errors.push(`Error registering (${email}): ${error.message}`);
            setnotification(`Error registering (${email}): ${error.message}`);
          }
          setloading(false);
        }
      }

      console.log("Registered students:", registeredStudents);
    } catch (error) {
      console.error("Error registering students:", error);
      setloading(false);
    }
  };

  const [matricNumber, setmatricNumber] = useState("");
  const [department, setdepartment] = useState("");
  const [level, setlevel] = useState("");

  // handle login
  const handleSignIn = async () => {
    if (matricNumber && department && level) {
      setloading(true);

      const modifiedEmail = matricNumber.replace(/@gmail\.com$/, "");

      const trimmedemail = modifiedEmail.trim();
      // Generate a random password
      const password = Math.random().toString(36).slice(2, 9);
      const email = `${trimmedemail}@gmail.com`;

      try {
        const user = await createUserWithoutAuthUpdate(email, password);

        await addDoc(collection(db, "voters"), {
          matricNumber: modifiedEmail,
          department: department,
          level,
          password: password,
          createdAt: serverTimestamp(),
          userId: user?.uid,
        });

        // Restore the original signed-in user if they were initially signed in

        await signInWithEmailAndPassword(
          auth,
          `${currentUserEmail}@gmail.com`,
          currentUserPassword
        );

        setnotification("Accounts Created Successfully");
      } catch (error) {
        const errorMessage = error.message;
        console.error(error);
        setnotification(errorMessage);
      } finally {
        setloading(false);
      }
    } else {
      setnotification("All fields must be filled");
    }
  };

  const departmentsArr = [
    "Chemical Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Agric and Biosystem Engineering",
    "Food and Bioprocess Engineering",
    "Water Engineering",
    "Biomedical Engineering",
    "Material and Metallurgical Engineering",
    "Computer Engineering",
    "Electrical Engineering",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] p-6 bg-gray-50 dark:bg-gray-900">
      <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full">
          <h1 className="mb-4 text-xl text-center font-semibold text-gray-700 dark:text-gray-200">
            Create Multiple Accounts
          </h1>

          <button
            onClick={handleCreateMultipleAccounts}
            disabled={loading}
            className="mt-4"
          >
            {loading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              "Create Accounts"
            )}
          </button>

          <div className="py-3 h-5">
            <p>{notification}</p>
          </div>
        </div>
      </main>

      <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full">
          <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Create Individal Account
          </h1>
          <div>
            <span>Matric Number or Email</span>
            <input
              className="mt-1"
              type="text"
              value={matricNumber}
              onChange={(e) => setmatricNumber(e.target.value)}
              placeholder="19/40AB045"
            />
          </div>

          <div className="mt-4">
            <span>Department</span>
            <select
              name="department"
              value={department}
              style={{
                backgroundColor: "#24262d",
                borderWidth: 1,
                borderColor: "#4c4f52",
                borderRadius: 5,
              }}
              className="w-full bg-[#1a1c23] border-[#eee] my-1 py-2"
              onChange={(e) => setdepartment(e.target.value)}
            >
              <option className="bg-black" value="">
                Enter Department
              </option>
              {departmentsArr.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <span>Level</span>
            <select
              value={level}
              style={{
                backgroundColor: "#24262d",
                borderWidth: 1,
                borderColor: "#4c4f52",
                borderRadius: 5,
              }}
              className="w-full bg-[#1a1c23] border-[#eee] my-1 py-2"
              onChange={(e) => setlevel(e.target.value)}
            >
              <option className="bg-black dark:bg-white" value="">
                Select an Option
              </option>
              <option className="bg-black" value="400 Level">
                400 Level
              </option>
              <option className="bg-black" value="Other Levels">
                Other Levels
              </option>
            </select>
          </div>

          <button onClick={handleSignIn} className={`mt-4`} disabled={loading}>
            {loading ? <div className="lds-dual-ring"></div> : "Register"}
          </button>
          <div className="py-3 h-5">
            <p>{notification}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddVoters;
