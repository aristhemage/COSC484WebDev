import { useState } from 'react'
import './App.css'
import {About, CommunityGuidelines, Home, Login, SignUp, Profile} from './pages'
import { BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<MainLayout/>}>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/about" element={<About/>}/>
          <Route path = "/community-guidelines" element={<CommunityGuidelines/>}/>
          <Route path = "/profile" element={<Profile/>}/>
          <Route path="/profile/:username" element={<Profile />} />
          <Route path = "*" element = {<NotFound/>}/>
        </Route>
        
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/sign-up" element={<SignUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
