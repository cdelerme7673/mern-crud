const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceEaten: {
    type: Number,
    required: true,
  },
});

const FoodDb = mongoose.model("Food", foodSchema);

module.exports = FoodDb;