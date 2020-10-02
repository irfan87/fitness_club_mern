import React from "react";
import "./App.css";
import MainDashboardPage from "./pages/Dashboard/MainDashboardPage";
import MainLoginPage from "./pages/Login/MainLoginPage";

function App() {
	return (
		<div>
			<MainLoginPage />
			<MainDashboardPage />
		</div>
	);
}

export default App;
