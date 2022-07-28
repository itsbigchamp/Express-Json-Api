const express = require("express");
const cors = require("cors");
const data = require("./restaurants.json");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => console.log("Our API running on 4000"));

console.log(data);

app.get("/", (req, res) => res.send(data));

// add new restaurant
app.post("/add-restaurant", (req, res) => {
//   const newRestaurant = {
//     name: "Reggies Burgers",
//   };
  data.push(req.body);
  const dataJson = JSON.stringify(data);

  fs.writeFile("restaurants.json", dataJson, (err) => console.error(err));
  res.send(data);

});

// find and update a new restaurant
app.patch("/update-restaurant", (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  console.log(name);
  // find item to update
  const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name)

  const indexOfitem = data.indexOf(itemFound)
  data[indexOfitem] = req.body
  
  const dataJson = JSON.stringify(data);

  fs.writeFile("restaurants.json", dataJson, (err) => console.error(err))

  console.log('itemFound', itemFound)
  res.send(data)
  // then modify the info
});

// get all items from JSON
app.delete("/", (req, res) => {});
