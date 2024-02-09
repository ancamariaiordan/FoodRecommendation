import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL ="https://www.themealdb.com/api/json/v1/1/random.php";
const yourAPIKey = "1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let data;

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.post("/", async (req, res) => {
try {
  const result = await axios.get(API_URL, {
    params: {
      apiKey: yourAPIKey
    }
  });
  res.render("index.ejs", { 
    yourMeal: result.data.meals[0].strMeal,
    imageMeal: result.data.meals[0].strMealThumb
  });
} catch (error) {
  res.status(404).send("Error:", error.message);
}
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
