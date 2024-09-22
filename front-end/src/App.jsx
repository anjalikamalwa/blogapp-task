import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Hero from './pages/Hero';
import BlogDetails from './pages/blogdetails';
import UpdateBlog from './pages/updateblog';
import Navbar from './pages/Navbar';

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/blogs/:id" element={<BlogDetails />} /> 
        <Route path="/blogs1/:id" element={<UpdateBlog/>}/>
      </Routes>

    </div>
  );
};

export default App;