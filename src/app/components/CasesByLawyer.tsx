import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const CasesByLawyer = () => {
    // Placeholder data
    const lawyerCaseCounts = [
        { lawyer: "Lawyer A", casesCompleted: 4 },
        { lawyer: "Lawyer B", casesCompleted: 6 },
        // ... Fetch from backend
    ];

    return (
        <div className="flex flex-col items-center my-10">
            <h3 className="text-2xl font-semibold mb-5">Cases Completed by Lawyer</h3>
            <div className="space-y-3 w-full max-w-md">
                {lawyerCaseCounts.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                        <p className="text-lg font-medium">{item.lawyer}: <span className="text-blue-600">{item.casesCompleted} cases</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CasesByLawyer;
