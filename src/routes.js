const express = require("express");
const multer = require("multer");

// include all controllers
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const LoginController = require("./controllers/LoginController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

// upload multer config file from config folder
const uploadConfig = require("./config/upload");

const routes = express.Router();

const upload = multer(uploadConfig);

// login controller
routes.post("/login", LoginController.userLogin);

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

// REGISTRATION
// registration routes
routes.post("/registration/:eventId", RegistrationController.create);

//  get all registrations
routes.get("/registrations", RegistrationController.getRegistrations);
// get current registration
routes.get(
	"/registration/:registrationId",
	RegistrationController.getRegistrationById
);

// APPROVAL REGISTRATION
routes.post(
	"/registration/:registrationId/approvals",
	ApprovalController.approvalRegistered
);
routes.post(
	"/registration/:registrationId/rejections",
	RejectionController.rejectionRegistered
);

module.exports = routes;
