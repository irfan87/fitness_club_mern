import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import Api from "../../services/Api";

export default function MainLoginPage({ history }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// post the email and password to the server (backend)
		const response = await Api.post("/login", {
			email,
			password,
		});

		// get the user's id from the backend
		const userId = response.data._id || false;

		// if the server send the user's id, save it in the localstorage
		if (userId) {
			localStorage.setItem("user", userId);
			history.push("/dashboard");
		} else {
			const { message } = response.data;
			console.log(message.data);
		}
	};

	return (
		<Container>
			<h3>Login to your account</h3>
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
				<Button>Submit</Button>
			</Form>
		</Container>
	);
}
