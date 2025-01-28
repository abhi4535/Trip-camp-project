const mongoose = require("mongoose");
const campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/trip-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
  console.log("connected to database");
});

const activity = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
  await campground.deleteMany({});

  for (let i = 0; i < 100; i++) {
    const randAct = `${activity(descriptors)} ${activity(places)}`;
    const camp = new campground({
      location: `${cities[i].city},${cities[i].state}`,
      title: `${randAct}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      price: Math.floor(Math.random() * 10) + 10,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officia qui aut cumque repellat, iusto dolorum doloremque blanditiis labore, omnis id atque consequatur molestias illo maxime voluptas earum impedit accusantium?",
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
