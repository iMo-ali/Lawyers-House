import Navbar from "../components/Navbar";
import "./User.css";
import { useEffect } from "react";

// Importing Icons {Using React}
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";

export default function User() {
  return (
    <>
      <section className="user-container">
        <br />
        <div className="container" id="container">
          <div className="form-container sign-in">
            <form>
              {/*This From is for login to an existing account */}
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <IoLogoGoogleplus />
                </a>
                <a href="#" className="icon">
                  <FaFacebook />
                </a>
                <a href="#" className="icon">
                  <FaGithub />
                </a>
                <a href="#" className="icon">
                  <FaLinkedinIn />
                </a>
              </div>
              <span>or use your email password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="transition ease-in-out delay-150 hover:scale-110 hover:bg-indigo-500 duration-300">
                Sign In
              </button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>Hello, Welcome!</h1>
                <p>
                  Please choose one of the login methods, provided on the left
                </p>
                <a href="#">
                  Forget Your Password?
                  <button className="transition ease-in-out delay-150 hover:scale-110 hover:bg-indigo-500 duration-300">
                    Reset Password
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
