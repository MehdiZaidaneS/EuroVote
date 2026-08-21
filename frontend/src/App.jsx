import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link } from 'react-router'

function App() {


  return (
  
    <div className="app-container">
      <h1>EuroVote</h1>

      <div className="button-action">
        <Link to="/create-room">
          <button>Create a room</button>
        </Link>

        <Link to="/join-room">
          <button>Join a room</button>
        </Link>

        <Link to="/view-results">
          <button>View Results</button>
        </Link>
      </div>
    </div>
  )
}

export default App
