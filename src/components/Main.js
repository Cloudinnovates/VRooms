import React, { Component } from "react";
import {Helmet} from "react-helmet";
// import { Link } from "react-router";
// import Navbar from "./common/Navbar";
// import Footer from "./common/Footer";

import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import LoginModal from "./LoginModal";


require('./styles/Main.css');

class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
      return (

        <div className="application">
            <Helmet>
              {/* customized script elements */}
              <script src="/js/drift.js" type="text/javascript" />
                
            </Helmet>
            
          <div className="wrapper">

              <video className="video-container video-container-overlay" id="video-background" autoPlay="true">
                <source src="https://s3.amazonaws.com/vrooms/splashintro.mp4" type="video/mp4" />
              </video>

                <div className="navigation navigation--main navigation--main--gradient">
                  <div className="navigation-wrapper">
                    <a href="/" className="navigation__logo-link emerge" data-duration="600" data-effect="slide" data-right="64px"  >
                      <img className="navigation__logo" width="220" src="/assets/img/logo/VRooms_V10_Hori_Gray.png" alt="VRooms" /> 
                    </a>
                    <div className="navigation-mobile js-open-menu">
                      <div className="navigation-mobile__icon js-open-menu-btn"></div>
                    </div>
                    <nav className="navigation-menu emerge" data-duration="600" data-effect="slide" data-left="64px">
                        <a href="/about" className="navigation-menu__link ">ABOUT</a>
                        <a href="/agents" className="navigation-menu__link ">AGENTS</a>
                        <a href="/showcase" className="navigation-menu__link ">SHOWCASE</a>
                        <a href="/contact" className="navigation-menu__link ">CONTACT US</a>

                        <a rel="signup" href="/signup" className="navigation-menu__link navigation-menu__link--hidden navigation-menu__link--lng a-signup">sign up</a>
                        <a data-auth="no" href="/login" className="navigation-menu__sign_in a-login">sign in</a>
                    </nav>
                  </div>
                </div>

                <div className="mobile-menu js-mobile-menu">
                    <a href="/about" className="mobile-menu__link text--white text--bold a-submenu" data-page-name="Agents">About</a>
                    <a href="/agents" className="mobile-menu__link text--white text--bold a-submenu" data-page-name="Agents">Agents</a>
                    <a href="/showcase" className="mobile-menu__link text--white text--bold ">Showcase</a>
                    <a href="/contact" className="mobile-menu__link text--white text--bold ">Contact us</a>

                  <div className="mobile-menu-btn-wrapper">
                      <a data-auth="no" href="https://watch.appfollow.io?ref=github.com" className="mobile-menu__btn navigation-menu__sign_in a-login">sign in</a>
                  </div>
                </div>

                <header className="header header--main js-header a-page" data-landing="yes" data-page="Home" data-page-name="Main">
                  <div className="description">
                    <h1 className="description__headline text--white emerge" data-duration="600" data-effect="slide" data-down="64px" data-hold="100">
                      Virtual Reality for Real Estate
                    </h1>
                    <span className="description__sub_headline text--white emerge" data-duration="600" data-effect="slide" data-down="64px" data-hold="100" data-continue="true">
                      Use VR to <strong>win</strong> more listings and <br />
                      <strong>stay ahead</strong> of your competition
                    </span>
                      
                  </div>

                </header>

          </div>
        </div>   
      );
  }    
}

export default Main;

const handleLoginModal = () =>{

  console.log("inside handle login",<Showcase />);
  return <Showcase />;
}

    // <Navbar />
    // {props.children}
    // <Footer />

// ================================================================================

     // Navigation link code for content refresh within same page
     // <ul className="nav navbar-nav">
     //    <li className={location.pathname === "/" && "active"}>
     //      <Link to="/">Home</Link>
     //    </li>
     //    <li className={location.pathname === "/favorites" && "active"}>
     //      <Link to="/favorites">Favorites</Link>
     //    </li>
     //  </ul>