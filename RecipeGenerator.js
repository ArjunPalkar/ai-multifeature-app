import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    const createRecipe = async() => {
        if (!ingredients.trim()) return;
        setLoading(true);
        setRecipe("");

        try {
            const response = await fetch(
                `http://localhost:8080/api/recipe?ingredients=${encodeURIComponent(
          ingredients
        )}&dietaryRestrictions=${encodeURIComponent(
          dietaryRestrictions
        )}&cuisine=${encodeURIComponent(cuisine)}`
            );
            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            setRecipe(" Error generating recipe. Check API server.");
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = "tab-page" >
        <
        h2 > 🍳Recipe Generator < /h2>

        <
        div className = "input-group" >
        <
        input type = "text"
        value = { ingredients }
        onChange = {
            (e) => setIngredients(e.target.value) }
        placeholder = "Enter ingredients (comma separated)" /
        >
        <
        input type = "text"
        value = { cuisine }
        onChange = {
            (e) => setCuisine(e.target.value) }
        placeholder = "Cuisine type (e.g., Indian, Italian)" /
        >
        <
        input type = "text"
        value = { dietaryRestrictions }
        onChange = {
            (e) => setDietaryRestrictions(e.target.value) }
        placeholder = "Dietary restrictions (optional)" /
        >
        <
        button onClick = { createRecipe } > Create Recipe < /button> <
        /div>

        <
        div className = "output" > {
            loading ? ( <
                p className = "loading" > Cooking your recipe... < /p>
            ) : ( <
                pre className = "recipe-text" > { recipe } < /pre>
            )
        } <
        /div> <
        /div>
    );
}

export default RecipeGenerator;