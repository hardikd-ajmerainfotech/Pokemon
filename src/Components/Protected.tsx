import { Outlet, Navigate } from "react-router-dom";
import React from "react";

function Protected(props: any) {
  const tokenexistornot = localStorage.getItem("token");
  // console.log(tokenexistornot, "token");

  // console.log("protecter")
  return tokenexistornot ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
