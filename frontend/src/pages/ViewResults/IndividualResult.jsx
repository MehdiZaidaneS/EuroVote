import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { compareIndividualResult } from '../../api/results'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { getParticipatingCountries, getRoom } from '../../api/roomApi'
import { useNavigate } from 'react-router'
import IndividualResultCard from './IndividualResultCard'
import "./IndividualResult.css"
import { getUsername } from '../../api/user'

function IndividualResult() {

    const { room, setRoom } = useRoom()
    const { user, setUser } = useUser()
    const [loading, setLoading] = useState(false)
    const [year, setYear] = useState()
    const [code, setCode] = useState("")

    const [results, setResults] = useState([])
    const [pointsGiven, setPointsGiven] = useState([])
    const [username, setUsername] = useState("")

    const [myResult, setMyResult] = useState({

    })

    const navigate = useNavigate();




    useEffect(() => {
        if (!room || !user) {
            navigate("/");
            return;
        }

        if (user.submitted === "False") {
            navigate("/voting");
            return;
        }

        const loadResults = async () => {
            setLoading(true);

            try {
                // 1. Fetch room information first
                const roomResponse = await getRoom(room);

                const roomYear = roomResponse.year;
                const roomCode = roomResponse.code;

                // Prevent API calls with an undefined year
                if (!roomYear) {
                    throw new Error("Room year is undefined");
                }

                // 2. Fetch all required data
                const [countries, points, playerName] =
                    await Promise.all([
                        getParticipatingCountries(roomYear),
                        getPointsGivenByUser(room, user.id),
                        getUsername(user.id)
                    ]);

                // 3. Update React states
                setYear(roomYear);
                setCode(roomCode);
                setUsername(playerName);

                setResults(countries);
                setPointsGiven(points);

                // 4. Calculate the individual result
                const calculatedResult = compareIndividualResult(
                    countries,
                    points,
                    playerName
                );

                setMyResult(calculatedResult);

            } catch (error) {
                console.error("Error loading results:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResults();

    }, [room, user?.id, user?.submitted, navigate]);

    return (
        <div>
            <h4 className='code'> Code: <em>{code}</em></h4>
            <h4 className='username'>Welcome, {username}</h4>

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

                        {myResult.guessedWinner && (
                            <IndividualResultCard
                                icon="👑"
                                upper="Winner detector"
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


                        {
                            myResult.guessedTop5 !== 0 && (
                                <IndividualResultCard
                                    icon="🏆"
                                    upper={myResult.top5Message}
                                    lower={`You guessed ${myResult.guessedTop5} ${myResult.guessedTop5 === 1 ? "country" : "countries"} from TOP 5`}
                                />

                            )
                        }

                        {
                            myResult.guessedBottom5 !== 0 && (
                                <IndividualResultCard
                                    icon="⬇️"
                                    upper={myResult.bot5Message}
                                    lower={`You guessed ${myResult.guessedBottom5} ${myResult.guessedBottom5 === 1 ? "country" : "countries"} from LAST 5`}
                                />
                            )
                        }

                        <IndividualResultCard
                            icon="🎯"
                            upper={myResult.perfectMessage}
                            lower={`You guessed ${myResult.perfect} ${myResult.perfect === 1 ? "position" : "positions"} correctly`}
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
                                upper="Ups, my bad"
                                lower={`You guessed ${myResult.furthest?.country} ${myResult.furthest?.dif} positions away`}
                            />

                        )

                        }






                    </div>

                </div>

            )}
            <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>
        </div>
    )
}

export default IndividualResult