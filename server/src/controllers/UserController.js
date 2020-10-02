// import bcrypt
const bcrypt = require("bcrypt");

// user controller, between view and model
const User = require("../models/User");

module.exports = {
	// register new user
	async createUser(req, res) {
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

				return res.json({
					_id: newUser._id,
					email: newUser.email,
					firstName: newUser.firstName,
					lastName: newUser.lastName,
				});
			}

			return res.status(400).json({
				message: "This user is already exists. Continue by login?",
			});
		} catch (err) {
			throw Error(`Error have been occured during registration: ${err}`);
		}
	},

	// get user by id
	async getUserById(req, res) {
		const { userId } = req.params;

		try {
			const user = await User.findById(userId);

			return res.status(200).json(user);
		} catch (err) {
			return res
				.status(400)
				.json({ message: `User ID that you are looking for is not exists` });
		}
	},
};
