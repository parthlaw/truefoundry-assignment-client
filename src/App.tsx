import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import OAuthRedirect from "./components/Redirect";
import Dashboard from "./components/Dashboard";
import { getUser } from "./api";
import { ContextProvider } from "./context";

function App() {
  const {setAuth,setUser}=useContext(ContextProvider)
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      setAuth(false)
    }
    const authenticate=async()=>{
      const data= await getUser();
      if(!data){
        setAuth(false)
      }else{
        setUser(data)
        setAuth(true)
      }
    }
    authenticate();
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<OAuthRedirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
