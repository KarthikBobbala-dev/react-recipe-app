const API_URL = "https://dummyjson.com/recipes";

export const getRecipes = async () => {
const response = await fetch(API_URL);

if(!response.ok){
        throw new Error("Failed to fetch recipes");
} return response.json();
}