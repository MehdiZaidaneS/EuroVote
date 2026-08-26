import React, { useState } from 'react'
import "./PreviewCard.css"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { updatePointstoCountry } from '../../api/pointsApi'

function PreviewCard({ point, position, handleGetPointsByUser }) {

    const [points, setPoints] = useState(point.points)

    const { room } = useRoom()
    const { user } = useUser()

    const handleUpdatePoints = async () => {
        try {
            await updatePointstoCountry(
                room.id,
                user.id,
                point.country.id,
                points
            )

            handleGetPointsByUser()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='country-points'>
            <p>{position}</p>
            <p>{point.country.country_name}</p>

            <input
                type='number'
                className="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                onBlur={handleUpdatePoints}
            />
        </div>
    )
}

export default PreviewCard