import Image from "next/image";
import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

import { useState } from "react";

export default function Navbar() {
  return (
    <section className="fixed top-0 navbar bg-gray-200 ">
      <div className="dropdown flex-none">
        {/* We are using daisyui so taking advantage of the "Dropdown" class we can make a very neat dropdown menu */}
        <div tabIndex={0} role="button" className="btn m-1">
          <FaBars size="29" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 bg-gray-400 z-50">
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Home Page
            </Link>
            {/* Link can take a className directly dont use <a> tag */}
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              My Cases
            </Link>
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              All Cases
            </Link>
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Lawyers Page
            </Link>
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Secretary Page,
            </Link>
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Client Page
            </Link>
          </li>
          <li>
            <Link
              href="/home"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Document Creation Page
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <Image src={"/Logo.png"} width={60} height={60} alt="Lawyer House" />
          Lawyer's House
        </Link>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-8">
              <FaRegUser size="2xl" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 bg-gray-400">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href={"/UserAccount"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
