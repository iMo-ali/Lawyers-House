"use client";
import Navbar from "../components/Navbar";
import "./User.css";
import { useEffect } from "react";

export default function User() {
  {
    /* This is The Script to handel the class "switch" */
  }
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <title>User Account</title>

      <Navbar />

      <section className="user-container">
        <br />
        <div className="container" id="container">
          <div className="form-container sign-up">
            <form>
              {/*This From is for creating a new account */}
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fa-brands fa-google-plus-g" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-github" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form>
              {/*This From is for login to an existing account */}
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fa-brands fa-google-plus-g" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-github" />
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget Your Password?</a>
              <button>Sign In</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Hello Old Timer! we welcome you back</p>
                <p>Just click bellow to go to the login form</p>
                <button className="dont_show" id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Welcome!</h1>
                <p>
                  New Face!! Register now to get access to the website site
                  features
                </p>
                <br />
                <p>Just click bellow to go to the registration form</p>
                <button className="dont_show" id="register">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
