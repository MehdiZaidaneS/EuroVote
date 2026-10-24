import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import "./Voting.css"
import { getParticipatingCountries } from '../../api/roomApi'
import { getPointsGivenByUser, updatePointsPosition } from '../../api/pointsApi'
import { getCountryFlag } from '../../api/restCountries'
import VotingCard from './VotingCard'
import { useNavigate } from 'react-router'

function Voting() {
    const { room, setRoom } = useRoom()
    const { user, setUser } = useUser()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (!room || !user) {
            navigate("/");
            return;
        }

        if (user.submitted === "True") {
            navigate("/result");
        }
    }, [room, user, navigate]);


    const [results, setResults] = useState(null)


    const [pointsGiven, setPointsGiven] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (room?.year && room?.id && user?.id) {
            loadVotingData()
        }
    }, [room?.year, room?.id, user?.id])


    const loadVotingData = async () => {

        if (loading) return;

        setLoading(true);

        try {
            const countries = await getParticipatingCountries(room.year)

            const resultsWithFlags = await Promise.all(
                countries.map(async (result) => {
                    const flag = await getCountryFlag(result.country.country_name)

                    return {
                        ...result,
                        flag
                    }
                })
            )

            const points = await getPointsGivenByUser(room.id, user.id)

            //await new Promise(resolve => setTimeout(resolve, 10000));

            setResults(resultsWithFlags)
            setPointsGiven(points)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }

    }



    const givePosition = async () => {

        if (loading) return;

        setLoading(true);

        try {
            const sortedPoints = [...pointsGiven]
                .sort((a, b) => b.points - a.points)


            await Promise.all(
                sortedPoints.map((point, index) => {
                    if (point.position === null) {
                        updatePointsPosition(point.id, index + 1)

                    }

                }

                )
            )
            navigate("/preview")

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }



    }






    return (
        <div>
            <h4 className='code'> Code: <em>{room?.code}</em></h4>
            <h4 className='username'>Welcome, {user?.name}</h4>

            {loading && !selectedCountry &&(
                <div className="voting-loading">
                    <span className="spinner"></span>
                </div>
            )}


            {!loading && results && !selectedCountry && (
                <>
                    <h3>
                        {pointsGiven.length === results.length
                            ? "You are ready to submit your votes!"
                            : `You have voted for ${pointsGiven.length}/${results.length} countries`
                        }
                    </h3>
                    <div className='participating-countries'>
                        {results.sort((a, b) => a.country.country_name.localeCompare(b.country.country_name)).map((result) => {
                            const hasReceivedPoints = pointsGiven.some(
                                (point) => point.country.id === result.country.id
                            )

                            return (
                                <div
                                    key={result.id}
                                    onClick={() => setSelectedCountry(result)}
                                    className={hasReceivedPoints ? "country-voted" : "country-not-voted"}
                                >
                                    <img
                                        src={result.flag}
                                        alt={`${result.country.country_name} flag`}
                                        width="50" height="30"
                                    />

                                    <p className='country-name'>{result.country.country_name}</p>
                                </div>
                            )
                        })}
                    </div>

                    {
                        pointsGiven.length === results.length &&
                        <div>
                            <button
                                className="action-button"
                                onClick={() => givePosition()}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                    </>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </div>


                    }

                </>

            )}

            {
                    selectedCountry && (
                    <VotingCard result={selectedCountry} setSelectedCountry={setSelectedCountry} loadVotingData={loadVotingData} />
                )
            }
            <button className="leave-button" onClick={() => { setRoom(null); setUser(null); navigate("/"); }}> Leave Room</button>

        </div>
    )
}

export default Voting