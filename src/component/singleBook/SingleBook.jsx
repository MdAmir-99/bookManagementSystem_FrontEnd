import React, {useEffect, useState} from 'react'
import {NavLink, useParams, useNavigate} from 'react-router-dom';
import './singleBook.css'
import axios from 'axios';


const SingleBook = () => {
  const [bookData, SetBookData] = useState("");
  const [token, SetToken] = useState("");

  let navigate = useNavigate();
  let param = useParams();
  let bookId = param.bookId;

  useEffect(() => {
    const isLogin = localStorage.getItem("user");
    if(isLogin == null){
      navigate('/signin');
    }
    else{
      let data = JSON.parse(isLogin);
      SetToken(data.token);
      getBookData(bookId)
    }
  },[token])

  console.log(bookData, "GGFDGYDGYDFGyf")

  const getBookData = async (id) => {
      const url = `https://bookmanagementfullstack-production.up.railway.app/books/${id}`;
      const config = {
        method : "GET",
        headers : {
          authorization : `Bearer ${token}`
        }
      }
      let resp = await axios(url, config);
      SetBookData(resp.data.data)
  }

  const date = new Date(bookData.releasedAt).toDateString();
  return (
    <div className="wrapper">
      {<div className="book_container">
        <aside className="bookCover_container">
          <img src={bookData.bookCover} alt="Image" />
        </aside>
        <main className="bookContent_container">
          <h2 className="heading">Book Review</h2>
          <hr className="hr" />
          <div className="content_group">
            <div className="leftSide_content">Book Title</div>
            <div className="rightSide_content">{bookData.title}</div>
          </div>

          <div className="content_group">
            <div className="leftSide_content">Book ISBN</div>
            <div className="rightSide_content">{bookData.ISBN}</div>
          </div>

          <div className="content_group">
            <div className="leftSide_content">Relesed Data</div>
            <div className="rightSide_content">{date}</div>
          </div>

          <div className="content_group">
            <div className="leftSide_content">Book Category</div>
            <div className="rightSide_content">{bookData.category}</div>
          </div>

          <div className="content_group">
            <div className="leftSide_content">Book SubCategory</div>
            <div className="rightSide_content">{bookData.subcategory}</div>
          </div>

          <div className="content_group">
            <div className="leftSide_content">Book Excerpt</div>
            <div className="rightSide_content">{bookData.excerpt}</div>
          </div>
        </main>
      </div>}
      <NavLink to="/dashboard" id="back_btn">Back</NavLink>
    </div>
  )
}

export default SingleBook