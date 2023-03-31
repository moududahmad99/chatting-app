import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Login";

export default function LoggedIn () {
    const user = useSelector((users) => users.loginSlice.login)
    return user ? <Outlet /> : <Login />
}