import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { getPointsGivenByUser } from '../../api/pointsApi'
import "./PreviewPoints.css"
import PreviewCard from './PreviewCard'
import { useNavigate } from 'react-router'
import { getCountryFlag } from '../../api/restCountries'


function PreviewPoints() {

  const { room, setRoom } = useRoom()
  const { user, setUser } = useUser()

  const [pointsGiven, setPointsGiven] = useState([])


  useEffect(() => {

    handleGetPointsByUser()


  }, [])


  const handleGetPointsByUser = async () => {
    try {

      const points_obtained = await getPointsGivenByUser(room.id, user.id)

      const resultsWithFlags = await Promise.all(
        points_obtained.map(async (result) => {
          const flag = await getCountryFlag(result.country.country_name)

          return {
            ...result,
            flag
          }
        })
      )

      setPointsGiven(resultsWithFlags);

    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  return (
    <div className='preview-points'>
      <h4 className='code'> Code: <em>{room?.code}</em></h4>
      <h4 className='username'>Welcome, {user?.name}</h4>
      <div className='all-country-points'>
        {

          pointsGiven.sort((a, b) => b.points - a.points).map((point) => {
            return (
              <PreviewCard key={point.id} point={point} position={pointsGiven.indexOf(point) + 1} handleGetPointsByUser={handleGetPointsByUser} last={pointsGiven.length}/>
            )
          })

        }
      </div>
      <button className='action-button submit'  onClick={() => navigate("/view-results")}>Submit</button>

      <p className='back-button' onClick={() => navigate("/voting")}><em>Back to country selections...</em></p>

      <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
    </div>
  )
}

export default PreviewPoints