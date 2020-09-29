const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// include UserController
const RegisterController = require("./controllers/UserController");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "hello there!" });
});

// register new user router
app.post("/register", RegisterController.store);

try {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log("Fitness Club MongoDB connected");
} catch (err) {
	console.error(`Error: ${err}`);
}

app.listen(PORT, (req, res) => {
	console.log(`Fitness Club is running at port ${PORT}`);
});
