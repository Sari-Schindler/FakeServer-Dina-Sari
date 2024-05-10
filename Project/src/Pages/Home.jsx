import React, { useEffect,  useContext } from "react";
import { useNavigate, Outlet, NavLink} from "react-router-dom";
import style from './Home.module.css'
import { UserContext } from "../App";

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser]);

  const logOut = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (<>
    {currentUser && <>
      <h1>Welcome {currentUser.name}</h1>
      <p className={style.allBtns}>
        <NavLink className={style.btn} to="info">Info</NavLink><br />
        <NavLink className={style.btn} to="todos">ToDos</NavLink><br />
        <NavLink className={style.btn} to="albums">Albums</NavLink><br />
        <NavLink className={style.btn} to="posts">Posts</NavLink><br />
        <NavLink className={style.btn} onClick={() => logOut()}>LogOut</NavLink><br />
      </p></>}
    <Outlet />
  </>)
} export default Home;

