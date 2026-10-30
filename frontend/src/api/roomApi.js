const API_URL = import.meta.env.VITE_API_URL;

export async function createRoom(year) {
    const response = await fetch(`${API_URL}/rooms/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            year
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    const responseJson =  await response.json();

    return responseJson.id
}


export async function getRoom(id) {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get room");
    }

    return await response.json();
}

export async function joinRoom(id, name) {

    const response1 = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });

    if (response1.status === 409) {
        throw new Error("USERNAME_EXISTS");
    }

    if (!response1.ok) {
        throw new Error("CREATE_USER_FAILED");
    }

    const user = await response1.json();


    const response2 = await fetch(`${API_URL}/rooms/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            player_id: user.id,
        }),
    });

    if(response2.status === 409){
        throw new Error("PLAYER_EXISTS")
    }

    if (!response2.ok) {
        throw new Error("JOIN_ROOM_FAILED");
    }

    return await user.id;
}

export async function getParticipatingCountries(year) {

    const response = await fetch(`${API_URL}/results/year/${year}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });

    if (!response.ok) {
        throw new Error("Failed to join room")
    }

    return await response.json();

}


export async function getRoomWithCode(code){
    const response = await fetch(`${API_URL}/rooms/code/${code}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    })

    if (!response.ok){
        throw new Error("Failed to get room by code")
    }

    return await response.json();
}