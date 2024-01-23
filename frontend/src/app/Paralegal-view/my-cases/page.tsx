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

    const sortedClients = [...clients].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    setCases(sortedClients);
  };

  return (
    <section className="dashboard-container">
      <div className="overflow-x-auto px-9">
      <table className="table bg-white text-black">
            <thead className="text-black text-xl text-center capitalize">
              <tr>
                <th></th>
                <th
                  onClick={() => handleSort("fname")}
                  style={getSortIndicatorStyle("fname")}>
                  Case name{" "}
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
                  Client name{" "}
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
                  Date started{" "}
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
                  Case status{" "}
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
            {cases.map((caseItem, index) => (
              <tr key={index} className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>{index + 1}</th>
                <td>{caseItem.caseName}</td>
                <td>{caseItem.clientName}</td>
                <td>{caseItem.dateStarted}</td>
                <td>{caseItem.caseStatus}</td>
              </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black
                px-4 py-3 mt-6">
            Add Clients
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Client</h3>
              <p className="py-4">Please Fill The form</p>
              <form
                onSubmit={handleFormSubmit}
                method="dialog"
                className="mt-6"
                encType="application/x-www-form-urlencoded">
                <div>
                  <label className="block text-gray-700">
                    First Name
                    <input
                      type="text"
                      name="fname"
                      placeholder="Enter first Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                  </label>
                  <label className="block text-gray-700">
                    Last Name
                    <input
                      type="text"
                      name="lname"
                      placeholder="Enter last Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </label>
                  <label className="block text-gray-700">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email Address @lawyer.com"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      minLength={4}
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
            focus:bg-white focus:outline-none"
                      required
                    />
                  </label>
                  <label className="block text-gray-700">
                  Client Status
                    <select
                      name="staff_status"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required>
                      <option value="">Select Client Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="TERMINATED">Terminated</option>
                      <option value="ON_LEAVE">On Leave</option>
                    </select>
                  </label>
                </div>
                <div className="text-right mt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Press ESC to cancel
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black px-4 py-3 mt-6">
                  Add Secretary
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </dialog>
      </div>
    </section>
  );
}
