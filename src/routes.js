const express = require("express");
const multer = require("multer");

// include UserController
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");

// upload multer config file from config folder
const uploadConfig = require("./config/upload");

const routes = express.Router();

const upload = multer(uploadConfig);
// create routes
routes.get("/", (req, res) => {
	res.status(200).json({ message: "hello there!" });
});

// USER
// register new user router
routes.post("/user/register", UserController.createUser);

// get user by id
routes.get("/user/:userId", UserController.getUserById);

// EVENT
// get all events
routes.get("/events", EventController.getAllEvents);

// create new event
routes.post(
	"/event/new",
	upload.single("thumbnail"),
	EventController.createEvent
);

// get event by id
routes.get("/event/:eventId", EventController.getEventById);

// delete current event
routes.delete("/event/:eventId", EventController.deleteEvent);

module.exports = routes;
