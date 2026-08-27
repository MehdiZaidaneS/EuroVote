import { getPointsGivenByUser } from "./pointsApi"
import { getParticipatingCountries, getRoom } from "./roomApi"

export function compareIndividualResult(results, pointsGiven, user) {
    let score = 0
    let perfect = 0
    let furthest = null
    let closest = null

    for (let i = 0; i < results.length; i++) {
        const countryId = results[i].country.id
        const realPosition = results[i].position

        for (let k = 0; k < pointsGiven.length; k++) {
            if (pointsGiven[k].country.id === countryId) {

                const guessedPosition = k + 1
                const dif = Math.abs(realPosition - guessedPosition)

                score += dif

                if (dif === 0) {
                    perfect++
                }

                if (furthest === null || dif > furthest.dif) {
                    furthest = {
                        dif: dif,
                        country: pointsGiven[k].country.country_name
                    }
                }

                if (closest === null || dif < closest.dif) {
                    closest = {
                        dif: dif,
                        country: pointsGiven[k].country.country_name
                    }
                }

                break
            }
        }


    }


    return {
        user: user.name,
        score: score,
        perfect: perfect,
        furthest: furthest,
        closest: closest
    }
}


export const compareRoomResult = async (room) => {

    const roomResults = []

    

    try {
        const roomUpdated = await getRoom(room.code)
        const results = await getParticipatingCountries(roomUpdated.year)
        

        for (const player of roomUpdated.players) {

            const pointsGiven = await getPointsGivenByUser(
                roomUpdated.id,
                player.id
            )

            const sortedPoints = pointsGiven.sort(
                (a, b) => b.points - a.points
            )

            const result = compareIndividualResult(
                results,
                sortedPoints,
                player
            )

            roomResults.push(result)
        }

    } catch (error) {
        console.error(error)
    }

    
    return roomResults
}