import React from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

const CaseStatistics = () => {
  // Placeholder data
  const casesCreated = 10; // Fetch from backend
  const casesCompleted = 5; // Fetch from backend

  return (
    <div className="flex flex-col items-center my-10">
      <h3 className="text-2xl font-semibold mb-5 text-white-800">
        Case Statistics
      </h3>
      <div className="space-y-3 w-full max-w-sm">
        <div className="p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300">
          <p className="text-lg font-medium text-gray-700">
            Cases Created: <span className="text-blue-600">{casesCreated}</span>
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300">
          <p className="text-lg font-medium text-gray-700">
            Cases Completed:{" "}
            <span className="text-green-600">{casesCompleted}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStatistics;
