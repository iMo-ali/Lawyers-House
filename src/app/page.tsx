"use client";
import Typical from "react-typical";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen py-2">
      <main className="px-8">
        {/* Header */}
        <div className="flex flex-col space-y-8 items-start justify-start">
          <h1 className="font-mono text-7xl font-bold text-yellow-500 tracking-wide">
            Lawyer's House!
          </h1>
          <h3 className="font-mono text-back text-5xl">
            A Website that{" "}
            <strong className="bg-blue-400 text-white">Automate</strong>{" "}
            everything about your Law
            <strong className="bg-yellow-400"> Needs!</strong>
          </h3>
          <div className="font-mono text-5xl flex space-x-3 ">
            <h4> Automate </h4>
            <strong className="bg-yellow-400 px-1">
              <Typical
                steps={[
                  "Client meetings",
                  1020,
                  "Documents Creation",
                  1020,
                  "Documents Submission",
                  1020,
                  "More!!",
                  1020,
                ]}
                wrapper="p"
                loop={Infinity}
              />
            </strong>
          </div>
        </div>
        <br />
        <button className="transition ease-in-out delay-150 hover:scale-110 hover:bg-indigo-500 duration-300 bg-[#e56f8c] text-white text-xs border font-semibold tracking-[0.5px] uppercase cursor-pointer mt-2.5 px-[45px] py-2.5 rounded-lg border-solid border-transparent">
          <a href="/UserAccount">Join Us Now!</a>
        </button>
      </main>
    </div>
  );
}
