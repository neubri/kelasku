import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
