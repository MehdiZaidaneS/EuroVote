
import './JoinRoom.css'
import { getRoom } from '../../api/roomApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useRoom } from '../../RoomContext'

function JoinRoom() {

  const [code, setCode] = useState("")
  const { setRoom } = useRoom()
  const navigate = useNavigate()


  const handleJoinRoom = async () => {
    try {
      const room = await getRoom(code)
      setRoom(room)
      navigate("/enter-username")

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='join-room-container'>
      <h1>JOIN ROOM</h1>
      <div className='code-selection'>
        <input type='textarea' value={code} onChange={(e) => setCode(e.target.value)}></input>
        <button onClick={handleJoinRoom}>Enter code</button>
      </div>
    </div>
  )
}

export default JoinRoom
