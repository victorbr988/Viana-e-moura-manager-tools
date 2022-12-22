import { Route, Routes } from "react-router-dom";
import { HomeApp } from "../pages/Home-app";
import { HomeLogin } from "../pages/Home-login";

export function Pagination() {

  return (
    <Routes>
      <Route path="/" element={ <HomeLogin />} />
      <Route path="/home-app" element={ <HomeApp />} />
    </Routes>
  )
}