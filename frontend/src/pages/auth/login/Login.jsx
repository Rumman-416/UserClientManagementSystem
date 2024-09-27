import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<LuEyeOff />);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<LuEye />);
      setType("text");
    } else {
      setIcon(<LuEyeOff />);
      setType("password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === "admin@mail.com" && password === "admin@123") {
      try {
        const token = `email:${email},password:${password}`;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } catch (err) {
        setError("An error occurred while saving data.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <div className="w-full sm:h-[100vh] h-[90vh]">
        <div className="container mx-auto my-auto h-full after:content-[''] after:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-[url('/Images/registration/login.jpg')] after:bg-cover after:bg-no-repeat after:bg-center before:content-[''] before:block before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-[#00000057] before:z-[10]">
          <div className="flex sm:justify-end justify-center items-center h-full xl:pr-4 sm:pr-5 pr-0">
            <div className="flex flex-col lg:w-[450px] md:w-[400px] sm:w-[350px] w-[350px] p-4 sm:p-8 md:p-10 lg:p-12 rounded-2xl text-white bg-[#afcbff73] relative z-10">
              <h1 className="text-3xl font-semibold text-white mb-6">
                Welcome to KGS
              </h1>
              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-[0.8125rem] font-normal leading-6 text-white"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="Username"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Handle email input
                      className="block w-full rounded outline-0 p-1.5 text-white placeholder:text-gray-100 shadow-sm sm:text-sm sm:leading-6 bg-transparent border-[1px] border-[#05bccd] focus-visible:bg-[#00000039]"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-[0.8125rem] leading-6 text-white font-normal"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={type}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Handle password input
                      placeholder="Password"
                      className="block w-full rounded outline-0 p-1.5 text-white placeholder:text-gray-100 shadow-sm sm:text-sm sm:leading-6 bg-transparent border-[1px] border-[#05bccd] focus-visible:bg-[#00000039]"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleToggle}
                    >
                      {icon}
                    </span>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div>
                  <button className="bg-[#05bccd] hover:bg-[#05bccdc5] transition-[0.6s] text-white w-full p-2 rounded">
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
