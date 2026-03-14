import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />


      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
      

        {/* Catches broken links INSIDE dashboard (e.g. /dashboard/test) */}
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
};

export default App;
