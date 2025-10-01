import React, { useState } from "react";
import view from "../assets/view.png";

import hide from "../assets/hide.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  const handelShow = () => {
    setShow(!show);
  };
  const handelSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);
      setLoading(false);

      // setUserData(res.data)
      navigate("/");
      setFirstName("");
      setLastName("");
      setGender("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-white flex flex-col items-center justify-start px-4">
        {/* Form container */}
        <form className="w-full max-w-md bg-white lg:shadow-xl rounded-lg p-8 space-y-6 ">
          <h2 className="text-3xl font-bold text-center text-[#006699]">
            Create an Account
          </h2>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />
          <div className="w-full  border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699] relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
            />
            <span
              className="absolute right-3 top-3 text-[#006699] font-semibold cursor-pointer  hover:text-[#004b70] transition"
              onClick={handelShow}
            >
              {show ? (
                <img src={view} className="w-5" />
              ) : (
                <img src={hide} className="w-5" />
              )}
            </span>
          </div>
          {error && (
            <p className="text-sm text-center text-red-600 font-semibold">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            onClick={handelSignUp}
            className="w-full py-3 bg-[#006699] text-white font-semibold rounded-full hover:bg-[#004b70] transition"
          >
            Sign Up
          </button>
          <Link to={"/login"}>
            <p className="text-center">
              Already have an account?{" "}
              <span className="text-[#006699] font-bold cursor-pointer  hover:text-[#004b70] transition">
                {" "}
                {loading ? "Loading" : "Sign In"}
              </span>{" "}
            </p>
          </Link>
        </form>
      </div>
    </>
  );
}
