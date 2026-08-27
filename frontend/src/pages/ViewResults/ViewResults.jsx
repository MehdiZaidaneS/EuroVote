
import { useEffect, useState } from 'react'
import './ViewResults.css'
import { getParticipatingCountries } from '../../api/roomApi'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'

function ViewResults() {


  const [generalScore, setGeneralScore] = useState(0)
  const [perfectGuess, setPerfectGuess] = useState(0)
  const [furthestGuess, setFurthestGuess] = useState(null)
  const [closestGuess, setClosestGuess] = useState(null)


  const { room } = useRoom()
  const { user } = useUser()

  const [results, setResults] = useState([])
  const [pointsGiven, setPointsGiven] = useState([])


  useEffect(() => {
    if (room?.year) {
      handleGetCountries()
      handleGetPointsByUser()
    }
  

  }, [room?.year])

  useEffect(() => {
  if (results && pointsGiven.length > 0) {
    compareResult()
  }
}, [results, pointsGiven])


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


  const compareResult = () => {
    let score = 0
    let perfect = 0
    let furthest = null
    let closest = null

    for (let i = 0; i < results.length; i++) {
      const countryId = results[i].country.id
      const realPosition = results[i].position

      for (let k = 0; k < pointsGiven.length; k++) {
        if (pointsGiven[k].country.id === countryId) {

          const guessedPosition = k + 1
          const dif = Math.abs(realPosition - guessedPosition)

          score += dif

          if (dif === 0) {
            perfect++
          }

          if (furthest === null || dif > furthest.dif) {
            furthest = {
              dif: dif,
              country: pointsGiven[k].country.country_name
            }
          }

          if (closest === null || dif < closest.dif) {
            closest = {
              dif: dif,
              country: pointsGiven[k].country.country_name
            }
          }

          break
        }
      }
    }

    setGeneralScore(score)
    setPerfectGuess(perfect)
    setFurthestGuess(furthest)
    setClosestGuess(closest)
  }


  return (
    <div className='view-results-container'>
      <h1>My Reuslts</h1>
     
        <div>
          <h2>General score = {generalScore}</h2>
          <h3>Perfect Guess = {perfectGuess}</h3>
          <h3>Furthest guess = {furthestGuess?.dif} {furthestGuess?.country}</h3>
          <h3>Closest guess = {closestGuess?.dif} {closestGuess?.country}</h3>
        </div>
      

    </div>
  )
}

export default ViewResults
