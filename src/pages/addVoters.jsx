import { auth, db } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

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
  const { notification, setnotification, loading, setloading } =
    useGlobalContext();

  const usersss = [
    {
      fullName: "David Olawale",
      jambReg: "202210905063DA",
      email: "davsemilore@gmail.com",
      department: "Water resources and environmental engineering",
    },
    {
      fullName: "Ogunmola Samson Ayomide",
      jambReg: "202210515475JA",
      email: "ogunmolasamson11@gmail.com",
      department: "Biomedical engineering",
    },
    {
      fullName: "SOBONA ABDULBASIT AYODEJI",
      jambReg: "202210911278CA",
      email: "sobonaayodeji@gmail.com",
      department: "Agricultural and Biosystem Engineering",
    },
    {
      fullName: "Tijani Abdulbasit Adewale",
      jambReg: "202210583385HA",
      email: "tijaniakano3096@gmail.com",
      department: "Agricultural and Bio System Engineering",
    },
    {
      fullName: "Abdulsalam abdulafeez",
      jambReg: "202210704462CF",
      email: "abdulafeezabdulsalam84@gmail.com",
      department: "Engineering (Materials and Metallurgical Engineering)",
    },
    {
      fullName: "Showami fathiu oloyede",
      jambReg: "202210875631DF",
      email: "oloyedesho6430@gmail.com",
      department: "Chemical engineering",
    },
    {
      fullName: "Rehoboth Emmanuel",
      jambReg: "202211259419JF",
      email: "rehobothemmanuel1707@gmail.com",
      department: "Mechanical Engineering",
    },
    {
      fullName: "Olawepo Shalom Inioluwa",
      jambReg: "202210238759JA",
      email: "shalomolawepo2007@gmail.com",
      department: "Electrical Electronics Engineering",
    },
    {
      fullName: "Arowolo Olutomiwa Joel",
      jambReg: "202210254823EF",
      email: "arowolotomiwa2020@gmail.com",
      department: "Electrical and Electronics Engineering",
    },
    {
      fullName: "Olawunmi Jesutofunmi",
      jambReg: "202210142344EA",
      email: "olawunmitofunmilola@gmail.com",
      department: "Chemical Engineering",
    },
    {
      fullName: "Abogunrin victor",
      jambReg: "202210242194BF",
      email: "victorabogunrin@gmail.com",
      department: "Electrical and Electronics Engineering",
    },
    {
      fullName: "Abdulazeez muhammed",
      jambReg: "202210210034HF",
      email: "muhammedademola222@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "Zubair Muhammad Muhsin",
      jambReg: "202210244402JA",
      email: "zubairmuhammadmuhsin@gmail.com",
      department: "Electrical Electronics Engineering",
    },
    {
      fullName: "ONOSHI Wisdom Oshukunuoname",
      jambReg: "202210436900EF",
      email: "wisdomonoshi@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "TITILOYE SILAS PROMISE",
      jambReg: "202210145464CA",
      email: "silastitiloye@gmail.com",
      department: "FOOD ENGINEERING",
    },
    {
      fullName: "Oyinloye Nifemi Emmanuel",
      jambReg: "202211041027DA",
      email: "oyinyinkanifemi@gmail.com",
      department: "Computer engineering",
    },
    {
      fullName: "Saadudeen Abdulbasit",
      jambReg: "202210715863CA",
      email: "saadudeenabdulbasitopeyemi@gmail.com",
      department: "Computer engineering",
    },
    {
      fullName: "JAGUN PELUMI IDOWU",
      jambReg: "202211554809BF",
      email: "jagunpelumi261@gmail.com",
      department: "Materials & Metallurgical Engineering",
    },
    {
      fullName: "JAGUN PELUMI IDOWU",
      jambReg: "202211554809BF",
      email: "jagunpelumi261@gmail.com",
      department: "Materials & Metallurgical Engineering",
    },
    {
      fullName: "Olabiyi Tomisin",
      jambReg: "202210912151CF",
      email: "olabiyitomisin0@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "Ibrahim Ridwan",
      jambReg: "202210263693GA",
      email: "ibrariden13@gmail.com",
      department: "Electrical Electronic Engineering",
    },
    {
      fullName: "ameen Abdul quawiyy",
      jambReg: "202210197919ef",
      email: "aminuayomide08@gmail.com",
      department: "Computer engineering",
    },
    {
      fullName: "Woli-Jimoh Abdur-rahman Abiola",
      jambReg: "202210847085HF",
      email: "abdulabiola17@gmail.com",
      department: "Electrical and Electronics Engineering",
    },
    {
      fullName: "Kehinde Promise Oluwatimilehin",
      jambReg: "202210233083GF",
      email: "promiseoluwatimilehin9@gmail.com",
      department: "Chemical engineering",
    },
    {
      fullName: "Adewuni Daniel",
      jambReg: "202211331626GA",
      email: "danielayomide190@gmail.com",
      department: "Mechanical Engineering",
    },
    {
      fullName: "Abogunrin victor",
      jambReg: "202210242194BF",
      email: "victorabogunrin@gmail.com",
      department: "Electrical and electronics engineering",
    },
    {
      fullName: "Motunrayo",
      jambReg: "202210630114DA",
      email: "motunrayoayodele282@gmail.com",
      department: "Chemical engineering",
    },
    {
      fullName: "Oyedotun Ezekiel Joy",
      jambReg: "202211083932BF",
      email: "jeze04082002@gmail.com",
      department: "Water Resources And Environmental Engineering",
    },
    {
      fullName: "Mutiu oluwabukola opeyemi",
      jambReg: "202210987918FA",
      email: "opeyemioluwabukola33@gmail.com",
      department: "Biomedical engineering",
    },
    {
      fullName: "Adeleke Daniel Olabode",
      jambReg: "202211577918IF",
      email: "adelekedaniel279@gmail.com",
      department: "Metallurgy and material engineering",
    },
    {
      fullName: "Ogbonna Seth",
      jambReg: "202210371556GA",
      email: "ogbonnaseth06@gmail.com",
      department: "Material and metallurgical engineering",
    },
    {
      fullName: "Oyebade",
      jambReg: "202210231995JA",
      email: "basitoyebade@gmail.com",
      department: "Biomedical engineering",
    },
    {
      fullName: "Ibrahim Agboola Laufe",
      jambReg: "202210734697JA",
      email: "ibrahimlaufe@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "ONI ABDURRAZAQ ADEDAMOLA",
      jambReg: "202211330957IA",
      email: "Elarazzyconcept01@gmail.com",
      department: "AGRICULTURAL AND BIOSYSTEM ENGINEERING",
    },
    {
      fullName: "Dada Quadri Abolaji",
      jambReg: "202211177200Da",
      email: "dadaquadri20@gmail.com",
      department: "Chemical engineering",
    },
    {
      fullName: "Abdullahi Abdulmalik olawale",
      jambReg: "202210968776JF",
      email: "altobeehiyu@gmail.com",
      department: "Optometry",
    },
    {
      fullName: "Adeyoyin oluwaseyi Ezekiel",
      jambReg: "202211612718da",
      email: "seyiadeyoyin8@gmail.com",
      department: "Mechanical engineering",
    },
    {
      fullName: "Soliu Ahmad Kolapo",
      jambReg: "202211376690IA",
      email: "soliuahmad111@gmail.com",
      department: "Electrical and Electronics Engineering",
    },
    {
      fullName: "Popoola Ayomide",
      jambReg: "202210230808EA",
      email: "01popoolaayomide@gmail.com",
      department: "Agricultural and Biosystem Engineering",
    },
    {
      fullName: "Salaudeen Abdulkabir Abiodun",
      jambReg: "202210077180BA",
      email: "abdulkabirsalaudeen44@gmail.com",
      department: "Biomedical Engineering",
    },
    {
      fullName: "Salaudeen Abdulkabir Abiodun",
      jambReg: "202210077180BA",
      email: "abdulkabirsalaudeen44@gmail.com",
      department: "Biomedical Engineering",
    },
    {
      fullName: "Adebisi Maryam Adeola",
      jambReg: "202210193914ca",
      email: "adebisimaryamadeola@gmail.com",
      department: "Chemical Engineering",
    },
    {
      fullName: "IFAKUNLE IFATOSIN GBOLAHAN.",
      jambReg: "202210928624CF",
      email: "edagbemi@gmail.com",
      department: "Civil engineering.",
    },
    {
      fullName: "Adegbite Quasim",
      jambReg: "202211698845DA",
      email: "qosmade2003@gmail.com",
      department: "ABE",
    },
    {
      fullName: "Adeoti Favour",
      jambReg: "202210147824JF",
      email: "adeotifavour303@gmail.com",
      department: "Food Engineering",
    },
    {
      fullName: "AbdulSalam AbdulRahman",
      jambReg: "202210919171HF",
      email: "abdulrahmanabdulsalam93@gmail.com",
      department: "Computer Engineering",
    },
    {
      fullName: "Afolabi khaleed",
      jambReg: "202210810203JA",
      email: "afokhaleed@gmail.com",
      department: "Biomedical Engineering",
    },
    {
      fullName: "Oni Stephen",
      jambReg: "2022774197FA",
      email: "stenox.ox@gmail.com",
      department: "Electrical Electronic Engineering",
    },
    {
      fullName: "Watti Joshua Olaoluwa",
      jambReg: "202210215740Ef",
      email: "jwatti051@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "Afolabi Tomiwa Augustine",
      jambReg: "202210688776FA",
      email: "augustinetomiwa6@gmail.com",
      department: "Water Resources and Environmental engineering",
    },
    {
      fullName: "Kamorudeen Quadri Olalekan",
      jambReg: "202211345826cf",
      email: "olalekanq2004@gmail.com",
      department: "Computer engineering",
    },
    {
      fullName: "Ahmad Fuhad",
      jambReg: "202211685610IF",
      email: "ahmadfuhad2@gmail.com",
      department: "Water Resources and environmental engineering",
    },
    {
      fullName: "Adelokun Daniel favour",
      jambReg: "202210953416EA",
      email: "danieladelokun@gmail.com",
      department: "Agricultural and biosystems engineering",
    },
    {
      fullName: "ZAKARIYAH MARUF OLAREWAJU",
      jambReg: "202290013106BA",
      email: "marufzakariyah2020@gmail.com",
      department: "Computer engineering",
    },
    {
      fullName: "Taiwo Samuel Jomiloju",
      jambReg: "202210283812HA",
      email: "samueltaiwoolatunji22@gmail.com",
      department: "Electrical electronics engineering",
    },
    {
      fullName: "JOSEPH Israel Ayooluwa",
      jambReg: "202210787172BA",
      email: "josephisrael626@gmail.com",
      department: "AGRICULTURAL AND BIOSYSTEMS ENGINEERING",
    },
    {
      fullName: "JOSEPH Israel Ayooluwa",
      jambReg: "202210787172BA",
      email: "josephisrael626@gmail.com",
      department: "AGRICULTURAL AND BIOSYSTEMS ENGINEERING",
    },
    {
      fullName: "Olasunkanmi Samiat Damilola",
      jambReg: "202211728394ba",
      email: "olasunkanmisamiat2022@gmail.com",
      department: "Civil Engineering",
    },
    {
      fullName: "OSESA ABIODUN MICHAEL",
      jambReg: "202210445909DA",
      email: "osesamicheal@gmail.com",
      department: "Water resources and environmental engineering",
    },
    {
      fullName: "Oderinde Daniel Adedeji",
      jambReg: "202211599104IA",
      email: "danieloderinde5@gmail.com",
      department: "Civil engineering",
    },
    {
      fullName: "Oderinde Daniel Adedeji",
      jambReg: "202211599104IA",
      email: "danieloderinde5@gmail.com",
      department: "Civil engineering",
    },
    {
      fullName: "Soyele Fatiat Akorede",
      jambReg: "202210301828FA",
      email: "soyelefatiat@gmail.com",
      department: "Computer Engineering",
    },
    {
      fullName: "Oderinde Daniel Adedeji",
      jambReg: "202211599104IA",
      email: "danieloderinde5@gmail.com",
      department: "Civil engineering",
    },
    {
      fullName: "Alimi Nasiru Oluwanishola",
      jambReg: "202211397341JA",
      email: "nasirualimi541@gmail.com",
      department: "Mechanical engineering",
    },
    {
      fullName: "Alade Tawakalit Moromoke",
      jambReg: "202211228070CF",
      email: "moromokealade087@gmail.com",
      department: "Food Engineering",
    },
    {
      fullName: "ALAGBE, Oluwatayomi Adedamola",
      jambReg: "202210411082DA",
      email: "samuelinfinity888@gmail.com",
      department: "Biomedical Engineering",
    },
  ];

  const matricNoData = usersss.map((data) => ({
    jambReg: data.jambReg,
    department: data.department,
    fullName: data.fullName,
    email: data.email,
  }));

  // handle create multiple accounts

  const handleCreateMultipleAccounts = async () => {
    setloading(true);
    try {
      const registeredStudents = [];
      const errors = [];

      for (const data of matricNoData) {
        const { email, jambReg, department } = data;

        try {
          const user = await createUserWithoutAuthUpdate(
            email,
            jambReg.toUpperCase()
          );

          await setDoc(collection(db, "users", user.uid), {
            jambReg: jambReg,
            department: department,
            fullName: fullName,
            email: email,
            createdAt: serverTimestamp(),
            uid: user?.uid,
          });

          // Restore the original signed-in user if they were initially signed in

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
            className="mt-4 text-white"
          >
            {loading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              "Create Accounts"
            )}
          </button>

          <div className="py-3 h-5">
            <p className="text-white">{notification}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddVoters;
