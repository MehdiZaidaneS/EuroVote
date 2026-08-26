
const API_URL = "http://127.0.0.1:8000/points"

export async function getPointsFromCountry(room_id, player_id, country_id){

    const response = await fetch(`${API_URL}/${room_id}/${player_id}/${country_id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });


    if (!response.ok){
        throw new Error("Failed to get points from specific country")
    }

    const responseJson = await response.json()

    return responseJson.points;
}


export async function givePointstoCountry(room_id, player_id, country_id, points){

    const response = await fetch(`${API_URL}/${room_id}/${player_id}/${country_id}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                points: Number(points)
            })
    });


    if (!response.ok){
        throw new Error("Failed to give points")
    }

    const responseJson = await response.json()

    return responseJson;
}

export async function updatePointstoCountry(room_id, player_id, country_id, points){

    const response = await fetch(`${API_URL}/${room_id}/${player_id}/${country_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                points: Number(points)
            })
    });


    if (!response.ok){
        throw new Error("Failed to update points")
    }

    const responseJson = await response.json()

    return responseJson;
}



export async function getPointsGivenByUser(room_id, player_id){

    const response = await fetch(`${API_URL}/${room_id}/${player_id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok){
        throw new Error("Failed getting users points")
    }

    const responseJson = await response.json()

    return responseJson
}