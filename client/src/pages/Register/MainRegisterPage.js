import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import Api from "../../services/Api";

export default function MainRegisterPage({ history }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(`Result: ${firstName}, ${lastName}, ${email}, ${password}`);

		// post the email and password to the server (backend)
		const respond = await Api.post("/user/register", {
			email,
			password,
			firstName,
			lastName,
		});

		// get the user's id from the backend
		const userId = respond.data._id || false;

		// if the server send the user's id, save it in the localstorage
		if (userId) {
			localStorage.setItem("user", userId);
			history.push("/dashboard");
		} else {
			const { message } = respond.data.message;
			console.log(message);
		}
	};

	return (
		<Container>
			<h3>Register to become our member</h3>
			<Form onSubmit={handleSubmit}>
				<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
					<Input
						type="email"
						name="email"
						id="exampleEmail"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your Email"
					/>
				</FormGroup>
				<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
					<Input
						type="password"
						name="password"
						id="examplePassword"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Your Password"
					/>
				</FormGroup>
				<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
					<Input
						type="text"
						name="firstName"
						id="firstName"
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="Your First Name"
					/>
				</FormGroup>
				<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
					<Input
						type="text"
						name="lastName"
						id="lastName"
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Your Last Name"
					/>
				</FormGroup>
				<Button>Submit</Button>
			</Form>
		</Container>
	);
}
