// import bcrypt
const bcrypt = require("bcrypt");

// user controller, between view and model
const User = require("../models/User");

module.exports = {
	// register new user
	async store(req, res) {
		try {
			const { firstName, lastName, password, email } = req.body;

			// told Mongo to check the current user by finding their email
			const currUser = await User.findOne({ email });

			// if current user is not exist, we will create the new user
			if (!currUser) {
				// hash password with bcrypt
				const hashedPassword = await bcrypt.hash(password, 10);

				// Note: if the key value is not matched with the destructuring variable's name, put the name of the key as below
				const newUser = await User.create({
					firstName,
					lastName,
					email,
					password: hashedPassword,
				});

				return res.json(newUser);
			}

			return res.status(400).json({
				message:
					"This user is already exists. Do you want to continue to login?",
			});
		} catch (err) {
			throw Error(`Error have been occured during registration: ${err}`);
		}
	},
};
