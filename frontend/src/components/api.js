export async function fetchMeals(token = null) {
    const headers = {};

    // Include token only if it exists (logged-in users)
    if (token) {
        headers.Authorization = token;
    }

    try {
        const response = await fetch("https://y98m0iaqea.execute-api.ap-southeast-2.amazonaws.com/meals", {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch meals");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error;
    }
}
