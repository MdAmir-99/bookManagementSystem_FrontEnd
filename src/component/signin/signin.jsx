import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  useEffect(() => {
    const isLogin = localStorage.getItem("user");
    if (isLogin) {
      navigate("/dashboard");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const url = "https://bookmanagementfullstack-production.up.railway.app/login";
      const config = {
        method: "POST",
        data: JSON.stringify({email, password}),
        headers: {
          "Content-Type": "application/json",
        },
      };

      let resp = await axios(url, config);
      toast.success(resp.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      localStorage.setItem("user", JSON.stringify(resp.data.data));
      e.target.reset();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="wrapper">
      <main className="container-fluid" id="signup">
        <h2 className="heading">Login</h2>
        <hr className="hr" />
        <form id="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              placeholder="Enter Email..."
              className="inp"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="Enter Password..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <button type="submit" id="submit_btn" >
              LOGIN
            </button>
          </div>

          <div className="form-group alreadyLine">
            <span className="already">
              Need an account ? <NavLink to="/signup">SignUp</NavLink>
            </span>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
