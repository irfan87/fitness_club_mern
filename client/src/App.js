import React from "react";
import "./App.css";

// import container from reactstrap
import { Container } from "reactstrap";
import Routes from "./Routes";

function App() {
	return (
		<Container>
			<h1>Exercise Club</h1>
			<Routes />
		</Container>
	);
}

export default App;
