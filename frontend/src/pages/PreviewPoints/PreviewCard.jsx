import React, { useEffect, useState } from 'react'
import "./PreviewCard.css"
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { updatePointsPosition, updatePointstoCountry } from '../../api/pointsApi'

function PreviewCard({ point, position, setPointsGiven, pointsGiven, last, onDragStart, onDragOver, onDrop, onDragEnd }) {


    useEffect(() => {
        setPoints(point.points)
    }, [point.points])


    const [points, setPoints] = useState(point.points)

    const handleUpdatePoints = (cardId, points) => {
        const newPoints = pointsGiven.map(point =>
            point.id === cardId
                ? { ...point, points: points }
                : point
        );

        newPoints.sort((a, b) => b.points - a.points);

        setPointsGiven(newPoints);
    };

    return (
        <div className={last === position ? `country-points position-last` : `country-points position-${position}`} draggable={true} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} onDragEnd={onDragEnd} >
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
                    handleUpdatePoints(point.id, points);
                }}
            />
            <span className="drag-handle" title="Drag to reorder" style={{ cursor: "grab" }}>
                ⠿
            </span>

        </div>
    )
}

export default PreviewCard