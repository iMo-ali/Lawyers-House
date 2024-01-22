"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components_Partner/Navbar(Partner)";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function AllLawyers() {
  const authToken = localStorage.getItem("authToken");
  const [lawyers, setLawyers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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

    // Sort the lawyers based on the selected criteria and order
    const sortedLawyers = [...lawyers].sort((a, b) => {
      if (criteria === "name") {
        const nameA = `${a.fname} ${a.lname}`;
        const nameB = `${b.fname} ${b.lname}`;
        return newSortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        return newSortOrder === "asc"
          ? a[criteria].localeCompare(b[criteria])
          : b[criteria].localeCompare(a[criteria]);
      }
    });
    setLawyers(sortedLawyers);
  };

  const getSortIndicatorStyle = (criteria) => {
    return {
      backgroundColor: criteria === sortCriteria ? "#f2f2f2" : "transparent",
      cursor: "pointer",
    };
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    const { fname, lname, email, lawyer_type, staff_status } = formObject;

    if (!email.endsWith("@lawyer.com")) {
      console.error("Email must end with @lawyer.com");
      return;
    }

    const isValidName = (name: string) => /^[A-Za-z]+$/.test(name);

    if (!isValidName(fname) || !isValidName(lname)) {
      console.error("First and last names must only contain letters");
      return;
    }

    const urlSearchParams = new URLSearchParams(formObject);

    try {
      const response = await fetch("http://localhost:8000/lawyers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: urlSearchParams.toString(),
      });

      if (response.ok) {
        fetchData();
        document.getElementById("my_modal_3").close();
      } else {
        console.error("Error adding lawyer:", response.status);
      }
    } catch (error) {
      console.error("Error adding lawyer:", error.message);
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
                  onClick={() => handleSort("name")}
                  style={getSortIndicatorStyle("name")}>
                  Name{" "}
                  {sortCriteria === "name" &&
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
                  onClick={() => handleSort("lawyer_type")}
                  style={getSortIndicatorStyle("lawyer_type")}>
                  Lawyer Type{" "}
                  {sortCriteria === "lawyer_type" &&
                    (sortOrder === "asc" ? (
                      <AiOutlineArrowUp size={12} />
                    ) : (
                      <AiOutlineArrowDown size={12} />
                    ))}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  style={getSortIndicatorStyle("status")}>
                  Status{" "}
                  {sortCriteria === "status" &&
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
              {lawyers.map((lawyer, index) => (
                <tr
                  key={index}
                  className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                  <th>{index + 1}</th>
                  <td>{`${lawyer.fname} ${lawyer.lname}`}</td>
                  <td>{lawyer.email}</td>
                  <td>{lawyer.lawyer_type}</td>
                  <td>{lawyer.status}</td>
                  <td>{lawyer.date_registered}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black
                px-4 py-3 mt-6">
            Add Lawyer
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Lawyer</h3>
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
                    Lawyer Type
                    <select
                      name="lawyer_type"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required>
                      <option value="">Select Lawyer Type</option>
                      <option value="PARALEGAL">Paralegal</option>
                      <option value="PARTNER">Partner</option>
                    </select>
                  </label>
                  <label className="block text-gray-700">
                    Lawyer Status
                    <select
                      name="staff_status"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      required>
                      <option value="">Select Lawyer Status</option>
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
                  Add Lawyer
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
