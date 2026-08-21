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


export async function joinRoom(code){
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