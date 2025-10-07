import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
