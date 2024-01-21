"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/Partner-view/components/Navbar(Partner)";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function AllLawyers() {
  const authToken = localStorage.getItem("authToken");
  const [lawyers, setLawyers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/lawyers/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
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

  const handleSort = (criteria) => {
    // Toggle sorting order if the same criteria is clicked
    const newSortOrder = criteria === sortCriteria ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

    // Update sort criteria and order
    setSortCriteria(criteria);
    setSortOrder(newSortOrder);

    // Sort the lawyers based on the selected criteria and order
    const sortedLawyers = [...lawyers].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    // Update the state with sorted lawyers
    setLawyers(sortedLawyers);
  };

  const getSortIndicatorStyle = (criteria) => {
    return {
      backgroundColor: criteria === sortCriteria ? "#f2f2f2" : "transparent",
      cursor: "pointer",
    };
  };

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section className="dashboard-container">
        <div className="overflow-x-auto px-9">
          <p className="text-black text-center">Click To Sort</p>
          <table className="table bg-white text-black">
            <thead className="text-black text-xl text-center capitalize">
              <tr>
                <th></th>
                <th onClick={() => handleSort("fname")} style={getSortIndicatorStyle("fname")}>
                  First Name {sortCriteria === "fname" && (sortOrder === "asc" ? <AiOutlineArrowUp size={12} /> : <AiOutlineArrowDown size={12} />)}
                </th>
                <th onClick={() => handleSort("lname")} style={getSortIndicatorStyle("lname")}>
                  Last Name {sortCriteria === "lname" && (sortOrder === "asc" ? <AiOutlineArrowUp size={12} /> : <AiOutlineArrowDown size={12} />)}
                </th>
                <th onClick={() => handleSort("email")} style={getSortIndicatorStyle("email")}>
                  Email {sortCriteria === "email" && (sortOrder === "asc" ? <AiOutlineArrowUp size={12} /> : <AiOutlineArrowDown size={12} />)}
                </th>
                <th onClick={() => handleSort("date_registered")} style={getSortIndicatorStyle("date_registered")}>
                  Date Registered {sortCriteria === "date_registered" && (sortOrder === "asc" ? <AiOutlineArrowUp size={12} /> : <AiOutlineArrowDown size={12} />)}
                </th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((lawyer, index) => (
                <tr
                  key={index}
                  className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300"
                >
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
