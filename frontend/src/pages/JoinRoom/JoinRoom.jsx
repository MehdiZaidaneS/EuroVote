
import './JoinRoom.css'
import { getRoom } from '../../api/roomApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'

function JoinRoom() {

  const [code, setCode] = useState("")
  const { setRoom } = useRoom()
  const [error, setError] = useState("")
  const navigate = useNavigate()


  const handleJoinRoom = async () => {

    if (!code.trim()) {
      setError("Please enter a room code!")
      return
    }

    try {
      setError("")
      const room = await getRoom(code.trim().toUpperCase())
      setRoom(room)
      navigate("/enter-username")

    } catch (error) {
      console.error(error);
      setError("Room not found, try again!")
    }
  }


  return (
    <div className='join-room-container'>
      <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
      <h2>Enter room code:</h2>
      <div className='code-selection'>
        <input type='text' value={code} onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJoinRoom()
            }
          }}></input>
        {error && <p className="error-message">{error}</p>}
        <button className='action-button' onClick={handleJoinRoom}>Enter code</button>
      </div>
    </div>
  )
}

export default JoinRoom
