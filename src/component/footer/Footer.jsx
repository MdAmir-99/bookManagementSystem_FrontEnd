import React from 'react'
import './footer.css'
const footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="container-fluid footer">Made with Love ❤ By Md Amir &copy; {year}</div>
  )
}

export default footer