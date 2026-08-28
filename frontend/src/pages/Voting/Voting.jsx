import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import "./Voting.css"
import { getParticipatingCountries } from '../../api/roomApi'
import { getPointsGivenByUser } from '../../api/pointsApi'
import { getCountryFlag } from '../../api/restCountries'
import VotingCard from './VotingCard'
import { useNavigate } from 'react-router'

function Voting() {
    const { room, setRoom } = useRoom()
    const { user, setUser } = useUser()

    const navigate = useNavigate();

    const [results, setResults] = useState(null)


    const [pointsGiven, setPointsGiven] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (room?.year && room?.id && user?.id) {
            loadVotingData()
        }
    }, [room?.year, room?.id, user?.id])


    const loadVotingData = async () => {
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

            setResults(resultsWithFlags)
            setPointsGiven(points)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h4 className='code'> Code: <em>{room.code}</em></h4>
            <h4 className='username'>Welcome, {user?.name}</h4>

            {
                results && <h3>
                    {pointsGiven.length === results.length
                        ? "You are ready to submit your votes!"
                        : `You have voted for ${pointsGiven.length}/${results.length} countries`
                    }
                </h3>
            }



            {results && !selectedCountry && (
                <>
                    <div className='participating-countries'>
                        {results.map((result) => {
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

                                    <p>{result.country.country_name}</p>
                                </div>
                            )
                        })}
                    </div>

                    {
                        pointsGiven.length === results.length &&
                        <div>
                            <button className='action-button' onClick={() => navigate("/preview")}>Continue</button>
                        </div>
                    }
                    
                </>

            )}

            {
                selectedCountry && (
                    <VotingCard result={selectedCountry} setSelectedCountry={setSelectedCountry} loadVotingData={loadVotingData} />
                )
            }
            <button className="leave-button" onClick={() => { navigate("/"); setRoom(null); setUser(null) }}> Leave Room</button>

        </div>
    )
}

export default Voting