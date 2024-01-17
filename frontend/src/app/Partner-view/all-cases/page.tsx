import Navbar from "@/app/Partner-view/components/Navbar(Partner)";
import React from "react";

export default function MyCase() {
  return (
    <>
      <section>
        <Navbar />
      </section>
      <section className="dashboard-container">
        <div className="overflow-x-auto px-9">
          <table className="table bg-white text-black">
            {/* head */}
            <thead className="text-black text-xl text-center capitalize">
              <tr>
                <th></th>
                <th>Case name</th>
                <th>client name</th>
                <th>date started</th>
                <th>case status</th>
                <th>lawyer's name</th>
              </tr>
            </thead>
            <tbody>
              {/* 1st row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>1</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
              {/* 2nd row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>2</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
              {/* 3rd row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>3</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
              {/* 4th row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>4</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
              {/* 5th row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>5</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
              {/* 6th row */}
              <tr className="transition ease-in-out delay-60 hover:bg-indigo-500 duration-300">
                <th>6</th>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
                <td>
                  This is a test until understanding how to import the data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
