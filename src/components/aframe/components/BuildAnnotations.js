import React from "react";
import { withRouter } from "react-router-dom";
import Annotation from "./Annotation";
import AnnoLink from "./AnnoLink";
import ConstAnnoLink from "./ConstAnnoLink";
import { Entity } from "aframe-react";

const BuildAnnotations = props => {
	// const annos = props.annotations;
	// console.log('annos',annos);
	let annotationsToBuild = props.annotations;
	// console.log("annotationsToBuild", annotationsToBuild);

	return (
		<Entity>
			{annotationsToBuild.map((ea, index) => {
				if (ea.link) {
					return (
					<AnnoLink
						location={props.location}
						history={props.history}
						data={ea}
						key={index}
						inEditMode={this.props.inEditMode}
						/>
					);
				} 
				else {
					return (
					<Annotation 
						data={ea} 
						key={index}
						inEditMode={this.props.inEditMode}
						/>
					)
				}
			})}
		</Entity>
	);
};
export default withRouter(BuildAnnotations);
