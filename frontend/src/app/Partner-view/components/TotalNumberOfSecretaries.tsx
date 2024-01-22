import Link from "next/link";
import React, { useState, useEffect } from "react";

const TotalNumberOfSecretaries = () => {
  const [totalClients, setTotalClients] = useState(0);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/secretaries/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTotalClients(data.length);
        } else {
          console.error(
            "Error fetching total number of clients:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching total number of clients:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center my-10">
      <h3 className="text-2xl font-semibold mb-3 text-white-800">
        Total Number Of Secretaries
      </h3>
      <div className="p-4 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
        <p className="text-lg text-gray-700">
          Total Secretaries: {totalClients}
        </p>
      </div>
      <button className="bg-white border block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black px-4 py-3 mt-6">
        <Link href="/Partner-view/all-secretaries">View All secretaries</Link>
      </button>
    </div>
  );
};

export default TotalNumberOfSecretaries;
