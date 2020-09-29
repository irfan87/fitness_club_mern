// user model
// don't forget to import mongoose
const mongoose = require("mongoose");

// define UserSchema
const UserSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	email: String,
});

module.exports = mongoose.model("User", UserSchema);
