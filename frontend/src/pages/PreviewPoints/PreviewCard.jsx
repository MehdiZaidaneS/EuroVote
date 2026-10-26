import React, { useEffect, useState } from 'react'
import "./PreviewCard.css"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { updatePointsPosition, updatePointstoCountry } from '../../api/pointsApi'

function PreviewCard({ point, position, handleGetPointsByUser, pointsGiven, last, onDragStart, onDragOver, onDrop, setUpdating }) {


    useEffect(() => {
        setPoints(point.points)
    }, [point.points])


    const [points, setPoints] = useState(point.points)

    const { room } = useRoom()
    const { user } = useUser()


    const handleUpdatePoints = async () => {

        setUpdating(true)

        try {
            const newPoints = points === "" ? 0 : Number(points);

            if (!Number.isFinite(newPoints) || newPoints < 0 || newPoints > 10) {
                setPoints(point.points);
                return;
            }

            // Don't update if the score hasn't changed
            if (newPoints === Number(point.points)) {
                return;
            }

            // Save the new score
            await updatePointstoCountry(
                room.id,
                user.id,
                point.country.id,
                newPoints
            );

            // Fetch the latest points after saving
            const updatedPoints = await handleGetPointsByUser();

            if (!updatedPoints) return;

            // Sort by score, highest first
            const sortedPoints = [...updatedPoints].sort(
                (a, b) => Number(b.points) - Number(a.points)
            );

            // Update every position to match the sorted ranking
            await Promise.all(
                sortedPoints.map((item, index) =>
                    updatePointsPosition(item.id, index + 1)
                )
            );

            // Refresh the UI with the final positions
            await handleGetPointsByUser();

        } catch (error) {
            console.error("Error updating points:", error);
        }finally{
            setUpdating(false)
        }
    };


    return (
        <div className={last === position ? `country-points position-last` : `country-points position-${position}`} draggable={true} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} >
            <p className="country-position">{position}</p>

            <img src={point.flag} width={20} height={15} alt="" />

            <p className="country-name">
                {point.country.country_name}
            </p>


            <input
                type="number"
                className="points"
                value={points}
                onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                        setPoints("");
                    } else if (Number(value) >= 0 && Number(value) <= 10) {
                        setPoints(value);
                    }
                }}
                onBlur={() => {
                    if (points === "") {
                        setPoints(0);
                    }
                    handleUpdatePoints();
                }}
            />
            <span className="drag-handle" title="Drag to reorder" style={{ cursor: "grab" }}>
                ⠿
            </span>

        </div>
    )
}

export default PreviewCard