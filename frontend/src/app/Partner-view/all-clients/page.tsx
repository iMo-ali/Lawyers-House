"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/Partner-view/components/Navbar(Partner)";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function AllClients() {
  const authToken = localStorage.getItem("authToken");
  const [clients, setClients] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/clients/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setClients(data);
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
    const newSortOrder =
      criteria === sortCriteria
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : "asc";
    setSortCriteria(criteria);
    setSortOrder(newSortOrder);

    const sortedClients = [...clients].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    setClients(sortedClients);
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
                <th
                  onClick={() => handleSort("fname")}
                  style={getSortIndicatorStyle("fname")}>
                  First Name{" "}
                  {sortCriteria === "fname" &&
                    (sortOrder === "asc" ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    ))}
                </th>
                <th
                  onClick={() => handleSort("lname")}
                  style={getSortIndicatorStyle("lname")}>
                  Last Name{" "}
                  {sortCriteria === "lname" &&
                    (sortOrder === "asc" ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    ))}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  style={getSortIndicatorStyle("email")}>
                  Email{" "}
                  {sortCriteria === "email" &&
                    (sortOrder === "asc" ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    ))}
                </th>
                <th
                  onClick={() => handleSort("date_registered")}
                  style={getSortIndicatorStyle("date_registered")}>
                  Date Registered{" "}
                  {sortCriteria === "date_registered" &&
                    (sortOrder === "asc" ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    ))}
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={index}
                  className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                  <th>{index + 1}</th>
                  <td>{client.fname}</td>
                  <td>{client.lname}</td>
                  <td>{client.email}</td>
                  <td>{client.date_registered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
