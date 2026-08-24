const API_URL = "https://studies.cs.helsinki.fi/restcountries/api"


export async function getCountryFlag(country){

    const response = await fetch(`${API_URL}/name/${country}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });


    if (!response.ok){
        throw new Error("Failed to find flag")
    }

    const responseJson = await response.json()

    return responseJson.flags.png;

    

}