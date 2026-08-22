const API_URL = "http://127.0.0.1:8000";

export async function createRoom(name) {
    const response = await fetch(`${API_URL}/rooms/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    return await response.json();
}


export async function getRoom(code) {
    const response = await fetch(`${API_URL}/rooms/${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    return await response.json();
}

export async function joinRoom(code, name) {
  
    const response1 = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });

    if (!response1.ok) {
        throw new Error("Failed to create user");
    }

    const user = await response1.json();

    
    const response2 = await fetch(`${API_URL}/rooms/${code}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            player_id: user.id,
        }),
    });

    if (!response2.ok) {
        throw new Error("Failed to join room");
    }

    return await user;
}