import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainDashboardPage from "./pages/Dashboard/MainDashboardPage";
import MainEventPage from "./pages/EventPage/MainEventPage";
import MainLoginPage from "./pages/Login/MainLoginPage";
import MainRegisterPage from "./pages/Register/MainRegisterPage";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={MainLoginPage} />
				<Route path="/registration" exact component={MainRegisterPage} />
				<Route path="/dashboard" component={MainDashboardPage} />
				<Route path="/events" component={MainEventPage} />
			</Switch>
		</Router>
	);
}
