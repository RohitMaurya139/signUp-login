import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import view from "../assets/view.png";
import hide from "../assets/hide.png";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  //  const [userData, setUserData] = useState(UserData)
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handelShow = () => {
    setShow(!show);
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email: email, password: password },
        { withCredentials: true }
      );

        setLoading(false);
        console.log(res.data)
      // setUserData(res.data)
      navigate("/");
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
            Sign In
          </h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
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
            onClick={handelLogin}
            disabled={loading}
            className="w-full py-3 bg-[#006699] text-white font-semibold rounded-full hover:bg-[#004b70] transition"
          >
            {loading ? "Loading" : " Log In"}
          </button>
          <Link to={"/signup"}>
            <p className="text-center">
              New to Website?{" "}
              <span className="text-[#006699] font-bold cursor-pointer  hover:text-[#004b70] transition">
                {" "}
                Join now
              </span>{" "}
            </p>
          </Link>
      
        </form>
      </div>
    </>
  );
};

export default Login;
