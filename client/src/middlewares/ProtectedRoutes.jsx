import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if(!isLoggedIn){
    return <Navigate to="/login" replace/>
  }

  return (
    <>
      <Outlet />
    </>
  );
}
