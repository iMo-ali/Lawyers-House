import "./User.css";
import Navbar from "../components/Navbar(ONLYTEST)";
import Image from "next/image";

// Importing Icons {Using React}
import { IoLogoGoogleplus } from "react-icons/io";

export default function User() {
  return (
    <>
      <section>
        <Navbar />
      </section>
      <section className="border-red-500 bg-gradient-to-r from-[#e2e2e2] to-[#8162ff] min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete=""
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-white border w-full block hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg bg-black
                px-4 py-3 mt-6">
                Log in
              </button>
            </form>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <p className="text-sm mt-4 text-[#002D74]">
              you can Login with a google account.
            </p>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <IoLogoGoogleplus />
              <span className="ml-4">Login with Google</span>
            </button>
          </div>
          <div className="w-1/2 md:block hidden ">
            <Image
              src="/Login-IMG.jpg"
              className="rounded-2xl"
              width={500}
              height={500}
              alt="LOGIN page img"
            />
          </div>
        </div>
      </section>
    </>
  );
}
