
import { useEffect, useState } from 'react'
import './ViewResults.css'
import { getParticipatingCountries } from '../../api/roomApi'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { compareIndividualResult, compareRoomResult } from "../../api/results"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'

function ViewResults() {





  const { room } = useRoom()
  const { user } = useUser()

  const [results, setResults] = useState([])
  const [pointsGiven, setPointsGiven] = useState([])

  const [myResult, setMyResult] = useState({
    score: 0,
    perfect: 0,
    furthest: null,
    closest: null
  })
  const [roomResults, setRoomResults] = useState([])


  useEffect(() => {
    if (room?.year) {
      handleGetCountries()
      handleGetPointsByUser()
    }


  }, [room?.year])

  useEffect(() => {
    if (
      results.length > 0 &&
      pointsGiven.length > 0 &&
      user
    ) {
      setMyResult(compareIndividualResult(results, pointsGiven, user))
      handleCompareRoomResult()
    }
  }, [results, pointsGiven, user])


  const handleGetCountries = async () => {
    try {
      const results_obtained = await getParticipatingCountries(room.year)
      setResults(results_obtained)

    } catch (error) {
      console.error(error)
    }
  }

  const handleGetPointsByUser = async () => {
    try {

      const points_obtained = await getPointsGivenByUser(room.id, user.id)

      setPointsGiven(points_obtained.sort((a, b) => b.points - a.points));

    } catch (error) {
      console.log(error)
    }
  }


  const handleCompareRoomResult = async () => {
    try {
      const room_results = await compareRoomResult(room);
      setRoomResults(room_results)

    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className='view-results-container'>
      <h1>My Reuslts</h1>

      {/* <div className='my-result'>
        <h2>General score = {myResult.score}</h2>
        <h3>Perfect Guess = {myResult.perfect}</h3>
        <h3>Furthest guess = {myResult.furthest?.dif} {myResult.furthest?.country}</h3>
        <h3>Closest guess = {myResult.closest?.dif} {myResult.closest?.country}</h3>
      </div> */}

      <div className='room-results'>
        
        {
          roomResults.map((result) => {
            return (
              <div key={result.user}>
                <h2>General score = {result.score}</h2>
                <h3>Perfect Guess = {result.perfect}</h3>
                <h3>Furthest guess = {result.furthest?.dif} {result.furthest?.country}</h3>
                <h3>Closest guess = {result.closest?.dif} {result.closest?.country}</h3>
              </div>
            )
          })

        }

      </div>


    </div>
  )
}

export default ViewResults
