import { useState } from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["NORMAL_USER"]}>
                <UserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/store-owner"
            element={
              <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                <StoreOwnerPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
