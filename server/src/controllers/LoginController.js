// Login Controller

const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
	async userLogin(req, res) {
		try {
			const { email, password } = req.body;

			// verified if the email and password is same
			if (!email || !password) {
				return res.status(200).json({ message: "Both fields are required!" });
			}

			// told mongo to find this user's email
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "User does not exists" });
			}

			// check the password is same with the hashed password
			if (user && (await bcrypt.compare(password, user.password))) {
				const userResponse = {
					_id: user._id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				};

				return res.status(200).json(userResponse);
			} else {
				return res.status(400).json({ message: "Invalid email / password" });
			}
		} catch (err) {
			throw Error(`Error occured while authenticate is processing: ${err}`);
		}
	},
};
