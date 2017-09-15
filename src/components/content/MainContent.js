import React, {Component} from "react";
import { Link } from "react-router-dom";
import { default as Fade } from 'react-fade'

import Navbar from "../common/Navbar";

const fadeDuration = 10

// const Navbar = (this.props) => (
class MainContent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fadeOut: false,
			visibility: 'visible'
		}
	}

	componentDidMount(){
        const ele = document.getElementById('ipl-progress-indicator')
        if(ele){
          setTimeout(() => {
            ele.classList.add('available')
            setTimeout(() => {
              ele.outerHTML = ''
            }, 2000)
          }, 1000)
		}

		setTimeout(() => {
            this.setState({ fadeOut: true })
          }, 1000)
    }

	render() {

		return (
			<div className="wrapper">

				<Fade
					out={this.state.fadeOut}
					duration={fadeDuration}
					style={{
						visibility: this.state.visibility
					}}
					>
					
					

					<video
						className="video-container video-container-overlay"
						id="video-background"
						autoPlay="true"
					>
						<source
							src="./assets/video/splashintro.mp4"
							type="video/mp4"
						/>
					</video>

					<Navbar
						logo_filename="VRooms_V11_Hori_Gray"
						theme="opaque-white-bg"
					/>

					<header
						className="header header--main js-header a-page"
						data-landing="yes"
						data-page="Home"
						data-page-name="Main"
					>
						<div className="description">
							<h1
								className="description__headline text--white emerge"
								data-duration="600"
								data-effect="slide"
								data-down="64px"
								data-hold="100"
							>
								Virtual Reality for Real Estate
							</h1>
							<span
								className="description__sub_headline text--white emerge"
								data-duration="600"
								data-effect="slide"
								data-down="64px"
								data-hold="100"
								data-continue="true"
							>
								Use VR to <strong>win</strong> more listings and{" "}
								<br />
								<strong>stay ahead</strong> of your competition
							</span>
						</div>
					</header>

				</Fade>	
			</div>
		)
	}
}
export default MainContent;
