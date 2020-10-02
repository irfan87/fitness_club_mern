// user will approved the registered event
const Registration = require("../models/Registration");

module.exports = {
	async rejectionRegistered(req, res) {
		const { registrationId } = req.params;

		try {
			const registration = await Registration.findById(registrationId);

			// after we get the id from registration, we have to set the registration approval either true or false
			registration.approved = false;

			// then save the approved registration to the mongo
			await registration.save();

			return res.status(200).json(registration);
		} catch (err) {
			return res.status(400).json(err);
		}
	},
};
