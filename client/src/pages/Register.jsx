import { File } from "lucide-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import http from "../lib/http";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await http({
        method: "POST",
        url: "/register",
        data: {
          name: name,
          email: email,
          password: password,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account created succesfully",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-200 mb-4">
              <span className="text-2xl">
                <File className="w-8 h-8 text-orange-600" />
              </span>
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-2">
              Join Kelasku
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent outline-none transition-all duration-200 shadow-2xl"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent outline-none transition-all duration-200 shadow-2xl"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent outline-none transition-all duration-200 shadow-2xl"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
            >
              Sign Up
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600 font-light">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
