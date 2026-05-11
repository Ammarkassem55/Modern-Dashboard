import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import Layout from "./components/Layout/Layout";

import Dashboard from "./components/pages/Dashboard/Dashboard";
import Users from "./components/pages/Users/Users";
import Products from "./components/pages/Products/Products";
import Orders from "./components/pages/Orders/Orders";
import Settings from "./components/pages/Settings/Settings";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
