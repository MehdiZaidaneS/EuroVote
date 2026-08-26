import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { getPointsGivenByUser } from '../../api/pointsApi'
import "./PreviewPoints.css"
import PreviewCard from './PreviewCard'


function PreviewPoints() {

  const { room } = useRoom()
  const { user } = useUser()

  const [pointsGiven, setPointsGiven] = useState([])


  useEffect(() => {

    handleGetPointsByUser()


  }, [])


  const handleGetPointsByUser = async () => {
    try {

      const points_obtained = await getPointsGivenByUser(room.id, user.id)

      setPointsGiven(points_obtained);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Eurovision {room?.year}: <em>{room?.code}</em></h2>
      <h3>{user?.name}</h3>
      <div className='all-country-points'>
        {

          pointsGiven.sort((a, b) => b.points - a.points).map((point) => {
            return (
              <PreviewCard key={point.id} point={point} position={pointsGiven.indexOf(point) + 1} handleGetPointsByUser={handleGetPointsByUser}/>
            )
          })

        }
      </div>
    </div>
  )
}

export default PreviewPoints