// event controller, same as we did with UserController, except no bcrypt.. hahaha

// import User and Event models
const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
	async createEvent(req, res) {
		const { title, description, price, sport } = req.body;

		// get userID from the event's header
		const { user_id } = req.headers;

		// define the file name for the thumbnail
		const { filename } = req.file;

		// find the id from the headers and passed it to the mongo to get the specific id
		const user = await User.findById(user_id);

		if (!user) {
			return res.status(400).json({ message: "User does not exists" });
		}

		const event = await Event.create({
			title,
			description,
			sport,
			price: parseFloat(price),
			user: user_id,
			thumbnail: filename,
		});

		return res.json(event);
	},

	async deleteEvent(req, res) {
		const { eventId } = req.params;

		try {
			await Event.findByIdAndDelete(eventId);

			return res.status(204).send();
		} catch (err) {
			return res
				.status(400)
				.json({ message: "The event that you are looking for is not exists" });
		}
	},
};
