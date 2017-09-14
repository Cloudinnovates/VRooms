import React from 'react';
import {Helmet} from "react-helmet";
import Navbar from './common/Navbar';
// import AboutCSS from './styles/About.css';
// require('./styles/About.css');

// class About extends React.Component {
	// constructor(props) {
	//   super(props);
  
	//  }
	// render() {
	//   return (
const About = (props) => {
	return (
      <div className="application">
        {/* Helmet =========================================================*/}
          <Helmet>
            <title>About VRooms</title>

            {/* customized script elements */}
            <script src="/js/drift.js" type="text/javascript"></script>
			
            {/* CSS links for this page */}
            <link rel="stylesheet" href="/css/pagestyle.css"></link>
            <link rel="stylesheet" href="/css/pages/About.css"></link>
			
          </Helmet>

              <div className="aboutWrapper">  

                <Navbar logo_filename="VRooms_V11_Hori_White" theme="opaque-black-bg"/>

                <div className="marketing">
                  <section className="section-features" id="application-home-benefits">
                    <div className="row expanded text--black">
                      <div className="small-centered small-12 columns">
                        <h1>Discover the Power of Virtual Reality Using VRooms</h1>
                      </div>
                      <div className="small-12 columns feature-container">
                        <div className="small-12 large-6 columns feature-content left">
                          <div className="feature-text">
                            <h5>Engage</h5>
                            <p>Lucas ipsum dolor sit amet maul dooku gamorrean kessel sith moff organa cade moff jango. Sidious lando solo dagobah ackbar calamari. Obi-wan hutt anakin organa tatooine moff mace. Solo greedo darth dagobah jabba coruscant dagobah organa wedge.</p>
                            <hr className="benefit-divider-1" />
                          </div>
                        </div>
                        <div className="small-12 large-6 columns image-right">
                          <img className="feature-img js-application-home-benefits-1-img" src="/assets/img/marketing/1.jpg" alt="Feature1" />
                        </div>
                      </div>
                      <div className="small-12 columns feature-container">
                        <div className="small-12 large-6 columns image-left">
                          <img className="feature-img js-application-home-benefits-2-img" src="/assets/img/marketing/2.jpg" alt="Feature2" />
                        </div>
                        <div className="small-12 large-6 columns feature-content">
                          <div className="feature-text">
                            <h5>Improve</h5>
                            <p>Lucas ipsum dolor sit amet maul dooku gamorrean kessel sith moff organa cade moff jango. Sidious lando solo dagobah ackbar calamari. Obi-wan hutt anakin organa tatooine moff mace. Solo greedo darth dagobah jabba coruscant dagobah organa wedge. </p>
                            <hr className="benefit-divider-2" />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </section>
                </div>  

                





          </div>

          
      </div>
    // );
//   }
	)
}

export default About;


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



