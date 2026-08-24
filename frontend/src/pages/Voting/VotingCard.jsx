import React, { useEffect, useState } from 'react'
import "./VotingCard.css"
import { getPointsFromCountry, givePointstoCountry } from '../../api/pointsApi';
import { useRoom } from '../../RoomContext';
import { useUser } from '../../UserContext';

function VotingCard({result, setSelectedCountry}) {

    const [points, setPoints] = useState();
    const { room } = useRoom()
    const { user } = useUser()

    useEffect(() => {
           
        handleGetPoints()
    
        }, [])
    

    const handleGetPoints = async ()=>{
        try {
            const points = await getPointsFromCountry(room.id, user.id, result.country.id)
            setPoints(points)
            
        } catch (error) {
            console.log(points)
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
            <input type='number' value={points} onChange={(e) => setPoints(e.target.value)}></input>
            <button onClick={()=> setSelectedCountry()}>Submit</button>
        </div>
    )
}

export default VotingCard