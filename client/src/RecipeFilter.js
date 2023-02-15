import "./App.css";

const RecipeFilter = () => {
  return (
    <div className="filter">
      <form>
        <input type="checkbox" id="1" name="1" value="vegetarian">
          <label for="vegetarian"> Vegetarian</label>
        </input>

        <input type="checkbox" id="2" name="2" value="vegan">
          <label for="vegan"> Vegan</label>
        </input>
      </form>
    </div>
  );
};

export default RecipeFilter;
