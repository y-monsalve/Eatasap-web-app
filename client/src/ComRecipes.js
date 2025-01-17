import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5050/api";

const ComRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  //const [recipe, setRecipe] = useState()
  const [error, setError] = useState();

  const getRecipes = async () => {
    const response = await axios(`${BASE_URL}/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setRecipes(response.data.data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: recipes }),
      });

      window.location.reload();
    } catch (error) {
      setError("Oops...something went wrong");
    }
  };

  return (
    <div>
      <div className="recipe-tab ">
        <h2 className="recipe-tab-title">Your recipes:</h2>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2 className="recipe-title">{recipe.title}</h2>
            <ul className="recipe-ingredients">
              <li>{recipe.ingredients}</li>
            </ul>
            <img className="recipe-img" alt={recipe.title} src={recipe.url} />
            <button onClick={() => deleteRecipe(recipe.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ComRecipes;
