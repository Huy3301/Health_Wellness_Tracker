export async function fetchMeals(token) {
    try {
        const response = await fetch("https://y98m0iaqea.execute-api.ap-southeast-2.amazonaws.com/meals", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'same-origin'
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
