import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../api";
import { ContextProvider } from "../context";
import useQuery from "../hooks/useQuery";

const OAuthRedirect = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const {setUser,setAuth}=useContext(ContextProvider)
  useEffect(() => {
    console.log(query);
    async function redirect() {
      const code = query.get("code");
      const data = await login(code as string);
      if (data && data.token) {
        setUser(data.user);
        setAuth(true)
        localStorage.setItem("token", data.token);
        navigate("/");
      }
      navigate("/login");
    }
    redirect();
  }, []);
  return <div>LOADING</div>;
};

export default OAuthRedirect;
