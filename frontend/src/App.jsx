import { useState } from 'react'
import './App.css'
import {About, CommunityGuidelines, Home, Login, SignUp, Profile} from './pages'
import { BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<MainLayout/>}>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/about" element={<About/>}/>
          <Route path = "/community-guidelines" element={<CommunityGuidelines/>}/>
          <Route path = "/profile" element={<Profile/>}/>
        </Route>
        
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/sign-up" element={<SignUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
