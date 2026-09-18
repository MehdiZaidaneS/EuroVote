import { getPointsGivenByUser } from "./pointsApi"
import { getParticipatingCountries, getRoom } from "./roomApi"

export function compareIndividualResult(results, pointsGiven, user) {
    let score = 0
    let perfect = 0
    let furthest = null
    let closest = null
    let guessedWinner = false
    let guessedLooser = false
    let guessedTop5 = 0
    let guessedBottom5 = 0

    for (let i = 0; i < results.length; i++) {
        const countryId = results[i].country.id
        const realPosition = results[i].position

        for (let k = 0; k < pointsGiven.length; k++) {

            if (pointsGiven[k].country.id === countryId) {

                const guessedPosition = pointsGiven[k].position
                const dif = Math.abs(realPosition - guessedPosition)

                // Total difference from the real result
                score += dif

                // Correct position
                if (dif === 0) {
                    perfect++
                }

                // Furthest guess
                if (furthest === null || dif > furthest.dif) {
                    furthest = {
                        dif: dif,
                        country: pointsGiven[k].country.country_name
                    }
                }

                // Closest guess
                if (closest === null || dif < closest.dif) {
                    closest = {
                        dif: dif,
                        country: pointsGiven[k].country.country_name
                    }
                }

                // Correct winner
                if (guessedPosition === 1 && realPosition === 1) {
                    guessedWinner = true
                }

                // Correct last place
                if (
                    realPosition === results.length &&
                    guessedPosition === pointsGiven.length
                ) {
                    guessedLooser = true
                }


                

                // Correct Top 5 position
                if (
                    guessedPosition <= 5 &&
                    realPosition <= 5
                ) {
                    guessedTop5++
                }

                // Correct Bottom 5 position
                if (
                    guessedPosition > results.length - 5  &&
                    realPosition > results.length - 5
                ) {
                    guessedBottom5++
                }

                break
            }
        }
    }

    const numberOfCountries = results.length

    const maxScore = Math.floor(numberOfCountries ** 2 / 2)

    const scaledScore = Math.round(
        100 - (score / maxScore) * 100
    )

    console.log(numberOfCountries)

    let perfectMessage = ""

    if (perfect === 0) {
        perfectMessage = "Grandma's vision"
    } else if (perfect < 5) {
        perfectMessage = "Not luck at all"
    } else if (perfect < 10) {
        perfectMessage = "Eagle eye"
    } else {
        perfectMessage = "Eurovision psychic"
    }

    let top5Message = ""

    if (guessedTop5 < 2) {
        top5Message = "You know what's good"
    } else if (guessedTop5 < 3) {
        top5Message = "Eyes on elite"
    } else {
        top5Message = "Podium prophet"
    }

    let bot5Message = ""

    if (guessedBottom5 < 2) {
        bot5Message = "Was it that obvious?"
    } else if (guessedBottom5 < 3) {
        bot5Message = "You predicted the disaster"
    } else {
        bot5Message = "Flop detector"
    }





    return {
        user: user.name,
        score: scaledScore,
        furthest: furthest,
        closest: closest,
        perfect: perfect,
        perfectMessage: perfectMessage,
        top5Message: top5Message,
        bot5Message: bot5Message,
        guessedWinner: guessedWinner,
        guessedLooser: guessedLooser,

        guessedTop5: guessedTop5,
        guessedBottom5: guessedBottom5
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