import React, { Component } from "react";
import ReactDOM from "react-dom";
import API from "../../../utils/API";
import FileDrop from "./FileDrop";
import BuildPropertyList from "./BuildPropertyList";
// import ZillowFetch from "./ZillowFetch";
import Btn from "../Elements/Btn";
import PreviewWindow from "../PreviewWindow";
import cookie from "react-cookies";
import axios from "axios";

import propertyAPI from "../../../utils/propertyAPI";
import roomAPI from "../../../utils/roomAPI";
const s3API = require("../../../utils/s3API");

const ReactToastr = require("react-toastr");
const { ToastContainer } = ReactToastr; // This is a React Element.

let ToastMessageFactory = React.createFactory(
	ReactToastr.ToastMessage.animation
);

class NewVRoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agent: "James Bond",
			room_name: "",

			street: "",
			city: "",
			state: "",
			zip: "",

			beds: "",
			baths: "",
			year: "",
			sqft: "",
			price: "",

			query_type: "",
			zpid: "",
			zillow_url: "",
			fetch_query: "",

			bits: "",
			bitsTN: "",
			fileNameTN: "",
			fileStatus: "no-file",

			extracted_input: "",

			roomID: "",
			submitBtnTheme: "",
			annotateBtnTheme: "disabled",
			annotateBtnIsOutlined: true,

			propertyList: [],
			isNewProperty: true,
			
			clearing: false,
		};
	}

	addAlert = message => {
		this.refs.container.success(message, `Success`, {
			timeOut: 3000,
			extendedTimeOut: 2000,
			closeButton: true
		});
	};

	clearAlert = () => {
		this.refs.container.clear();
	};

	// Handler for 360 image
	handle360Upload = fileDropState => {
		this.setState(fileDropState);
	};

	// Handler for thumbnail
	handleThumbnailUpload = fileDropState => {
		this.setState({
			bitsTN: fileDropState.bits,
			fileNameTN: fileDropState.fileName
		});
	};

	handleInputChange = event => {
		event.preventDefault();
		const value = event.target.value;
		const name = event.target.name;
		// console.log(name, value);

		// if (name === 'fetch_query') {
		// 	this.detectQueryType(value.trim())
		// }
		// else {
		this.setState({
			[name]: value
		});
		// }
	};

	portZillowState = stateData => this.setState(stateData);

	/**
	 * Helper function for adding a new property and new room
	 */
	addNewPropertyAndRoom = () => {
		// Get signed request from express server and use it to upload to S3
		// Upload 360 image first
		s3API.getSignedRequest(
			{ fileName: this.state.fileName, data: this.state.bits },
			"360",
			url => {
				// Upload thumbnail after uploading 360 image
				s3API.getSignedRequest(
					{
						fileName: this.state.fileNameTN,
						data: this.state.bitsTN
					},
					"thumbnail",
					urlTN => {
						// Check if both uploads were successful
						if (url && urlTN) {
							// Create new property
							let {
								street,
								city,
								state,
								zip,
								country,
								beds,
								baths,
								year,
								price,
								sqft
							} = this.state;
							let property = {
								street,
								city,
								state,
								zip,
								country,
								bedrooms: beds,
								baths,
								built_year: year,
								price,
								square_feet: sqft,
								thumbnail_url: urlTN
							};
							let userID = cookie.load("userId");
							console.log("cookie userId: ", userID);
							console.log("property: ", property);

							// Add new property to signed-in user, then add new room
							// to the property that was just added
							propertyAPI.addNewProperty(
								userID,
								property,
								addedProperty => {
									console.log(
										"addedProperty: ",
										addedProperty.data
									);
									let room = {
										parent_propertyID:
											addedProperty.data._id,
										pano_url: url,
										name: this.state.room_name
									};
									roomAPI
										.addNewRoom(
											addedProperty.data._id,
											room
										)
										.then(response => {
											console.log(
												"addNewRoom response --->",
												response.data
											);
											let roomID = response.data._id;

											if (roomID) {
												console.log(
													" New roomID created --->",
													roomID
												);
												this.setState({
													roomID: roomID,
													annotateBtnTheme: "success",
													annotateBtnIsOutlined: false,
													submitBtnTheme: "isDisabled"
												});
											}
										});
									this.addAlert(
										"New property and room successfully added"
									);

									// Rebuild propertyList when new property successfully added
									this.getPropertyList(this.state.userID);

									// Clear form
									this.clearForm();
								}
							);
						} else {
							// end of create property
							// If Upload Unsuccessful...
							console.log("Upload error!");
							console.log("360 URL: ", url);
							console.log("Thumbnail URL: ", urlTN);
						}
					}
				);
			}
		);
	};

	/**
	 * Helper function for adding new room to an existing property
	 */
	addNewRoomToExistingProperty = () => {
		// Get signed request from express server and use it to upload to S3
		// Upload 360 image
		s3API.getSignedRequest(
			{ fileName: this.state.fileName, data: this.state.bits },
			"360",
			url => {
				// Check if upload successful
				if (url) {
					// Create room existing property
					console.log(
						"---- adding new room to existing property --->"
					);
					let room = {
						parent_propertyID: this.state.propertyID,
						pano_url: url,
						name: this.state.room_name
					};

					roomAPI
						.addNewRoom(this.state.propertyID, room)
						.then(response => {
							console.log(
								"addNewRoom response --->",
								response.data
							);
							let roomID = response.data._id;

							if (roomID) {
								console.log(" New roomID created --->", roomID);
								this.setState({
									roomID: roomID,
									annotateBtnTheme: "success",
									annotateBtnIsOutlined: false,
									submitBtnTheme: "isDisabled"
								});
								this.addAlert("New room successfully added");
								
								// Clear form
								this.clearForm();
							}
						});
				} else {
					// If Upload Unsuccessful...
					console.log("Upload error!");
					console.log("360 URL: ", url);
				}
			}
		);
	};

	/**
	 * Handles form submission
	 * - Creates new Property/Room OR
	 * - Creates new Room in existing Property
	 */
	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();

		console.log("this.state", this.state);
		// Add new property and room if flag is set, otherwise add room to existing property
		this.state.isNewProperty
			? this.addNewPropertyAndRoom()
			: this.addNewRoomToExistingProperty();
	};

// componentDidMount =======================================
	componentDidMount = (prevProps, prevState) => {


		// Get userID from cookies ----------
		let userID = cookie.load("userId");
		// console.log('userID',userID);

		// Get user's property list from API -------------
		if (userID) {
			console.log("userID ====", userID);

			// propertyAPI.getAllUserProperties(userID, (response) => {
			//     console.log('getAllUserProperties >>>>',response);
			// })

			this.setState({userID})

			this.getPropertyList(userID);

			// propertyAPI.getAllUserProperties(userID).then(response => {
			// console.log('getAllUserProperties ===>', response.data.properties);
			// let propertyList = response.data;
			// console.log('propertyList',propertyList);
			// // Set propertyList state, which will trigger BuildPropertyList
			// this.setState({ propertyList })
			// })
		}

		// Get list of all properties ( temporary ) ----------
		// propertyAPI.getAllProperties().then(response => {
		//     console.log('allProperties ===>',response.data);
		//     let propertyList = response.data;
		//     // Set propertyList state, which will trigger BuildPropertyList
		//     this.setState({ propertyList });
		// })
	};

// getPropertyList =========================================
	getPropertyList = userID => {
		if (userID) {

			propertyAPI.getAllUserProperties(userID, response => {
				console.log("getAllUserProperties >>>>", response);
				let propertyList = response;
				this.setState({propertyList});
			});


		}
	};
// clearForm ===============================================
	clearForm = () => {
		this.setState({
			clearing: true,

			room_name: "",

			street: "",
			city: "",
			state: "",
			zip: "",

			beds: "",
			baths: "",
			year: "",
			sqft: "",
			price: "",

			query_type: "",
			zpid: "",
			zillow_url: "",
			fetch_query: "",

			bits: "",
			bitsTN: "",
			fileNameTN: "",
			fileStatus: "no-file",
			
			roomID: "",
		});
		this.setState({
			clearing: false
		})
	}
// handlePanelChange =======================================
	handlePanelChange = event => {
		event.preventDefault();
		const el = event.target;
		let nextPanelID = el.getAttribute("panel");
		// console.log('nextPanelID',nextPanelID);

		// Remove chosen class from previous panel elements;
		let prevPanel = document.querySelector(".chosen.ws-panel");
		let prevControl = document.querySelector(".chosen.ws-panel-control");
		prevPanel.classList.remove("chosen");
		prevControl.classList.remove("chosen");

		// Add chosen class to new panel elements
		let nextPanel = document.getElementById(nextPanelID);
		nextPanel.classList.add("chosen");
		el.classList.add("chosen");

		// Set a flag in state to be used as indicator for other things ----------
		// let isNewProperty = (nextPanelID === 'add-property') ? true : false ;
		let isNewProperty = nextPanelID === "add-property";
		console.log("isNewProperty", isNewProperty);

		this.setState({ isNewProperty });
	};

// handlePropertySelection =====================================
	handlePropertySelection = data => {
		console.log("==== selected property ID ===>", data);
		this.setState({
			propertyID: data.id
		});
	};

// render //////////////////////////////////////////////////
	render() {
		return (
			<div className="pg-contains-aframe">
				<ToastContainer
					toastMessageFactory={ToastMessageFactory}
					ref="container"
					className="toast-top-right"
				/>

				{/* <PreviewWindow /> */}
				<section id="vroom-form-wrapper ws-section">
					<form id="new-vroom-form" className="form ws-form">
						<div className="leftsection">
							<div className="form-row sec-header">
								<div className="ws-panel-controller align-with-form">
									{/* <div className="ws-panel-control"> */}
									<a
										href="#"
										panel="add-property"
										className="ws-panel-control chosen"
										onClick={this.handlePanelChange}
									>
										Add New Property
									</a>
									{/* </div> */}
									{/* <div className="ws-panel-control"> */}
									<a
										href="#"
										panel="choose-property"
										className="ws-panel-control"
										onClick={this.handlePanelChange}
									>
										Choose Existing
									</a>
									{/* <Btn
																			href='#choose-property'
																			text="Choose Existing"
																			theme='primary'
																			classes={["panel-switch alt-action"]}
																			onClick={this.handlePanelChange}
																	/> */}
									{/* </div> */}
								</div>
							</div>
							<div id="add-property" className="ws-panel chosen">
								<div className="form-row">
									<fieldset>
										<legend>Address</legend>
										<div className="form-field-row">
											<div className="input-wrap input-full-width input-street ws-input-wrap">
												<input
													id="street"
													className="input ws-input"
													type="text"
													name="street"
													placeholder="Street"
													value={this.state.street}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>
										<div className="form-field-row">
											<div className="input-wrap input-city validated">
												<input
													id="city"
													className="input ws-input"
													type="text"
													name="city"
													placeholder="City"
													value={this.state.city}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
											<div className="input-wrap input-state error">
												<input
													id="state"
													className="input ws-input"
													type="text"
													name="state"
													placeholder="State"
													value={this.state.state}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
											<div className="input-wrap input-zip">
												<input
													id="zip"
													className="input ws-input"
													type="text"
													name="zip"
													placeholder="Zip"
													value={this.state.zip}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="form-row">
									<fieldset>
										<legend>Property Info</legend>

										<div className="form-field-row">
											<div className="input-wrap input-beds">
												<input
													id="beds"
													className="input ws-input"
													type="text"
													name="beds"
													placeholder="Beds"
													value={this.state.beds}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
											<div className="input-wrap input-baths">
												<input
													id="baths"
													className="input ws-input"
													type="text"
													name="baths"
													placeholder="Baths"
													value={this.state.baths}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
											<div className="input-wrap input-year">
												<input
													id="year"
													className="input ws-input"
													type="text"
													name="year"
													placeholder="Year"
													value={this.state.year}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>
										<div className="form-field-row">
											<div className="input-wrap input-price icon-prefix">
												<i className="fa fa-usd" />
												<input
													id="price"
													className="input ws-input"
													type="text"
													name="price"
													placeholder="Price"
													value={this.state.price}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
											<div className="input-wrap input-sqft">
												<input
													id="sqft"
													className="input ws-input"
													type="text"
													name="sqft"
													placeholder="Square Feet"
													value={this.state.sqft}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="form-row">
									<fieldset>
										<legend>Upload Thumbnail</legend>

										<FileDrop
											type="thumbnail"
											handleFileUpload={
												this.handleThumbnailUpload
											}
											clearing={this.state.clearing}
										/>
									</fieldset>
								</div>
							</div>
							<div id="choose-property" className="ws-panel">
								<div className="form-row">
									<div className="form-row-body align-with-form">
										{/* <ul className="link-collection">
																	<li><a href="#">Property 1</a></li>
																	<li><a href="#">Property 2</a></li>
																	<li><a href="#">Property 3</a></li>
																</ul> */}
										{/* <ol className="ws-link-collection"> */}
										<BuildPropertyList
											data={this.state.propertyList}
											port={this.handlePropertySelection}
										/>
										{/* </ol> */}
									</div>
								</div>
							</div>
						</div>
						{/*  end of <leftSection /> */}
						<div className="rightsection">
							<div className="form-row">
								<fieldset>
									<legend>Room Name</legend>
									<div className="form-field-row">
										<div className="input-wrap input-full-width input-street ws-input-wrap">
											<input
												id="room_name"
												className="input ws-input"
												type="text"
												name="room_name"
												placeholder="e.g. Kitchen, Living Room"
												value={this.state.room_name}
												onChange={
													this.handleInputChange
												}
											/>
										</div>
									</div>
								</fieldset>
							</div>
							<div className="thumbnail-row">
								<fieldset>
									<legend>Upload 360 Image</legend>
									<div className="form-row stack-vertical">
										<FileDrop
											type="360"
											handleFileUpload={
												this.handle360Upload
											}
											clearing={this.state.clearing}
										/>

										<div className="btnwrapper flexleft">
											<button
												id="submit"
												className={
													"ws-btn " +
													this.state.submitBtnClass
												}
												type="submit"
												onClick={this.handleFormSubmit}
											>
												Submit
											</button>

											<Btn
												href={
													"/edit/" + this.state.roomID
												}
												text="Annotate"
												theme={
													this.state.annotateBtnTheme
												}
												classes={["annotateBtn"]}
												isOutlined={
													this.state
														.annotateBtnIsOutlined
												}
											/>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
						{/*  end of <rightSection /> */}
					</form>
				</section>
			</div>
		);
	}
}

export default NewVRoomForm;
