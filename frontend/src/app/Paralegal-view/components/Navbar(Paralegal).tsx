import Image from "next/image";
import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

export default function Navbar() {
  return (
    <section className="fixed top-0 navbar bg-gradient-to-r from-[#e2e2e2] to-[#8162ff]">
      <div className="dropdown flex-none">
        {/* We are using daisyui so taking advantage of the "Dropdown" class we can make a very neat dropdown menu */}
        <button
          tabIndex={0}
          role="button"
          className="btn hover:bg-[#e56f8c] py-2.5 rounded-lg border-solid border-transparent">
          <FaBars size="29" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 bg-gray-400 z-50">
          <li>
            <Link
              href="/Paralegal-view"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Home Page
            </Link>
          </li>

          <li>
            <Link
              href="/Paralegal-view/my-cases"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              My Cases
            </Link>
          </li>

          <li>
            <Link
              href="/Paralegal-view/all-secretaries"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Secretary Page
            </Link>
          </li>

          <li>
            <Link
              href="/Paralegal-view/all-clients"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Client Page
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 text-[#e56f8c] capitalize tracking-normal text-4xl font-black">
        <Link
          href={"/Paralegal-view"}
          className="flex items-center btn-ghost text-xl">
          <Image src={"/Logo.png"} width={60} height={60} alt="Lawyer House" />
          lawyer's house
        </Link>
      </div>

      <div className="dropdown dropdown-end flex-none">
        {/* We are using daisyui so taking advantage of the "Dropdown" class we can make a very neat dropdown menu */}
        <div
          tabIndex={0}
          role="button"
          className="btn hover:bg-[#e56f8c] py-2.5 rounded-lg border-solid border-transparent">
          <FaRegUser size="29" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 bg-gray-400 z-50">

          <li>
            <Link
              href="/UserAccount"
              className="block py-2 px-4 text-gray-800 rounded hover:bg-blue-500 hover:text-white">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
