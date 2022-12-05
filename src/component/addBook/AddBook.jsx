import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import "./addBook.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddBook = () => {
  const navigate = useNavigate();
  const [bookImage, SetBookImage] = useState([]);
  const [bookData, SetBookData] = useState({
    title: "",
    releasedAt: "",
    ISBN: "",
    category: "",
    subcategory: "",
    excerpt: "",
  });

  const [loggedinUserId, SetLogedinUserId] = useState("");
  const [token, SetToken] = useState("");

  useEffect(() => {
    const isLogin = localStorage.getItem('user');
    if(isLogin == null){
      navigate('/signin')
    }
    else{
      let data = JSON.parse(isLogin);
      SetLogedinUserId(data._id);
      SetToken(data.token)
    }
  },[])

  let name, value;

  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    SetBookData({ ...bookData, [name]: value });
  };

  const handleImage = (e) => {
    SetBookImage({bookImage : e.target.files[0]});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("bookCover", bookImage.bookImage)
    formData.append("releasedAt", bookData.releasedAt)
    formData.append("ISBN", bookData.ISBN)
    formData.append("category", bookData.category)
    formData.append("subcategory", bookData.subcategory)
    formData.append("excerpt", bookData.excerpt)
    formData.append("userId", loggedinUserId)

    const url = "https://bookmanagementfullstack-production.up.railway.app/books";
    const config = {
      method : "POST",
      data : formData,
      headers : {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
      }
    }

    try{
      let resp = await axios(url, config);
      toast.success(resp.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.warn(resp.data)
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000)
    }
    catch(err){
      console.log(err.response)
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  };

  return (
    <div className="wrapper">
      <main className="container-fluid" id="signup">
        <h2 className="heading">Add Book</h2>
        <hr className="hr" />
        <form
          encType="multipart/form-data"
          id="form"
        >
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleInputs}
              placeholder="Enter Book Title..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              name="bookCover"
              value={bookImage.name}
              onChange={handleImage}
              className="inp"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="releasedAt"
              value={bookData.releasedAt}
              onChange={handleInputs}
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="ISBN"
              value={bookData.ISBN}
              onChange={handleInputs}
              placeholder="Enter Book ISBN..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="category"
              value={bookData.category}
              onChange={handleInputs}
              placeholder="Enter Book Category..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subcategory"
              value={bookData.subcategory}
              onChange={handleInputs}
              placeholder="Enter Book SubCategory..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <textarea
              type="text"
              rows="6"
              name="excerpt"
              value={bookData.excerpt}
              onChange={handleInputs}
              placeholder="Enter Book Excerpt..."
              className="inp"
            />
          </div>

          <div className="form-group">
            <button type="submit" id="submit_btn" onClick={submitHandler}>
              ADD BOOK
            </button>
          </div>
        </form>
      </main>
      <NavLink to="/dashboard" id="back_btn">Back</NavLink>
      <ToastContainer />
    </div>
    
  );
};

export default AddBook;
