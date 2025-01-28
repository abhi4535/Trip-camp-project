const mongoose = require("mongoose");
const schema = mongoose.Schema;

const campgroungSchema = new schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("campground", campgroungSchema);
