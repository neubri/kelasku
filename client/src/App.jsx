import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import RegisterPage from "./pages/register";
import Login from "./pages/login";
import PrivateLayout from "./layouts/PrivateLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
