import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateRequest from "./components/CreateRequest"
import RequestCard from "./components/RequestCard";
import RequestDetails from "./pages/RequestDetails"
import UpdateRequest from "./components/UpdateRequest";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
          
        />
        <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/Create-Request"  element={<CreateRequest/>}/>

        <Route path="/my-request"  element={<ProtectedRoute>
            <RequestCard/>
            </ProtectedRoute> }/>
          <Route path="/requests/:id" element={<RequestDetails/>}/>
          <Route path="/update-request/:id" element={<ProtectedRoute>
            <UpdateRequest/>
          </ProtectedRoute>}/>
          <Route path="/AdminDashboard" element={<ProtectedRoute>
            <AdminDashboard/>
          </ProtectedRoute>}/>
     </Routes>
    </BrowserRouter>

    // flow of the app
    // Request Card -> dashoard(single req)
    // auth (signup, login , ..............)


  );
}

export default App;
