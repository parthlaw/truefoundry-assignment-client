import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRepo, searchRepo } from "../api";
import { ContextProvider } from "../context";
import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {
  const { auth, user, setAuth } = useContext(ContextProvider);
  const [repo, setRepo] = useState({} as any);
  const [search, setSearch] = useState("");
  const [clickFlag, setClickFlag] = useState(false);
  const debouncedValue = useDebounce<string>(search, 500);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    console.log(debouncedValue);
    const getRepo = async () => {
      const data = await searchRepo(debouncedValue);
      setRepo(data);
    };
    getRepo();
  }, [debouncedValue]);
  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onCreate = async () => {
    try {
      if (!clickFlag) {
        setClickFlag(true);
        const data = await createRepo(search, false);
        setRepo(data);
      }
      setClickFlag(false);
    } catch (e) {
      console.log(e);
      setClickFlag(false);
    }
  };
  const onLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  }
  return (
    <div>
      <div className="header">
        <div className="right">
        <img src={user.profile_pic} alt="" />
        <span>{user.name}</span></div>
        <button onClick={onLogout} className="logout">Logout</button>
      </div>
      <div className="container">
        <div className="dashboard">
          <div className="input-box open">
            <input type="text" placeholder="Search..." onChange={onSearch} />
          </div>
          {repo.name ? (
            <div className="list">
              <div className="list-item">
                <a href={repo.url} target="__blank">
                  {repo.full_name}
                </a>
              </div>
            </div>
          ) : (
            <button className="button" onClick={onCreate}>
              Create Repository
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
