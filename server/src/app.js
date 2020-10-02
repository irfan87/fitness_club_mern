const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// import routes
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

app.use(cors());
app.use(express.json());

try {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log("Fitness Club MongoDB connected");
} catch (err) {
	console.error(`Error: ${err}`);
}
//  hold the files folder that contains thumbnails image
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

app.listen(PORT, (req, res) => {
	console.log(`Fitness Club is running at port ${PORT}`);
});
