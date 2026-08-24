import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import "./Voting.css"
import { getParticipatingCountries } from '../../api/roomApi'
import { getCountryFlag } from '../../api/restCountries'
import VotingCard from './VotingCard'

function Voting() {
    const { room } = useRoom()
    const { user } = useUser()

    const [results, setResults] = useState(null)

    const [selectedCountry, setSelectedCountry] = useState();

    useEffect(() => {
        if (room?.year) {
            handleGetCountries()
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

    return (
        <div>
            <h2>Eurovision {room?.year}: <em>{room?.code}</em></h2>
            <h3>{user?.name}</h3>

            {results && !selectedCountry && (
                <div className='participating-countries'>
                    {results.map((result) => (
                        <div key={result.id} onClick={() => setSelectedCountry(result)}>
                            <img
                                src={result.flag}
                                alt={`${result.country.country_name} flag`}
                                width="50"
                            />

                            <p>{result.country.country_name}</p>
                        </div>
                    ))}
                </div>

            )}
            {results && !selectedCountry && (
                <div>
                    <button>Submit</button>
                </div>
            )

            }

            {
                selectedCountry && (
                    <VotingCard result={selectedCountry} setSelectedCountry={setSelectedCountry} />
                )
            }


        </div>
    )
}

export default Voting