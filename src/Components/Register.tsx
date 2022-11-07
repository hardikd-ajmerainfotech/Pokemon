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
          className="bg-dark navbar-dark navbar"
          style={{ marginTop: "200px", justifyContent: "center" }}
        >
          <div className="row col-12 d-flex justify-content-center text-white">
            <h3 data-testid="registration">Registration</h3>
          </div>
        </nav>
        <div
          className="form"
          style={{
            backgroundColor: "rgb(205 205 205)",
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
                className="form__label"
                htmlFor="firstName"
                data-testid="firstnamelabel"
                style={{ width: "40%", padding: "5px" }}
              >
                First Name
              </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                style={{ width: "60%" }}
              />
            </div>
            <div className="email">
              <label
                className="form__label"
                htmlFor="email"
                style={{ width: "40%", padding: "5px" }}
                data-testid="emaillabel"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ width: "60%" }}
              />
            </div>
            <div className="password">
              <label
                className="form__label"
                htmlFor="password"
                style={{ width: "40%", padding: "5px" }}
                data-testid="passwordlabel"
              >
                Password
              </label>
              <input
                className="form_input"
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ width: "60%" }}
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
