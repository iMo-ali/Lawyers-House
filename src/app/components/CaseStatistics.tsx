// components/CaseStatistics.tsx
import React from 'react';

const CaseStatistics = () => {
  // Placeholder data
  const casesCreated = 10; // Fetch from backend
  const casesCompleted = 5; // Fetch from backend

  return (
    <div className="case-stats-container">
      <h3>Case Statistics</h3>
      <p>Cases Created: {casesCreated}</p>
      <p>Cases Completed: {casesCompleted}</p>
      {/* Add appropriate styling and logic */}
    </div>
  );
};

export default CaseStatistics;
