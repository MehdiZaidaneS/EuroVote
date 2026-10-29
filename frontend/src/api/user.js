const API_URL = import.meta.env.VITE_API_URL;
export async function getUsername(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get username");
    }

    const responseJson = await response.json();
    
    return responseJson.name
}