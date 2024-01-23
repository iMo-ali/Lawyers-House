"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components_Paralegal/Navbar(Paralegal)";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function MyCase() {
    // const authToken = localStorage.getItem("authToken");
  const [cases, setCases] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/secretaries/all", {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCases(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
  //   fetchData();
  // }, [authToken]);
  fetchData();
  }, []);

  const handleSort = (criteria) => {
    const newSortOrder =
      criteria === sortCriteria
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : "asc";
    setSortCriteria(criteria);
    setSortOrder(newSortOrder);

    const sortedSecretaries = [...secretaries].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    setSecretaries(sortedSecretaries);
  };

  return (
    <section className="dashboard-container">
      <div className="overflow-x-auto px-9">
        <table className="table bg-white text-black">
          {/* Table structure */}
          {/* ... */}
          <tbody>
            {cases.map((caseItem, index) => (
              <tr key={index}>
                {/* Table cells */}
                {/* ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
