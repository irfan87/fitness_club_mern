const Registration = require("../models/Registration");

module.exports = {
	async create(req, res) {
		const { user_id } = req.headers;
		const { eventId } = req.params;
		const { date } = req.body;

		const registration = await Registration.create({
			user: user_id,
			event: eventId,
			date,
		});

		// tell mongo to fetch the event and user original data (exclude password) and populate it with the date from the body when we register
		await registration
			.populate("event")
			.populate("user", "-password")
			.execPopulate();

		return res.status(200).json(registration);
	},

	async getRegistrationById(req, res) {
		const { registrationId } = req.params;

		try {
			const registration = await Registration.findById(registrationId);

			// do as the same thing as create()
			await registration
				.populate("event")
				.populate("user", "-password")
				.execPopulate();

			return res.status(200).json(registration);
		} catch (err) {
			return res
				.status(400)
				.json({ message: "Unable to get the registration data" });
		}
	},

	async getRegistrations(req, res) {
		try {
			const registrations = await Registration.find({});

			if (registrations) {
				return res.status(200).json(registrations);
			}
		} catch (error) {
			return res
				.status(400)
				.json({ message: "Unable to fecth the registration data" });
		}
	},
};
