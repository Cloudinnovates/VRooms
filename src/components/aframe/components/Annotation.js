import React, {Component} from "react";
import { Entity } from "aframe-react";
import 'aframe-look-at-component';
import 'aframe-mouse-cursor-component';
import 'aframe-animation-component';
import RotatingBox from './RotatingBox';

////////////////////////////////////////////////////
class Annotation extends React.Component {
	////////////////////////////////////////////////////
	constructor(props){
		super(props);
		this.state={
			label: '',

		}
	}
	////////////////////////////////////////////////////
	handleClick = event => {
		event.preventDefault();
		
		let el = event.target;
		let kids = el.firstChild;
		let grandkids = kids.firstChild;
		kids.setAttribute('scale', '1 1 1');
		kids.setAttribute('position', '0 1 0');
		// el.removeAttribute('animation__rotate');
		// el.setAttribute('rotation', '0 0 0');
		grandkids.setAttribute('value',this.props.data.text)
	};

	handleMouseEnter = (event) => {
		event.preventDefault();
		let el = event.target;
		let kids = el.firstChild;
		let grandkids = kids.firstChild;
		// kids.setAttribute('scale', '1 1 1');
		// kids.setAttribute('position', '0 1 0');
		el.removeAttribute('animation__rotate');
		el.setAttribute('rotation', '0 90 0');
		// grandkids.setAttribute('value',this.props.data.text)
		// console.log('mouseenter!')
		// let cursor = document.getElementById('cursor');
		// cursor.setAttribute('color', '#f1c40f');
		// cursor.setAttribute('scale', '1.5 1.5 1.5');
	}

	handleMouseLeave = (event) => {
		// console.log('mouseleave!');
		let me = event.target;
		let kids = me.firstChild;
		let grandkids = kids.firstChild;

		kids.setAttribute('scale', '0 0 0');
		me.setAttribute('animation__rotate',{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'})
		
		grandkids.setAttribute('value',this.props.data.label)
		// animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
	}

	// componentWillMount = () => {
	// 	// Write props passed from AnnotationAframe to state
	// 	this.setState(this.props.data);
	// }

	render () {
		console.log('Annotation render() --->');
		let { label, text, image, link, xAxis, yAxis, zAxis } = this.props.data;
		let { primitive,textScale,textPos,height,width, tScale, tPos } = this.props;
		// let { to,position, label,textScale,textPos, primitive,height,width, color,opacity,side } = this.props;

		// animation__rotate={{property: 'rotation', dur: 4000, loop: true, to: '360 360 360'}}
			return (
				<Entity 
					className="annotation-toggle box"
					geometry={{primitive: 'box', width: 0.3, height: 0.3, depth: 0.3}}
					material={{ color: '#3498db'}}
				
					events={{
						mouseenter: this.handleMouseEnter,
						mouseleave: this.handleMouseLeave,
						click: this.handleClick,
					}}
					position={{ x: xAxis, y: yAxis, z: zAxis }}
				>
					<Entity
						geometry={{ primitive, height, width }}
						material={{ color: '#9b59b6'}}
						className="annotation-text"
						look-at="#camera"
						scale={{x:0,y:0,z:0}}
					>
						<a-text
							value={ label }
							align="center"
							scale={textScale}
							position={textPos}
						/>
					</Entity>
				</Entity>
			);
		}
	
};

Annotation.defaultProps = {
	color: '#3498db',
	side: 'double',
	opacity: 1,
	primitive: 'plane',
	height: 1,
	width: 2.5,
	textScale: '1 1 1',
	textPos: '0 0 0',
	tScale: { x:1, y:1, z:1 },
	tPos: { x:0, y:0, z:0 }
}


export default Annotation;

{/* <a-text
	value={ label ? label : to.substring(1) } // If label, use that. But if not, use this.props.to (minus the hashtag),
	align="center"
	scale={textScale}
	position={textPos}
events={{
	mouseenter: this.handleMouseEnter,
	mouseleave: this.handleMouseLeave,
}} 
/>
*/}