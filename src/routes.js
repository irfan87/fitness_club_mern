const express = require("express");
const multer = require("multer");

// include UserController
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const LoginController = require("./controllers/LoginController");

// upload multer config file from config folder
const uploadConfig = require("./config/upload");

const routes = express.Router();

const upload = multer(uploadConfig);

// login controller
routes.post("/login", LoginController.userLogin);

// TODO: Subscribe controller
// TODO: Approval controller
// TODO: Rejection controller

// create routes
routes.get("/", (req, res) => {
	res.status(200).json({ message: "hello there!" });
});

// USER
// register new user router
routes.post("/user/register", UserController.createUser);

// get user by id
routes.get("/user/:userId", UserController.getUserById);

// DASHBOARD CONTROLLER
// get all events
routes.get("/dashboards", DashboardController.getAllEvents);

// get event by id
routes.get("/event/:eventId", DashboardController.getEventById);

// get each sports from the event
routes.get("/dashboard/:sport", DashboardController.getSportInEvent);

// EVENT CONTROLLER
// create new event
routes.post(
	"/event/new",
	upload.single("thumbnail"),
	EventController.createEvent
);

// delete current event
routes.delete("/event/:eventId", EventController.deleteEvent);

module.exports = routes;
