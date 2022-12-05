import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './component/navbar/Navbar'
import Login from './component/signin/signin'
import Signup from './component/signup/Signup'
import Footer from './component/footer/Footer'
import Dashboard from './component/dashboard/Dashboard'
import SingleBook from './component/singleBook/SingleBook'
import AddBook from './component/addBook/AddBook';
import PageNotFound from './component/noPageFound/PageNotFound'
import EditBook from './component/editBook/EditBook'
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:bookId" element={<SingleBook />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="editBook/:bookId" element={<EditBook />} />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
