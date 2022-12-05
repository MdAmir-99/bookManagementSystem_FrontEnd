import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [error, SetError] = useState("")
  const [userData, SetUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
  });

  // Handle Title from Select Options
  const [title, SetTitle] = useState("");

  const handleTitle = (e) => {
      e.preventDefault();
      SetTitle(e.target.value);
  }

  // Handle inputs State
  let name, value;

  const handleInputs = (e) => {
    e.preventDefault()
   name= e.target.name
   value = e.target.value
   SetUserData ({...userData, [name] : value, title : title });
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const url = "https://bookmanagementfullstack-production.up.railway.app/register"
      const config = {
        method : "POST",
        data : JSON.stringify(userData),
        headers : {
          "Content-Type" : "application/json"
        } 
      }

      let resp = await axios(url, config);
        toast.success(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })

        e.target.reset();
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
    }
    catch(err){
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  };

  return (
    <div className="wrapper">
      <main className="container-fluid" id="signup">
        <h2 className="heading">SignUp</h2>
        <hr className="hr" />
        <form
          id="form"
          method="POST"
          onSubmit={submitHandler}
        >
          <div className="form-group">
            <select name="title" id="" value={title} onChange={handleTitle}>
            <option >Choose Your title</option>
              <option value={"Mr"}>Mr</option>
              <option value={"Mrs"}>Mrs</option>
              <option value={"Miss"}>Miss</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputs}
              placeholder="Enter Name..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="phone"
              value={userData.phone}
              onChange={handleInputs}
              placeholder="Enter Mobile No..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="Enter Email..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputs}
              placeholder="Enter Password..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="cpassword"
              value={userData.cpassword}
              onChange={handleInputs}
              placeholder="Confirm Password..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <textarea
              type="text"
              rows="6"
              name="address"
              value={userData.address}
              onChange={handleInputs}
              placeholder="Enter Address..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <button type="submit" id="submit_btn">
              SIGNUP
            </button>
          </div>
          <div className="form-group alreadyLine">
            <span className="already">Already have an account ? <NavLink to="/signin">Login</NavLink></span>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Signup;
