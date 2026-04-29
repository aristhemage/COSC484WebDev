import { useState } from 'react'
import './App.css'
import {About, CommunityGuidelines, Home, Login, SignUp, Profile} from './pages'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <h1>Hello</h1>
    </BrowserRouter>
  )
}

export default App
