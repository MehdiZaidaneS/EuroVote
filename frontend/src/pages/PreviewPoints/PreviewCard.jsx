import React, { useState } from 'react'
import "./PreviewCard.css"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { updatePointstoCountry } from '../../api/pointsApi'

function PreviewCard({ point, position, handleGetPointsByUser, last }) {

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
        <div className={last === position ? `country-points position-last` : `country-points position-${position}`} >
            <p>{position}</p>
            <img src={point.flag} width={20} height={15}></img>
            <p>{point.country.country_name}</p>

            <input
                type='number'
                className="points"
                value={points}
                onChange={(e) => {
                    const value = e.target.value;

                    if (value >= 0 && value <= 10) {
                        setPoints(value);
                    }else if(value=="")(
                        setPoints(0)
                    )
                }}
                onBlur={handleUpdatePoints}
            />
        </div>
    )
}

export default PreviewCard