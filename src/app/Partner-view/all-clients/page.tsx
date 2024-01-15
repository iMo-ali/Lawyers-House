import Navbar from "@/app/components/Navbar(Partner)";
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
                <th>Number of cases raised</th>
                <th>Number of cases solved</th>
                <th>email</th>
                <th>phone number</th>
                <th>date registered</th>
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
