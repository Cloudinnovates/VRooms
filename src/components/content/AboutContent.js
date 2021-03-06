import React, {Component} from "react";
import { Link } from "react-router-dom";

// const Navbar = (this.props) => (
class AboutContent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
        const ele = document.getElementById('ipl-progress-indicator')
        if(ele){
          setTimeout(() => {
            ele.classList.add('available')
            setTimeout(() => {
              ele.outerHTML = ''
            }, 1000)
          }, 500)
		}
    }

	render() {

		return (
            <div className="marketing">
                  <section className="section-features" id="application-home-benefits">
                    <div className="row expanded text--black">
                      <div className="small-centered small-12 columns">
                        <h1>Discover the Power of Virtual Reality Using VRooms</h1>
                      </div>
                      <div className="small-12 columns feature-container">
                        <div className="small-12 large-6 columns feature-content left">
                          <div className="feature-text">
                            <h3>Engage</h3>
                            <h5>
                                Say hello to the next generation of homebuying. 
                                Engage buyers by providing the most immersive and realistic way to view listings on web, mobile, and virtual reality.</h5>
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
                            <h3>Improve</h3>
                            <h5>Get innovative, reach out to overseas investors, increase your selling efficiency </h5>
                            <hr className="benefit-divider-2" />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </section>

                  <section className="benefits-header cta-module">
                    <div className="row expanded">
                      <div className="small-12 medium-12 columns cta-content">
                        <h3>Be the Market Leader! Get VRooms!</h3>
                        <a className="button" href="/signup" id="marketing-signup">Sign Up</a>
                      </div>
                    </div>
                  </section>

                  <section className="testimonials">
                    <div className="row expanded">
                      <div className="small-centered small-12 columns">
                        <h4>What Our Founding Team Is Excited About</h4>
                        <div className="row small-up-1 medium-up-4">
                        <div className="column column-block">
                            <img className="float-center customer-img" src="/assets/img/team/novia.png" alt="Novia Lim" />
                            <h6>“We are really excited to make virtual reality accessible to everyone, from novices to the tech-savvy. VRooms breaks down the restrictions of the      traditional home-buying process and revolutionizes the real estate industry. Join us now to increase your sales efficiency and maximise your customer engagement!”</h6>
                            <p className="foundername"><strong>Novia Lim-Sampson</strong></p>
                            <p>Founder & CEO</p>
                          </div>
                          <div className="column column-block">
                            <img className="float-center customer-img" src="/assets/img/team/wayne.png" alt="Wayne Cheng" />
                            <h6>“According to Silicon Valley (on HBO), VR is like all the rage these days, so that’s why I’m doing this.”</h6>
                            <p className="foundername"><strong>Wayne Cheng</strong></p>
                            <p>Founding Partner & C3PO</p>
                          </div>
                          <div className="column column-block">
                            <img className="float-center customer-img" src="/assets/img/team/joseph.png" alt="Joseph Huynh" />
                            <h6>“VR is an emerging technology that has widespread applications in numerous industries, giving the user a
                            degree of immersion that has never been experienced before. As a technology enthusiast, I'm excited at the 
                            current possibilities it offers and look forward to seeing the advances in the coming years as the technology matures.”</h6>
                            <p className="foundername"><strong>Joseph Huynh</strong></p>
                            <p>Founding Partner & CTO</p>
                          </div>
                          <div className="column column-block">
                            <img className="float-center customer-img" src="/assets/img/team/priyanka.png" alt="Priyanka Arora" />
                            <h6>“Virtual reality is a computer-generated environment that lets you experience a different dimension.
                                What VR opens up is an entirely new way to share an experience by letting you share a sense of place and presence, which we can not experience from conventional 2d photo.”</h6>
                            <p className="foundername"><strong>Priyanka Arora</strong></p>
                            <p>Founding Partner & COO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
		)
	}
}
export default AboutContent;
