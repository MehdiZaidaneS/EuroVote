
import { useEffect, useState } from 'react'
import './ViewResults.css'
import { getParticipatingCountries, getRoom } from '../../api/roomApi'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { compareIndividualResult, compareRoomResult } from "../../api/results"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import ResultRow from './ResultRow'
import { useNavigate } from 'react-router'

function ViewResults() {

  const [code, setCode] = useState("")
  const { room, setRoom } = useRoom()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [roomResults, setRoomResults] = useState([])


  useEffect(() => {

    handleCompareRoomResult()

  }, [])



  const handleCompareRoomResult = async () => {
    try {
      const room_results = await compareRoomResult(room);
      setRoomResults(room_results)

    } catch (error) {
      console.log(error)
    }
  }




  const handleJoinRoom = async () => {

    if (!code.trim()) {
      setError("Please enter a room code!")
      return
    }

    try {
      setError("")
      const room = await getRoom(code.trim().toUpperCase())
      setRoom(room)

    } catch (error) {
      console.error(error);
      setError("Room not found, try again!")
    }
  }




  return (
    <div className='view-results-container'>
      {
        !room &&
        <div className='join-room-container'>
          <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
          <h2>Room code:</h2>
          <div className='code-selection'>
            <input type='text' value={code} onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJoinRoom()
                }
              }}></input>
            {error && <p className="error-message">{error}</p>}
            <button className='action-button' onClick={handleJoinRoom}>Get Results</button>
          </div>
        </div>
      }
      {
        room &&
        <div>
          <h4 className='code'> Code: <em>{room?.code}</em></h4>
          <h1 className='logo' onClick={() => navigate("/")}>Eurovote</h1>
          {
            roomResults.sort((a, b) => b.score - a.score).map((result) => {
              return (
                <ResultRow key={result.user} index={roomResults.indexOf(result)} result={result} />
              )
            })

          }
          <button className="leave-button" onClick={() => { navigate("/"); setRoom(null);}}> Leave Results</button>
        </div>
      }
    </div>
  )
}

export default ViewResults
