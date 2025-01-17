var express = require("express");
var router = express.Router();
var db = require("../model/helper");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const response = await db(`SELECT * FROM recipes; `);
    const recipe = response.data[0];

    if (!recipe) {
      res.status(404).send();
      return;
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const url = req.body.url;

  try {
    const response = await db(`INSERT INTO recipes (title, ingredients, url) 
    values ('${title}', '${ingredients}', '${url}')`);

    const recipe = response.data;

    res.send({ recipe });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await db(`SELECT * FROM recipes WHERE id = ${id}`);
    const recipe = response.data[0];

    if (!recipe) {
      res.status(404).send();
      return;
    }
    await db(`DELETE FROM recipes WHERE id = ${id}`);
    res.status(200).send({ message: "recipe deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id"),
  async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const title = body.title;
    const ingredients = body.ingredients;

    try {
      const recipe = response.data[0];

      if (!recipe) {
        res.status(404).send();
        return;
      }

      await db(
        `UPDATE recipes SET title ${title}, ingredients ${ingredients}, url ${url} where id = ${id}`
      );

      res.send({ recipe });
    } catch (err) {
      res.status(500).send(err);
    }
  };

module.exports = router;
