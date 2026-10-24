import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { compareIndividualResult } from '../../api/results'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { getParticipatingCountries } from '../../api/roomApi'
import { useNavigate } from 'react-router'
import IndividualResultCard from './IndividualResultCard'
import "./IndividualResult.css"

function IndividualResult() {

    const { room, setRoom } = useRoom()
    const { user, setUser } = useUser()
    const [loading, setLoading] = useState(false)

    const [results, setResults] = useState([])
    const [pointsGiven, setPointsGiven] = useState([])

    const [myResult, setMyResult] = useState({

    })


    useEffect(() => {
        if (!room || !user) {
            navigate("/");
            return;
        }

        handleLoadResults();
    }, [room?.id, room?.year, user?.id]);


    const handleLoadResults = async () => {
        setLoading(true);

        try {
            const [countries, points] = await Promise.all([
                getParticipatingCountries(room.year),
                getPointsGivenByUser(room.id, user.id)
            ]);

            setResults(countries);
            setPointsGiven(points);

            const calculatedResult = compareIndividualResult(
                countries,
                points,
                user
            );

            setMyResult(calculatedResult);

        

        } catch (error) {
            console.error("Error loading results:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();


    return (
        <div>
            <h4 className='code'> Code: <em>{room?.code}</em></h4>
            <h4 className='username'>Welcome, {user?.name}</h4>

            {loading ? (
                <div className="calculating-results">
                    <span className="spinner"></span>
                    <h2>Calculating your results...</h2>
                </div>
            ) : (
            <div className="individual-result">

                {/* Main score */}
                <div className="score-section">
                    <p className="score-label">YOUR EUROVOTE SCORE:</p>
                    <div className="score-circle">
                        <span>{myResult.score}</span>

                    </div>
                </div>


                {/* Guess statistics */}
                <div className="result-grid">

                    <IndividualResultCard
                        icon="🎯"
                        upper={myResult.perfectMessage}
                        lower={`You guessed ${myResult.perfect} positions correctly`}
                    />


                    {myResult.closest?.dif !== 0 && (
                        <IndividualResultCard
                            icon="😬"
                            upper="Ouh, that was close"
                            lower={`You guessed ${myResult.closest?.country} ${myResult.closest?.dif} positions away`}
                        />
                    )}


                    {myResult.furthest?.dif !== 0 && (
                        <IndividualResultCard

                            icon="💩"
                            upper="Sorry, my bad"
                            lower={`You guessed ${myResult.furthest?.country} ${myResult.furthest?.dif} positions away`}
                        />

                    )

                    }

                    {
                        myResult.guessedTop5 !== 0 && (
                            <IndividualResultCard
                                icon="🏆"
                                upper={myResult.top5Message}
                                lower={`You guessed ${myResult.guessedTop5} correct from TOP 5`}
                            />

                        )
                    }

                    {
                        myResult.guessedBottom5 !== 0 && (
                            <IndividualResultCard
                                icon="⬇️"
                                upper={myResult.bot5Message}
                                lower={`You guessed ${myResult.guessedBottom5} correct from LAST 5`}
                            />
                        )
                    }


                    {myResult.guessedWinner && (
                        <IndividualResultCard
                            icon="👑"
                            upper="Winner vibes"
                            lower="You guessed correct the winner!"
                        />
                    )}

                    {myResult.guessedLooser && (
                        <IndividualResultCard
                            icon="💀"
                            upper="Smelled the sh*t"
                            lower="You guessed correct the last place!"
                        />
                    )}

                </div>

            </div>

            )}
            <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
        </div>
    )
}

export default IndividualResult