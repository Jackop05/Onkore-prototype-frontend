import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 



const Login = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // Reset password logic
  const resetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please provide your email");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }
  
    const userData = { email };
  
    try {
      const response = await fetch(`${apiUrl}/api/user/create-reset-password-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      console.log(result + " || " + response.ok)
      if (!response.ok) {
        setError(result.error || "Something went wrong...");
        return;
      }

    } catch (error) {
      console.log("An unexpected error occurred: ", error);
    }
  };
  

  // Handle login function
  const onSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const userData = { email, password };
    
    try {
      const response = await fetch(`${apiUrl}/api/user/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (!response.ok) {
        setEmail("");
        setPassword("");
        setError(result.error || "Something went wrong...");
        return;
      }

      alert(result.message);
      navigate("/user/logged-user");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50 px-4 relative">
      
      {/* Home link */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-neonblue text-3xl p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all"
          title="Go to Home"
        >
          <FaHome />
        </button>
      </div>

      {/* Login card */}
      <div className="w-full max-w-[90%] sm:max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col justify-between px-6 sm:px-8 pt-6 pb-10 cursor-default">
        
        {/* Title */}
        <div className="titles text-[40px] sm:text-[50px] text-center mb-6 font-bold text-neonblue drop-shadow-lg">
          {"Zaloguj".split("").map((letter, i) => (
            <span key={i} className="hover:text-neongreen transition-all duration-100">
              {letter}
            </span>
          ))}
        </div>

        {/* Form */}
        <form className="w-full" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="TwójEmail@email.pl"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
              Hasło:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ustaw hasło..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>

          {/* Wrong email or password error */}
          {error && <p className="text-red-500 text-lg font-bold mb-4">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="w-full text-white py-2 mt-4 mb-4 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105">
            <div className="drop-shadow-md text-xl">Zaloguj</div>
          </button>
        </form>

        {/* Reset password link */}
        <div onClick={(e) => {resetPassword(e)}} className="text-sm text-center text-blue-500 underline mt-2">Reset password for given email</div>
      </div>
    </div>
  );
};

export default Login;
