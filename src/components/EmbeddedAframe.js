import React from "react";
import Aframe from './aframe/Aframe';
// import {Helmet} from 'react-helmet';

// Fetch photos for this property and load the assets onto the page
let roomPhotos = [
	{
		name: 'kitchen',
		pano_url: 'assets/img/gallery/test-world6.jpg',
		annotations: [
			{
				label: 'living room',
				link: '#living_room',
				xAxis: -2,
				yAxis: 2,
				zAxis: -5,
			},
			{
				label: 'bathroom',
				link: '#bathroom',
				xAxis: 0,
				yAxis: 2,
				zAxis: -5,
			},
			{
				label: 'fridge',
				text: 'Fridgey McFridgeface',
				xAxis: 2,
				yAxis: 2,
				zAxis: -5,
			},
		]
	},
	{
		name: 'bathroom',
		pano_url: 'assets/img/gallery/test-world1.jpg',
		annotations: [
			{
				label: 'living room',
				link: '#living_room',
				xAxis: -2,
				yAxis: 2,
				zAxis: -5,
			},
			{
				label: 'kitchen',
				link: '#kitchen',
				xAxis: 0,
				yAxis: 2,
				zAxis: -5,
			},
			{
				label: 'bath',
				text: 'Bathy McBathface',
				xAxis: 2,
				yAxis: 2,
				zAxis: -5,
			},
		]
	}
];


const AframePage = props => {
	//   render() {
	return (
		<div className="aframe-wrap">

			<Aframe photos={roomPhotos}/>

		</div>
	);
};

export default AframePage;


// <Helmet>
// <link href="/css/aframe.css" rel="stylesheet"/>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/aframe/0.6.1/aframe-master.min.js"></script>
// </Helmet>