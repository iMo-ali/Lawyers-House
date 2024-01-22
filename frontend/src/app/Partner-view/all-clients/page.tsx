"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/Partner-view/components/Navbar(Partner)";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function AllClients() {
  const authToken = localStorage.getItem("authToken");
  const [clients, setClients] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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
    } catch (error) {}
  };

  useEffect(() => {
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    const { fname, lname, email, password } = formObject;

    // Email validation
    if (!email.endsWith("@client.com")) {
      console.error("Email must end with @client.com");
      return;
    }

    // Name validation
    const isValidName = (name) => /^[A-Za-z]+$/.test(name);
    if (!isValidName(fname) || !isValidName(lname)) {
      console.error("First and last names must only contain letters");
      return;
    }

    // API URL for adding clients
    const apiUrl = "http://localhost:8000/clients/add";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: new URLSearchParams(formObject).toString(),
      });

      if (response.ok) {
        fetchData();
        document.getElementById("my_modal_3").close();
      } else {
        console.error("Error adding client:", response.status);
      }
    } catch (error) {
      console.error("Error adding client:", error.message);
    }
  };

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
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black
                px-4 py-3 mt-6">
            Add Clients
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Clients</h3>
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
                </div>
                <div className="text-right mt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Press ESC to cancel
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black px-4 py-3 mt-6">
                  Add Client
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
    </>
  );
}
