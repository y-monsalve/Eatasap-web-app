import Recipe from "./Recipe";
import React, { useState, useEffect } from "react";
import "./App.css";

const Form = () => {
  const APP_ID = "5de39993";
  const APP_KEY = "e9ea68aa381f308697b567385ff3868e";
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [checked, setChecked] = useState(false);
  //  const [health, setHealth] = useState ("") for using a radius

  useEffect(() => {
    getRecipes();
  }, [query, checked]);
  //no array of dependencies if you want to search the filtered recipes after clicking on search
  //add setSearch in getSearch to look for filtered recipes

  //Fetch request
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${
        checked ? "&health=vegetarian" : ""
      }`
      // ${checked ?"&health=vegan":""} for using a radius
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
          <div className="flex-container">
            <div className="checkbox">
              <label for="vegetarianRecipes">
                Vegetarian
                <input
                  type="checkbox"
                  id="vegetarianRecipes"
                  name="filterRecipe"
                  value="vegetarian"
                  aria-label="checkbox-vegeterian-recipes"
                  checked={checked}
                  onChange={handleCheck}
                />
              </label>
            </div>
            {/* <div className="checkbox">
              <label for="veganRecipes">
                Vegetarian
                <input
                  type="checkbox"
                  id="veganRecipes"
                  name="filterRecipe"
                  value="vegan"
                  checked={checked}
                  onChange={handleCheck}
                />
              </label>
            </div>*/}
          </div>

          <br></br>
          {/* <p>Is "My Value" checked? {checked.toString()}</p> */}

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
