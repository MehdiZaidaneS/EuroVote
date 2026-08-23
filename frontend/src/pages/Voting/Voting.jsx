import React, { useEffect, useState } from 'react'
import { useRoom } from '../../RoomContext'
import { useUser } from '../../UserContext'
import { getParticipatingCountries } from '../../api/roomApi'

function Voting() {
    const { room } = useRoom()
    const { user } = useUser()

    const [results, setResults] = useState(null)

    useEffect(() => {
        if (room?.year) {
            handleGetCountries()
        }
    }, [room?.year])

    const handleGetCountries = async () => {
        try {
            const results_obtained = await getParticipatingCountries(room.year)
            setResults(results_obtained)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>{room?.code}</h2>
            <h3>{user?.name}</h3>

            {results && (
                <div>
                    {results.map((result) => (
                        <p key={result.id}>
                            {result.country.country_name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Voting