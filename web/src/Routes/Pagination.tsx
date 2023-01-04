import { Route, Routes } from "react-router-dom";
import { ModalDetailsEntrance } from "../components/modals-manager/ModalDetailsEntrance";
import { HomeApp } from "../pages/Home-app";
import { HomeAppEnterprises } from "../pages/Home-app-Enterprises";
import { HomeAppEntrances } from "../pages/Home-app-Entrances";
import { HomeAppExit } from "../pages/Home-app-Exit";
import { HomeAppSupervisors } from "../pages/Home-app-Supervisors";
import { HomeAppTools } from "../pages/Home-app-tools";
import { HomeLogin } from "../pages/Home-login";

export function Pagination() {
  return (
    <Routes>
      <Route path="/" element={ <HomeLogin />} />
      <Route path="/home-app" element={ <HomeApp />} />
      <Route path="/home-app/tools" element={ <HomeAppTools /> } />
      <Route path="/home-app/enterprises" element={ <HomeAppEnterprises /> } />
      <Route path="/home-app/supervisors" element={ <HomeAppSupervisors /> } />
      <Route path="/home-app/entrance" element={ <HomeAppEntrances /> } />
      <Route path="/home-app/entrance/:id" element={ <ModalDetailsEntrance /> } />
      <Route path="/home-app/exit" element={ <HomeAppExit /> } />
    </Routes>
  )
}