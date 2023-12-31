'use client'
import React from 'react';
import Link from 'next/link';
import Navbar from '../app/components/Navbar';
// Import additional components
import FoldableMenu from '../app/components/FoldableMenu';
import LinePlot from '../app/components/LinePlot';
import LongestCasesTable from '../app/components/LongestCase';
import Calendar from '../app/components/Calendar';
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex">
        
        <FoldableMenu />
        <div className="flex-grow">
          <LinePlot />
          <LongestCasesTable />
        </div>
        <Calendar />
      </div>
    </>
  );
}
