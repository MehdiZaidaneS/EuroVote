import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreateRoom from './pages/CreateRoom/CreateRoom.jsx'
import JoinRoom from './pages/JoinRoom/JoinRoom.jsx'
import ViewResults from './pages/ViewResults/ViewResults.jsx'

const root = document.getElementById('root')



createRoot(root).render(
  
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path='/join-room' element={<JoinRoom />} />
        <Route path='/view-results' element={<ViewResults />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)