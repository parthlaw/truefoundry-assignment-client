import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../context";

const Login = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const { auth } = useContext(ContextProvider);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("login");
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <a href="https://github.com/login/oauth/authorize?scope=user,email,repo&client_id=5a81ff4e75a0d7a3900d">
          <button>Login With Github</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
