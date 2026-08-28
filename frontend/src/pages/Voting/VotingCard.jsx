import React, { useEffect, useState } from 'react'
import "./VotingCard.css"
import { getPointsFromCountry, givePointstoCountry, updatePointstoCountry } from '../../api/pointsApi';
import { useRoom } from '../../RoomContext';
import { useUser } from '../../UserContext';

function VotingCard({ result, setSelectedCountry, loadVotingData }) {


    const [pointsGiven, setPointsGiven] = useState(false);
    const [points, setPoints] = useState(0);
    const { room } = useRoom()
    const { user } = useUser()

    useEffect(() => {

        handleGetPoints()

    }, [])


    const handleGetPoints = async () => {
        try {
            const points = await getPointsFromCountry(room.id, user.id, result.country.id)
            setPoints(points)
            if (points == null) {
                setPointsGiven(false);
            } else {
                setPointsGiven(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleGivePoints = async () => {
        try {
            if (!pointsGiven) {
                await givePointstoCountry(room.id, user.id, result.country.id, points)
            } else {
                await updatePointstoCountry(room.id, user.id, result.country.id, points)
            }

            await loadVotingData()
            setSelectedCountry(null)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='voting-card-container'>
            <img
                src={result.flag}
                alt={`${result.country.country_name} flag`}
                width="200"
            />

            <p>{result.country.country_name}</p>
            <p>Points: <em>{points}</em></p>
            <input type='number' value={points} onChange={(e) => setPoints((e.target.value))}></input>
            <button onClick={() => handleGivePoints()}>Submit</button>
        </div>
    )
}

export default VotingCard