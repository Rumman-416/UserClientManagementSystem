import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Auth from "./auth/Auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import LayoutIndex from "../layout/Index";

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Auth />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <LayoutIndex />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Index;
