import './App.css'
import { Link } from 'react-router'

function App() {
  return (
    <div className="app-container">
      <h1>Eurovote</h1>

      <p>
        <em>Challenge to see who knows the most about Eurovision</em>
      </p>

      <div className="button-action">
        <Link className="action-button" to="/create-room">
          Create Room
        </Link>

        <Link className="action-button" to="/join-room">
          Join Room
        </Link>

        <Link className="action-button" to="/view-results">
          Check Results
        </Link>
      </div>


      <footer>
        <p>© 2026 Penta · EuroVote</p>
      </footer>

    </div>
  )
}

export default App