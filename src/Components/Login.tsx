import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if(userName && password){
    try {
      const response = await axios.post(
        "https://localhost:7258/api/authenticate/login",
        { username: userName, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status === 200) {
        toast.success("Login SuccessFully", {
          toastId: "toast-success",
          autoClose: 2000,
          pauseOnHover: false,
        });
        navigate(`/player`);
      }
      // const validatetoken = response?.data?.token;
      // localStorage.setItem("token", JSON.stringify(validatetoken));
    } catch (error) {
      // console.error(error, "error");
      toast.error("Login Failed", {
        toastId: "toast-error",
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
  }else{
    toast.error("fill required fields.", {
      toastId: "toast-error",
      autoClose: 2000,
      pauseOnHover: false,
    });
  }
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <nav
        className="bg-dark navbar-dark navbar" // These classes are now themed by src/theme.css
        style={{ marginTop: "200px" }}
      >
        <div className="row col-12 d-flex justify-content-center text-white"> {/* text-white is themed */}
          <h3 data-testid="login">Login</h3>
        </div>
      </nav>
      <div
        className="form" // We can add a class like 'themed-card' if we define it in theme.css
        style={{
          backgroundColor: "var(--card-bg)", // Use CSS variable
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
          <div className="username" data-testid="first name">
            <label
              className="form__label" // Style this class globally or ensure text color is inherited
              htmlFor="firstName"
              style={{ width: "40%", padding: "5px", color: "var(--text-color)" }} // Added text color
              data-testid="firstnamelabel"
            >
              First Name
            </label>
            <input
              className="form__input" // This class is styled in theme.css for dark mode
              type="text"
              // value="Name"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              // Inline styles for inputs are removed if covered by .form__input in theme.css
            />
          </div>
          <div className="password" data-testid="password">
            <label
              className="form__label" // Style this class globally or ensure text color is inherited
              htmlFor="password"
              style={{ width: "40%", padding: "5px", color: "var(--text-color)" }} // Added text color
              data-testid="passwordlabel"
            >
              Password{" "}
            </label>
            <input
              className="form__input" // This class is styled in theme.css for dark mode
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              // Inline styles for inputs are removed if covered by .form__input in theme.css
            />
          </div>
        </div>
        <div className="footer" style={{ textAlign: "center" }}>
          <button
            className="btn" // This class is styled in theme.css for dark mode
            data-testid="Login-button"
            type="submit"
            onClick={login}
            // Inline style for button color/bg removed, rely on .btn styles from theme.css
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
