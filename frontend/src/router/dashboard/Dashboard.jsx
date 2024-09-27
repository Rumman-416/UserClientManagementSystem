import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const AddUser = lazy(() => import("../../pages/users/AddUser"));
const GetAllUsers = lazy(() => import("../../pages/users/GetAllUsers"));
const EditUser = lazy(() => import("../../pages/users/EditUser"));
const DashboardHome = lazy(() => import("../../pages/dashboard/Index"));
const GetAllClients = lazy(() => import("../../pages/clients/GetAllClients"));
const AddClient = lazy(() => import("../../pages/clients/AddClient"));
const EditClient = lazy(() => import("../../pages/clients/EditClient"));

const Dashboard = () => {
  const routes = [
    {
      path: "/",
      element: <DashboardHome />,
    },
    {
      path: "/users",
      element: <GetAllUsers />,
    },
    {
      path: "/add-user",
      element: <AddUser />,
    },
    {
      path: "/edit-user/:id",
      element: <EditUser />,
    },
    {
      path: "/clients",
      element: <GetAllClients />,
    },
    {
      path: "/add-client",
      element: <AddClient />,
    },
    {
      path: "/edit-client/:id",
      element: <EditClient />,
    },
  ];
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {route.element}
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default Dashboard;
