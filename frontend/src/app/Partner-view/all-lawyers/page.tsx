"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/Partner-view/components/Navbar(Partner)";

export default function MyCase() {
  const authToken = localStorage.getItem("authToken");
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/lawyers/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLawyers(data);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section className="dashboard-container">
        <div className="overflow-x-auto px-9">
          <table className="table bg-white text-black">
            <thead className="text-black text-xl text-center capitalize">
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((lawyer, index) => (
                <tr
                  key={index}
                  className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                  <th>{index + 1}</th>
                  <td>{lawyer.fname}</td>
                  <td>{lawyer.lname}</td>
                  <td>{lawyer.email}</td>
                  <td>{lawyer.date_registered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

// import Navbar from "@/app/Partner-view/components/Navbar(Partner)";
// import React from "react";

// export default function MyCase() {
//   return (
//     <>
//       <section>
//         <Navbar />
//       </section>
//       <section className="dashboard-container">
//         <div className="overflow-x-auto px-9">
//           <table className="table bg-white text-black">
//             {/* head */}
//             <thead className="text-black text-xl text-center capitalize">
//               <tr>
//                 <th></th>
//                 <th>First Name</th>
//                 <th>last Name</th>
//                 <th>email</th>
//                 <th>date registered</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* 1st row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>1</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//               {/* 2nd row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>2</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//               {/* 3rd row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>3</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//               {/* 4th row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>4</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//               {/* 5th row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>5</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//               {/* 6th row */}
//               <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
//                 <th>6</th>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//                 <td>
//                   This is a test until understanding how to import the data
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </>
//   );
// }
