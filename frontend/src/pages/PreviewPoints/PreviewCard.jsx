import React, { useEffect, useState } from 'react'
import "./PreviewCard.css"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { updatePointsPosition, updatePointstoCountry } from '../../api/pointsApi'

function PreviewCard({ point, position, handleGetPointsByUser, pointsGiven, last, onDragStart, onDragOver, onDrop }) {


    useEffect(() => {
        setPoints(point.points)
    }, [point.points])


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

            const updatedPoints = await handleGetPointsByUser()

            const sortedPoints = [...updatedPoints]
                .sort((a, b) => b.points - a.points)

            const oldPosition = point.position

            const newPosition = sortedPoints.findIndex(
                p => p.id === point.id
            ) + 1

            const start = Math.min(oldPosition, newPosition)
            const end = Math.max(oldPosition, newPosition)

            const affectedPoints = sortedPoints.filter(
                p => p.position >= start && p.position <= end
            )

            await Promise.all(
                affectedPoints.map((point) => {
                    const newPosition = sortedPoints.findIndex(
                        p => p.id === point.id
                    ) + 1

                    return updatePointsPosition(point.id, newPosition)
                })
            )

            await handleGetPointsByUser()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={last === position ? `country-points position-last` : `country-points position-${position}`} draggable={true} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} >
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
                    } else if (value == "") (
                        setPoints(0)
                    )
                }}
                onBlur={handleUpdatePoints}
            />
        </div>
    )
}

export default PreviewCard