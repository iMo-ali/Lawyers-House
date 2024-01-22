import Link from "next/link";
import React, { useState, useEffect } from "react";

const TotalNumberOfLawyers = () => {
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [lawyerTypesCount, setLawyerTypesCount] = useState({});
  const authToken = localStorage.getItem("authToken");

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
          setTotalLawyers(data.length);

          // Calculate the count of each type of lawyer
          const typesCount = data.reduce((acc, lawyer) => {
            acc[lawyer.lawyer_type] = (acc[lawyer.lawyer_type] || 0) + 1;
            return acc;
          }, {});

          setLawyerTypesCount(typesCount);
        } else {
          console.error(
            "Error fetching total number of lawyers:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching total number of lawyers:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center my-10">
      <h3 className="text-2xl font-semibold mb-3 text-white-800">
        Total Number Of Lawyers
      </h3>
      <div className="p-4 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
        <p className="text-lg text-gray-700">Total Lawyers: {totalLawyers}</p>

        {/* Display count of each type of lawyer */}
        <div className="mt-4">
          <p className="text-lg text-gray-700 font-semibold">Lawyer Types:</p>
          <ul>
            {Object.entries(lawyerTypesCount).map(([type, count]) => (
              <li
                key={type}
                className="text-gray-700">{`${type}: ${count}`}</li>
            ))}
          </ul>
        </div>
      </div>
      <Link href="/Partner-view/all-lawyers">
        <button className="bg-white border block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black px-4 py-3 mt-6">
          View All Lawyers
        </button>
      </Link>
    </div>
  );
};

export default TotalNumberOfLawyers;
