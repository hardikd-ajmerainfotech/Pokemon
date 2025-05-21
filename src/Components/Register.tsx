import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if(userName && password && email){
    try {
      const response = await axios.post(
        "https://localhost:7258/api/authenticate/register",
        {
          username: userName,
          email: email,
          password: password,
        },
        {
              headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
              },
            }
      );
      if (response.status === 200) {
        toast.success("Register Successful!", {
          autoClose: 2000,
          pauseOnHover: false,
          toastId: "toast-success"
        });
        navigate(`/login`);
      }
    } catch (error) {
      toast.error("Register Failed", {
        autoClose: 2000,
        pauseOnHover: false,
        toastId: "toast-error"
      });
    }
  }else{
    toast.error("fill required field.", {
      autoClose: 2000,
      pauseOnHover: false,
      toastId: "toast-error",
    });
  }
  };
  return (
    <>
      <div style={{ justifyContent: "center" }}>
        <nav
          className="bg-dark navbar-dark navbar" // These classes are now themed by src/theme.css
          style={{ marginTop: "200px", justifyContent: "center" }}
        >
          <div className="row col-12 d-flex justify-content-center text-white"> {/* text-white is themed */}
            <h3 data-testid="registration">Registration</h3>
          </div>
        </nav>
        <div
          className="form" // We can add a class like 'themed-card' if we define it in theme.css
          style={{
            backgroundColor: "var(--card-bg-alt)", // Use CSS variable for the alternate card background
            boxShadow: "var(--card-box-shadow)", // Use CSS variable
            borderRadius: "5px",
            width: "550px",
            margin: "20px auto",
            padding: "20px",
          }}
        >
          <div
            className="form-body"
            style={{ textAlign: "left", padding: "20px 10px" }}
          >
            <div className="username">
              <label
                className="form__label" // Style this class globally or ensure text color is inherited
                htmlFor="firstName"
                data-testid="firstnamelabel"
                style={{ width: "40%", padding: "5px", color: "var(--text-color)" }} // Added text color
              >
                First Name
              </label>
              <input
                className="form__input" // This class is styled in theme.css
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                style={{ width: "60%" }} // Layout style, can remain
              />
            </div>
            <div className="email">
              <label
                className="form__label" // Style this class globally or ensure text color is inherited
                htmlFor="email"
                style={{ width: "40%", padding: "5px", color: "var(--text-color)" }} // Added text color
                data-testid="emaillabel"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form__input" // This class is styled in theme.css
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ width: "60%" }} // Layout style, can remain
              />
            </div>
            <div className="password">
              <label
                className="form__label" // Style this class globally or ensure text color is inherited
                htmlFor="password"
                style={{ width: "40%", padding: "5px", color: "var(--text-color)" }} // Added text color
                data-testid="passwordlabel"
              >
                Password
              </label>
              <input
                className="form__input" // Corrected typo from form_input and styled in theme.css
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ width: "60%" }} // Layout style, can remain
              />
            </div>
          </div>
          <div
            className="footer"
            style={{
              display: "flex",
              paddingLeft: "40%",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <button
              className="btn"
              type="submit"
              onClick={register}
              data-testid="Register-button"
              style={{ paddingLeft: "10px" }}
            >
              Register
            </button>
            <NavLink to="/login">
              <button className="btn" type="submit" data-testid="Login-button">
                login
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
