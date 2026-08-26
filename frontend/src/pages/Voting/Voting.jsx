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
    const { room } = useRoom()
    const { user } = useUser()

    const navigate = useNavigate();

    const [results, setResults] = useState(null)


    const [pointsGiven, setPointsGiven] = useState([])
    const [selectedCountry, setSelectedCountry] = useState();

    useEffect(() => {
        if (room?.year) {
            handleGetCountries()
            handleGetPointsByUser()
        }

    }, [room?.year])


    const handleGetCountries = async () => {
        try {
            const results_obtained = await getParticipatingCountries(room.year)

            const resultsWithFlags = await Promise.all(
                results_obtained.map(async (result) => {
                    const flag = await getCountryFlag(result.country.country_name)

                    return {
                        ...result,
                        flag: flag
                    }
                })
            )

            setResults(resultsWithFlags)

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

    return (
        <div>
            <h2>Eurovision {room?.year}: <em>{room?.code}</em></h2>
            <h3>{user?.name}</h3>

            {results && !selectedCountry && (
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
                                    width="50"
                                />

                                <p>{result.country.country_name}</p>
                            </div>
                        )
                    })}
                </div>

            )}
            {results && !selectedCountry && (
                <div>
                    <button onClick={()=> navigate("/preview")}>Submit</button>
                </div>
            )

            }

            {
                selectedCountry && (
                    <VotingCard result={selectedCountry} setSelectedCountry={setSelectedCountry} handleGetPointsByUser={handleGetPointsByUser}/>
                )
            }


        </div>
    )
}

export default Voting