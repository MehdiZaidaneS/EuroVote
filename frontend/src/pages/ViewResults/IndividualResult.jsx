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

    const [results, setResults] = useState([])
    const [pointsGiven, setPointsGiven] = useState([])

    const [myResult, setMyResult] = useState({
        
    })


    useEffect(() => {
        if (room?.year) {
            handleGetCountries()
            handleGetPointsByUser()
        }

    }, [room?.year])

    useEffect(() => {
        if (
            results.length > 0 &&
            pointsGiven.length > 0 &&
            user
        ) {
            setMyResult(compareIndividualResult(results, pointsGiven, user))

        }
    }, [results, pointsGiven, user])


    const handleGetCountries = async () => {
        try {
            const results_obtained = await getParticipatingCountries(room.year)
            setResults(results_obtained)

        } catch (error) {
            console.error(error)
        }
    }

    const handleGetPointsByUser = async () => {
        try {
            const points_obtained = await getPointsGivenByUser(room.id, user.id)
            setPointsGiven(points_obtained);
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate();


    return (
        <div>
            <h4 className='code'> Code: <em>{room?.code}</em></h4>
            <h4 className='username'>Welcome, {user?.name}</h4>
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
                        lower={`You guessed ${myResult.perfect} positions right`}
                    />


                    {myResult.closest?.dif !== 0 && (
                        <IndividualResultCard
                            icon="🎯"
                            upper="Ouh, that was close"
                            lower={`You guessed ${myResult.closest?.country} ${myResult.closest?.dif} positions away`}
                        />
                    )}


                    {myResult.furthest?.dif !== 0 && (
                        <IndividualResultCard

                            icon="📉"
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
                                lower={`You guessed ${myResult.guessedTop5}/5 correct in TOP 5`}
                            />

                        )
                    }

                    {
                        myResult.guessedBottom5 !== 0 && (
                            <IndividualResultCard
                                icon="⬇️"
                                upper={myResult.bot5Message}
                                lower={`You guessed ${myResult.guessedBottom5}/5 in LAST 5`}
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
            <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
        </div>
    )
}

export default IndividualResult