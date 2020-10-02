const Event = require("../models/Event");

module.exports = {
	async getEventById(req, res) {
		const { eventId } = req.params;
		try {
			const event = await Event.findById(eventId);

			if (event) {
				return res.status(200).json(event);
			}
		} catch (err) {
			return res.status(400).json({ message: "Event does not exists" });
		}
	},

	async getAllEvents(req, res) {
		try {
			const events = await Event.find({});

			if (events) {
				return res.status(200).json(events);
			}
		} catch (err) {
			return res.status(400).json({ message: "Unable to fetch the events" });
		}
	},

	// get sport in event
	async getSportInEvent(req, res) {
		const { sport } = req.params;
		const query = { sport } || {};

		try {
			const events = await Event.find(query);

			if (events) {
				return res.status(200).json(events);
			}
		} catch (err) {
			return res.status(400).json({ message: "Unable to fetch the events" });
		}
	},
};
