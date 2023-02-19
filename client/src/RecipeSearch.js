import Recipe from "./Recipe";
import React, { useState, useEffect } from "react";
import "./App.css";

const Form = () => {
  const APP_ID = "5de39993";
  const APP_KEY = "e9ea68aa381f308697b567385ff3868e";
  const [checked, setChecked] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  //Fetch request
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <div className="recipe-search">
        <form onSubmit={getSearch}>
          <input
            className="ingredient-input"
            type="search"
            placeholder="Chicken, peppers, etc..."
            onChange={updateSearch}
          />

          <br></br>
          <div className="input-item">
            <label for="vegetarianRecipes">
              Vegetarian
              <input
                type="checkbox"
                id="vegetarianRecipes"
                name="filterRecipe"
                value="vegetarian"
                checked={checked}
                onChange={handleCheck}
              />
            </label>
            <br></br>
            <p>Is "My Value" checked? {checked.toString()}</p>
          </div>
          <button className="submit" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
export default Form;
