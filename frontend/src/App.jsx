import { useEffect } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router'
import { useUser } from './UserContext';
import { useRoom } from './RoomContext';

function App() {
  const { room } = useRoom();
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
  if (room && user) {
    navigate("/voting")
  } else if (room && !user) {
    navigate("/enter-username")
  }
}, [room, user, navigate])



  return (
    <div className="app-container">
      <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>

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