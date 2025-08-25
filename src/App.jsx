import React, {useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";

import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LeadForm from './components/LeadForm.jsx'

import { useAuthStore } from "./store/useAuthStore.js";
import LeadGrid from "./components/LeadGrid.jsx";
import LeadFilter from "./components/LeadFilter.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import { useLeadStore } from "./store/useLeadStore.js";

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {selectedLead} = useLeadStore();

  console.log(selectedLead);
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>

      <Routes>
        <Route path="/test" element={<LeadFilter />} />
        <Route path="/" element={authUser ? <LeadGrid /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/create-lead" element={authUser ? <LeadForm pageTittle={"Create New Lead"}/> : <Navigate to="/" />} />
        <Route path="/update-lead" element={authUser ? selectedLead._id? <UpdateForm  /> : <Navigate to="/" />:<Navigate to={'/login'}/>} />
      </Routes>

      <ToastContainer />
    </div>
  );
};
export default App;