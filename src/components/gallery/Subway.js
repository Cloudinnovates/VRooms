import React, { Component } from "react";
import { Entity, Scene } from "aframe-react";

const Subway = props => {
    const room_url =
    "https://s3-ap-southeast-1.amazonaws.com/sea-gallery/vrooms/directions-subway.jpg?v=132";

  return (
    <a-scene embedded crossOrigin="anonymous">
      <a-assets>
        <img id="asset-scene-url" src={room_url} />
      </a-assets>
      <a-sky crossOrigin="anonymous" src="#asset-scene-url" />
    
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
