const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const FoodDb = require("./models/Food");

const NODE_PORT = 3001;
const INSERT_ENDPOINT = "/insert";
const READ_ENDPOINT = "/read";
const UPD_ENDPOINT = "/update";

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://cdelerme7673:kzeFAtdEJYufAsTL@crud.uhiukhv.mongodb.net/?retryWrites=true&w=majority&appName=CRUD"
);

app.post(INSERT_ENDPOINT, async (request, response) => {
  const foodName = request.body.foodName;
  const daysSinceEaten = request.body.daysSinceEaten;

  const food = new FoodDb({ foodName, daysSinceEaten });
  try {
    await food.save();
    response.send(JSON.stringify({ foodName, daysSinceEaten, Status: 201 }));
  } catch (err) {
    console.error("food.save() failed.", err.message || "no error message");
  }
});

app.get(READ_ENDPOINT, async (req, res) => {
  try {
    const foodList = await FoodDb.find({});
    res.send(foodList);
  } catch (err) {
    console.log(err);
  }
});

app.put(UPD_ENDPOINT, async (request, response) => {
  const foodName = request.body.foodName || request.body.newFoodName;
  const id = request.body.id;

  FoodDb.findByIdAndUpdate(id, { foodName }, { new: true })
    .then((updatedDoc) => {
      if (updatedDoc) {
        response.send({ ...updatedDoc, status: 200 });
      } else {
        console.log("document not found");
      }
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
});

app.listen(NODE_PORT, () => {
  console.log(`Node server runnning on port ${NODE_PORT}...`);
});
