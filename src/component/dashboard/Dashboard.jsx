import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./dashboard.css";
import Img from "../../assets/portfolio5.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookData, SetBookData] = useState([]);
  const [token, SetToken] = useState("")
  const [userid, SetUserid] = useState("")

  useEffect(() => {
    const isLogin = localStorage.getItem("user");
    if (isLogin == null) {
      navigate("/signin");
    } else {
      const data = JSON.parse(isLogin);
      SetUserid(data._id)
      SetToken(data.token)
      getBookData(data._id, data.token);
    }
  },[bookData.length]);

  console.log(bookData, "2323232323")

  // Get Book Data of userSpecific
  const getBookData = async (loggedinUserId,token) => {
    try {
      const url = `https://bookmanagementfullstack-production.up.railway.app/books?userId=${loggedinUserId}`;
      let resp = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      SetBookData(resp.data.data);
    } catch (err) {
      // SetBookData(err.response.data.message);
    }
  };

  const deleteBookHandle = async (id) => {
    // 
    const url = `https://bookmanagementfullstack-production.up.railway.app/books/${id}`;
    const config = {
      method : "DELETE",
      headers : {
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`
      }
    }

    let resp = await axios(url, config);
    getBookData(userid, token)

    toast.success(resp.data.message, {
      position: toast.POSITION.TOP_CENTER,
    });

  }

  return (
    <div className="dashboard-wrapper">
      <h2 className="heading">Book Records</h2>
      <hr className="hr" />
      <div className="main_container">
        {bookData.length === 0 ? (
        <div className="noBookFound__container">
          <h1 id="no_book_heading">Sorry, No Book Found !</h1>
        </div>
        ) : (
            bookData.map((elem, index) => {
            return [
              <article className="main_item" key={index}>
                <div className="main__item__image">
                  <img src={elem.bookCover} alt="Demo" />
                </div>
                <h3>{elem.title}</h3>
                <p>{(elem.excerpt.length > 50) ? (elem.excerpt.substr(0, 50)+" ...") : (elem.excerpt)}</p>
                <div className="buttons">
                  <NavLink to={`/book/${elem._id}`} className="btn btn-primary">
                    View
                  </NavLink>
                  <NavLink to={`/editBook/${elem._id}`} className="btn btn-primary">
                    Update
                  </NavLink>
                  <NavLink className="btn btn-primary" onClick={() => deleteBookHandle(elem._id)}>
                    Delete
                  </NavLink>
                </div>
              </article>
            ];
          })
          )}
        <Tooltip title="Add New Book">
          <NavLink to="/addBook" id="add_icon_link">
            <AddCircleIcon className="add_icon" fontSize="large" />
          </NavLink>
        </Tooltip>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
