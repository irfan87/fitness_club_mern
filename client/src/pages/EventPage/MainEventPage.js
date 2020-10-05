// this will show all the events
import React, { useState, useMemo } from "react";
import {
	Button,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Alert,
} from "reactstrap";
import Api from "../../services/Api";
import camera_icon from "../../assets/camera.png";

// import event.css
import "./event.css";

export default function MainEventPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [sport, setSport] = useState("");
	const [date, setDate] = useState("");

	// set the error messahge
	const [errorMessage, setErrorMessage] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user_id = localStorage.getItem("user");
		const eventData = new FormData();

		eventData.append("thumbnail", thumbnail);
		eventData.append("sport", sport);
		eventData.append("title", title);
		eventData.append("price", price);
		eventData.append("description", description);
		eventData.append("date", date);

		try {
			if (
				title !== "" &&
				description !== "" &&
				price !== "" &&
				sport !== "" &&
				date !== "" &&
				thumbnail !== null
			) {
				await Api.post("/event/new", eventData, { headers: { user_id } });
			} else {
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 4000);

				console.log(`Missing required data`);
			}
		} catch (err) {
			console.log(err.message);
			// throw Error(`Error: ${err}`);
		}
	};
	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	return (
		<Container>
			<h3>Create Event</h3>
			{errorMessage ? (
				<Alert className="event-validation" color="danger">
					Missing required information
				</Alert>
			) : (
				""
			)}
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="eventTitle">Upload Event Thumbnail</Label>
					<Label
						id="eventThumbnail"
						style={{ backgroundImage: `url(${preview})` }}
						className={thumbnail ? "has-thumbnail" : ""}
					>
						<Input
							type="file"
							name="eventThumbnail"
							onChange={(e) => setThumbnail(e.target.files[0])}
						/>
						<img
							src={camera_icon}
							alt="upload event thumbnail"
							style={{ maxWidth: "50px" }}
						/>
					</Label>
				</FormGroup>
				<FormGroup>
					<Label for="eventTitle">Sport</Label>
					<Input
						type="text"
						name="eventSport"
						id="eventSport"
						value={sport}
						onChange={(e) => setSport(e.target.value)}
						placeholder="Your Event Sport"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="eventTitle">Title</Label>
					<Input
						type="text"
						name="eventTitle"
						id="eventTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Your Event"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="eventTitle">Description</Label>
					<Input
						type="text"
						name="eventDescription"
						id="eventDescription"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Your Event Description"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="eventTitle">Price</Label>
					<Input
						type="number"
						name="eventPrice"
						id="eventPrice"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Your Event Price (RM)"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="eventTitle">Date</Label>
					<Input
						type="date"
						name="eventDate"
						id="eventDate"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						placeholder="Your Event Date"
					/>
				</FormGroup>
				<FormGroup>
					<Button type="submit">Create Event</Button>
				</FormGroup>
			</Form>
		</Container>
	);
}
