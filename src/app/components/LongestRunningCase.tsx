// components/LongestRunningCase.tsx
import React from 'react';

const LongestRunningCase = () => {
  // Placeholder data
  const caseDetails = "Case XYZ - 300 days"; // Fetch from backend

  return (
    <div className="longest-case-container">
      <h3>Longest Running Case</h3>
      <p>{caseDetails}</p>
      {/* Add appropriate styling and logic */}
    </div>
  );
};

export default LongestRunningCase;
