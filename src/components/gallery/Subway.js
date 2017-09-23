import React, { Component } from "react";
import { Entity, Scene } from "aframe-react";

const Subway = props => {
    return (
        <a-scene embedded>
            <Entity 
                crossOrigin="anonymous"
                primitive="a-sky"
                src="https://s3-ap-southeast-1.amazonaws.com/sea-gallery/vrooms/directions-subway.jpg"
            />
            <a-text
                font="kelsonsans"
                value="Directions - NYC Subway"
                width="6"
                position="-2 4.3 -3.5"
                rotation="0 15 0"
            />
        </a-scene>
    );
};

export default Subway;
