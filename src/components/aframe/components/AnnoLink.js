import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Entity } from "aframe-react";
import "aframe-look-at-component";
import "aframe-mouse-cursor-component";
import "aframe-animation-component";
// import RotatingBox from "./RotatingBox";
import Spotlight from "./Spotlight";

////////////////////////////////////////////////////
	// animation__rotate={{property: 'rotation', dur: 4000, loop: true, to: '360 360 360'}}
	const rotationAnimationData = {
		property: "rotation",
		dur: 5000,
		to: { x: 360, y: 360, z: 360},
		easing: "easeInOutCubic",
	};

	const wrapScale = 1;
	const wrapper = {
		scale: { x: wrapScale, y: wrapScale, z: wrapScale, }
	}
	// const box = {
	// 	geometry: {
	// 		primitive: "box",
	// 		width: 0.2,
	// 		height: 0.2,
	// 		depth: 0.2
	// 	},
	// 	rotation: { x: 0, y: 0, z: 0 },
	// 	scale: { x: 1, y: 1, z: 1 },
	// 	material: { 
	// 		color: "#3498db", 
	// 		opacity: 0.8 
	// 	},
	// 	animation__rotate: { 
	// 		property: 'rotation', 
	// 		dur: 6000, 
	// 		loop: true, 
	// 		to: '360 360 360'
	// 	},
	// }
	const box = {
		geometry: {
				primitive: "box",
				width: 0.2,
				height: 0.2,
				depth: 0.2
			},
		rotation: { x: 0, y: 0, z: 0 },
		scale: { x: 1, y: 1, z: 1 },
		material: { 
				color: "#3498db", 
				opacity: 0.8 
			},
		animation__rotate: { 
				property: 'rotation', 
				dur: 6000, 
				loop: true, 
				to: '360 360 360'
			},
	}
	const labelTemplate = {
		geometry: {
			primitive: 'plane',
			height: 0.08,
			width: 0.3,
		},
		text: {
				align: 'center',
				color: 'white',
				width: 1,
		},
		position: { x: 0, y: 0.3, z: 0 },
		scale: { x:3 , y:3, z:3 },
		material: { color: "#242424", opacity: 0.7 },
	}
	// const text = {
	// 	geometry: {
	// 		primitive: 'plane',
	// 		height: 0.25,
	// 		width: 0.5,
	// 	},
	// 	text: {
	// 		align: 'center',
	// 		color: '#333333',
	// 		width: 0.5,
	// 		wrapCount: 24
	// 	},
	// 	position: { x: 0, y: -0.24, z: 0 },
	// 	scale: { x: 3, y: 3, z: 3 },
	// 	material: { 
	// 		color: "#ffffff", 
	// 		opacity: 1,
	// 		side: 'double'
	// 	}
	// };

////////////////////////////////////////////////////
	const upScale = 1.5;
	const scaleUp = {
		property: 'scale',
		dur: 300,
		delay: 0,
		loop: false,
		to: { x: upScale, y: upScale, z: upScale }
	};

	const downScale = 1;
	const scaleDown = {
		property: 'scale',
		dur: 300,
		delay: 0,
		loop: false,
		to: { x: downScale, y: downScale, z: downScale }
	};

////////////////////////////////////////////////////
class AnnoLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			label: ""
		};
	}
// handleMouseEnter ================================
	handleMouseEnter = event => {
		event.preventDefault();
		let parent = event.target.parentElement;
		let labelEl = parent.querySelector('.portal-label');
		let boxEl = parent.querySelector('.portal-toggle');
		

		// Box Scale ----------
		boxEl.removeAttribute( 'animation__scale' ); // remove current attribute (important!!!)
		boxEl.setAttribute( 'animation__scale', scaleUp );
		// console.log('animation__scale.to ===>', boxEl.getAttribute("animation__scale").to);


		// Box Material ----------
		// boxEl.setAttribute( 'material',{
		// 	color: 'white', 
		// 	opacity: 0.9,
		// });
	};

// handleMouseLeave ================================
	handleMouseLeave = event => {
		event.preventDefault();

		let parent = event.target.parentElement;
		let boxEl = parent.querySelector('.portal-toggle');
		
		
		boxEl.removeAttribute( 'animation__scale' ); // remove current attribute (important!!!)
		boxEl.setAttribute( 'animation__scale', scaleDown );
		// console.log('animation__scale.to ===>', boxEl.getAttribute("animation__scale").to);

	};

// handleClick =====================================
	handleClick = event => {
		event.preventDefault();
		console.log('>>>> PORTAL CLICK >>>>');


		console.log('this.props',this.props);
		
		// Create next link and navigate to it. While staying in the same mode.
		// e.g. if you're in annotation mode, you will stay in annotation mode

			let destination = event.target.getAttribute('destination');
			console.log('destination',destination);

			// access current directory location
			let path = this.props.location.pathname;

			// first directory after domain name and before roomID
			// let mode = path.split('/')[1]; 
			// console.log('mode',mode);
			let modePath = '/annotate';
			
			if ( path.indexOf('/show') === 0 ){
				modePath = '/show'
			}


			let nextURL = modePath +'/' + destination;
			console.log('nextURL',nextURL);

			// props.history.push(nextURL);

			// let nextURL = '/'+ mode +'/' + destination;
			// console.log('nextURL',nextURL);

			this.props.history.push(nextURL);
			// this.props.history.push('/show/'+destination);
			// this.props.history.go;

			
	};

////////////////////////////////////////////////////
	render() {
		let { data } = this.props;
		let { xAxis, yAxis, zAxis, link } = this.props.data;
		let { primitive, textScale, textPos, height, width, tScale, tPos } = this.props;
		// let { to,position, label,textScale,textPos, primitive,height,width, color,opacity,side } = this.props;
		// let labelLen = data.label.length;
		let tailoredWidth = ( data.label.length * 0.02 ) + 0.07;
		let label = {
			geometry: {
				primitive: 'plane',
				height: 0.08,
				width: tailoredWidth,
			},
			text: {
					align: 'center',
					color: 'white',
					width: 1,
			},
			position: { x: 0, y: 0.3, z: 0 },
			scale: { x:3 , y:3, z:3 },
			material: { color: "#242424", opacity: 0.7 },
		}

		return (
			<Entity
				className="portal-wrap"
				id={'portal-wrap-'+this.props.idx}
				position={{ x: xAxis, y: yAxis, z: zAxis }} 
				scale={wrapper.scale}
			>
					{/* SPOTLIGHT =================================*/}
						<Spotlight target={ "#portal-box-"+this.props.idx } />
					{/* BOX =======================================*/}
						<Entity
							className="portal-toggle box portal-box"
							id={'portal-box-'+this.props.idx}
							geometry={box.geometry}
							rotation={box.rotation}
							scale={box.scale}
							material={box.material}
							animation__rotate={box.animation__rotate}
							destination={link}
							events={{ 
								click: this.handleClick, 
								mouseenter: this.handleMouseEnter, 
								mouseleave: this.handleMouseLeave,
								}}
						/>
					{/* LABEL ==================================== */}
						<Entity
							className="portal-label portal-label"
							id={'portal-label-'+this.props.idx}
							geometry={label.geometry}
							text={Object.assign({},label.text, {value: data.label})}
							position={label.position}
							scale={label.scale}
							material={label.material}
							look-at="#camera"
						/>
					{/* TEXT ===================================== */}
						{/* <Entity
							className="portal-text"
							geometry={text.geometry}
							text={Object.assign({},text.text, {value: data.text})}
							position={text.position}
							scale={text.scale}
							material={text.material}
							visible='false'
							look-at="#camera"
							events={{
								mouseleave: this.handleMouseLeave
							}}
						/> */}
			</Entity>
		);
	}
}

// AnnoLink.propTypes = {
//   history: React.PropTypes.shape({
//     push: React.PropTypes.func.isRequired,
//   }).isRequired,
// };

AnnoLink.defaultProps = {
	color: "#3498db",
	side: "double",
	opacity: 1,
	primitive: "plane",
	height: 0.7,
	width: 2.5,
	textScale: "1 1 1",
	textPos: "0 0 0",
	tScale: { x: 1, y: 1, z: 1 },
	tPos: { x: 0, y: 0, z: 0 }
};

export default AnnoLink;
// export default withRouter(AnnoLink);
