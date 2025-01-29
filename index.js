const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const campground = require("./models/campground");
const ejs_mate = require("ejs-mate");
const method_override = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/trip-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
  console.log("connected to database");
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method"));
app.engine("ejs", ejs_mate);

app.get("/", (req, res) => {
  res.send("hello from trip camp");
});

app.listen("//github.com", () => {
  console.log("serving port 4000");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await campground.find({});
  res.render("campground/index", { campgrounds });
});
app.get("/campgrounds/new", (req, res) => {
  res.render("campground/new");
});

app.post("/campgrounds", async (req, res) => {
  const camp = new campground(req.body.campground);
  await camp.save();
  res.redirect(`/campgrounds/${camp._id}`);
});

app.get("/campgrounds/:id", async (req, res) => {
  const camp = await campground.findById(req.params.id);
  res.render("campground/show", { camp });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const newCamp = await campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${newCamp._id}`);
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const camp = await campground.findById(req.params.id);
  res.render("campground/edit", { camp });
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});
