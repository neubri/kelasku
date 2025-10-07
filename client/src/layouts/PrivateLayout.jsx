import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
