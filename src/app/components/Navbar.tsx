import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
  return (
    <section className="navbar">
      <div className="flex-1">
        <Image src={"/Logo.png"} width={60} height={60} alt="Lawyer House" />
        <Link href={"/"} className="btn btn-ghost text-xl">
          Lawyer House
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-8">
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
