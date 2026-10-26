import React, { useEffect, useState } from 'react'
import "./VotingCard.css"
import { getPointsFromCountry, givePointstoCountry, updatePointstoCountry } from '../../api/pointsApi';
import { useRoom } from '../../RoomContext';
import { useUser } from '../../UserContext';

function VotingCard({ result, setSelectedCountry, loadVotingData }) {


    const [pointsGiven, setPointsGiven] = useState(false);
    const [points, setPoints] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(false)
    const { room } = useRoom()
    const { user } = useUser()

    useEffect(() => {

        handleGetPoints()

        const timer = setTimeout(() => {
            setFlipped(true)

            setTimeout(() => {
                setFlipped(false)
            }, 400)
        })

        return () => clearTimeout(timer)

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

        if (loading) return;

        setLoading(true);


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
        } finally {
            setLoading(false);
        }

    }


    const increasePoints = () => {
        setPoints(prev => Math.min(Number(prev) + 1, 10));
    };

    const decreasePoints = () => {
        setPoints(prev => Math.max(Number(prev) - 1, 0));
    };

    return (
        <div className='voting-card-container'>


            <div className='voting-card-info'>
                <h2>{result.country.country_name}</h2>
                <p>Last participation: {result.country.last_participation_pos}°({result.country.last_participation_year})</p>
            </div>


            <div
                className={`flipable-pic ${flipped ? 'flipped' : ''}`}
                onClick={() => setFlipped(!flipped)}
            >
                <div className="flipable-pic-front">

                    <img
                        className="country-flag"
                        src={result.flag}
                        alt={`${result.country.country_name} flag`}
                    />

                    <div className="country-wins">
                        🏆 {result.country.wins}
                    </div>

                    <img
                        className="country-image"
                        src={result.img}
                        alt={`${result.artist} representing ${result.country.country_name}`}
                    />

                    <div className="pic-text">
                        <p className='pic-text-song'>"{result.song}"</p>
                        <p>{result.artist}</p>


                    </div>

                </div>
                <div className='flipable-pic-back'>
                    <p>{result.info}</p>
                </div>
            </div>

            <div className='voting-card-input'>
                <div className='voting-card-input-field'>
                    <p className='voting-card-symbol' onClick={increasePoints} style={{background: "green"}}>+
                    </p>

                    <input min={0} max={10} type='number' value={points}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value >= 0 && value <= 10) {
                                setPoints(value);
                            }
                        }} />

                    <p className='voting-card-symbol' onClick={decreasePoints} style={{background: "red"}}>-</p>
                </div>

                <button
                    className="action-button"
                    onClick={handleGivePoints}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>




            </div>

            <p className='back-button' onClick={() => setSelectedCountry(null)}><em>Back to country selections...</em></p>

        </div>
    )
}

export default VotingCard