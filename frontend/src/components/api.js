// api.js
export async function fetchMeals(token) {
    const response = await fetch("https://y98m0iaqea.execute-api.ap-southeast-2.amazonaws.com/meals", {
        method: 'GET',
        headers: {
            Authorization: token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch meals");
    }

    return await response.json();
}
