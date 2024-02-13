/* eslint-disable react/no-unescaped-entities */
import Contact from "../components/Home/Contact";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/Firebase";

const Result = () => {
  const [loading, setLoader] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    scroll(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true);
    try {
      const usersDocRef = collection(db, "users");

      const unsub = onSnapshot(
        usersDocRef,
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });

          if (!list || list.length === 0) {
            setUsers([]);
          } else {
            setUsers(list);
            setLoader(false);
          }
        },
        (error) => {
          console.log(error);

          setLoader(false);
        }
      );

      return unsub;
    } catch (error) {
      console.log(error);

      setLoader(false);
      return () => {};
    }
  };

  const tableHeads = [
    "S/N",
    "fullName",
    "email",
    "Jamb Reg",
    "department",
    "MAT 111",
    "MAT 113",
    "PHY 115",
    "PHY 125",
    "PHY 191",
    "CHM 101",
    "CHM 115",
    "STA 131",
  ];

  const th = (
    <Tr>
      {tableHeads.map((head, index) => (
        <Th key={index} className="table-head">
          {head}
        </Th>
      ))}
    </Tr>
  );

  const rows = users?.map((body, index) => (
    <Tr key={index}>
      <Td>
        <p>{index + 1}</p>
      </Td>
      <Td>
        <p>{body?.fullName}</p>
      </Td>
      <Td>
        <p>{body?.email}</p>
      </Td>
      <Td>
        <p>{body?.jambReg}</p>
      </Td>
      <Td>
        <p>{body?.department}</p>
      </Td>
      <Td>
        <p>{body?.["MAT 111"]}</p>
      </Td>
      <Td>
        <p>{body?.["MAT 113"]}</p>
      </Td>
      <Td>
        <p>{body?.["PHY 115"]}</p>
      </Td>
      <Td>
        <p>{body?.["PHY 125"]}</p>
      </Td>
      <Td>
        <p>{body?.["PHY 191"]}</p>
      </Td>
      <Td>
        <p>{body?.["CHM 101"]}</p>
      </Td>
      <Td>
        <p>{body?.["CHM 115"]}</p>
      </Td>
      <Td>
        <p>{body?.["STA 131"]}</p>
      </Td>
    </Tr>
  ));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1240px] px-5 sm:px-10 xl:px-0 mx-auto">
          <Navbar />

          <div className="my-10 min-h-screen">
            {users.length > 0 ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead>{th}</Thead>
                  <Tbody>{rows}</Tbody>
                </Table>
              </TableContainer>
            ) : (
              <div>
                <p>No Downlines available. You're yet to refer anyone!</p>
              </div>
            )}
          </div>

          <Contact />
        </div>
      </div>
    </>
  );
};

export default Result;
