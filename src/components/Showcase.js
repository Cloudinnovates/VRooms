import React from 'react';
import {Helmet} from "react-helmet";
import Navbar from './common/Navbar';

import Loader from "./common/Loader";
import ShowcaseContent from "./content/ShowcaseContent";
// import AboutCSS from './styles/About.css';
// require('./styles/About.css');

// class About extends React.Component {
	// constructor(props) {
	//   super(props);
  
	//  }
	// render() {
	//   return (
const Showcase = (props) => {
	return (
      <div className="application">
        {/* Helmet =========================================================*/}
          <Helmet>
            <title>VRooms Showcase</title>

            {/* customized script elements */}
            <script src="/js/drift.js" type="text/javascript"></script>
			
            {/* CSS links for this page */}
            <link rel="stylesheet" href="/css/pages/About.css"></link>
			
          </Helmet>

              <div className="aboutWrapper">  

                <Navbar logo_filename="vrooms-logo-white" theme="opaque-black-bg"/>
                <Loader />

			          <ShowcaseContent />

              </div>  
      </div>
    // );
//   }
	)
}

export default Showcase;


// <header className="header header--main js-header a-page" data-landing="yes" data-page="Home" data-page-name="Main">
//   <div className="description">
//     <h1 className="description__headline text--white emerge" data-duration="600" data-effect="slide" data-down="64px" data-hold="100">
//       Virtual Reality for Real Estate
//     </h1>
//     <span className="description__sub_headline text--white emerge" data-duration="600" data-effect="slide" data-down="64px" data-hold="100" data-continue="true">
//       Use VR to <strong>win</strong> more listings and <br />
//       <strong>stay ahead</strong> of your competition
//     </span>
      
//   </div>

// </header>



