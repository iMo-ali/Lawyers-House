import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const LongestRunningCase = () => {
    // Placeholder data
    const caseDetails = "Case XYZ - 300 days"; // Fetch from backend

    return (
        <div className="flex flex-col items-center my-10">
            <h3 className="text-2xl font-semibold mb-3 text-whit-800">Longest Running Case</h3>
            <div className="p-4 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                <p className="text-lg text-gray-700">{caseDetails}</p>
            </div>
        </div>
    );
};

export default LongestRunningCase;
