import React, {Component} from "react";
import { Link } from "react-router-dom";

// Authentication Imports
import Modal from "../common/CustomModal";
import LoginForm from "../authentication/LoginForm";
import cookie from 'react-cookies';
import API from "../../utils/API";


// const Navbar = (this.props) => (
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInClicked: false,
			addClass: false
		}
	}
	
	//if .js-open-menu is clicked, toggle .js-open-menu-btn & .js-mobile-menu 
	toggle(){
		this.setState({addClass: !this.state.addClass});
	}

	componentWillMount() {
		console.log("USer == ",cookie.loadAll());
    	this.state =  { sessionId: cookie.load('connect.sid'), email: cookie.load("email") };
  }
	handleAuth = (event) =>{
		event.preventDefault();
		this.setState({signInClicked:true});
		// this.forceUpdate();
	}

	handleLogout = (event) =>{
		event.preventDefault();
		cookie.remove("connect.sid", {path:'/'});
		cookie.remove("email", {path:'/'});
		API.logout().then(res => {
			this.setState({sessionId:"", email: ""});
		});

	}

	render() {

		let mobileClassBtn = ["js-open-menu-btn"];
		let mobileClassMenu = ["js-mobile-menu"];
		if(this.state.addClass) {
			mobileClassBtn.push('active');
			mobileClassMenu.push('active');
		}

		return (
			<div className={"navigation navigation--main--gradient "+ this.props.theme}>
				<div className="navigation-wrapper">
				<Link to="/" className="navigation__logo-link emerge" data-duration="600" data-effect="slide" data-right="64px"  >
					<img className="navigation__logo" width="220" src={"/assets/img/logo/"+this.props.logo_filename+".png"} alt="VRooms" /> 
				</Link>
				<div className="navigation-mobile js-open-menu" onClick={this.toggle.bind(this)}>
					<div className={"navigation-mobile__icon" + ' ' + mobileClassBtn.join( ' ')}></div>
				</div>

				<div className={"mobile-menu" + ' ' + mobileClassMenu.join( ' ')}>
					<a href="/about" className="mobile-menu__link text--white text--bold a-submenu" data-page-name="Agents">About</a>
					<a href="/agents" className="mobile-menu__link text--white text--bold a-submenu" data-page-name="Agents">Agents</a>
					<a href="/showcase" className="mobile-menu__link text--white text--bold ">Showcase</a>
					<a href="/contact" className="mobile-menu__link text--white text--bold ">Contact us</a>

					<div className="mobile-menu-btn-wrapper">
						<a data-auth="no" href="/login" className="mobile-menu__btn navigation-menu__sign_in a-login">sign in</a>
					</div>
				</div>
				
				<nav className="navigation-menu emerge" data-duration="600" data-effect="slide" data-left="64px">
					<Link to="/about" className="navigation-menu__link uppercase">About</Link>
					<Link to="/agents" className="navigation-menu__link uppercase">Agents</Link>
					<Link to="/showcase" className="navigation-menu__link uppercase">Showcase</Link>
					<Link to="/contact" className="navigation-menu__link uppercase">Contact Us</Link>
					<Link to="/new-vroom" className="navigation-menu__link uppercase">New</Link>

					{(this.state.sessionId && this.state.email) ? 
						
						(<Link 
							to="/logout" 
							data-auth="no" 
							className="navigation-menu__sign_in a-login" 
							onClick={this.handleLogout}
						> 
							Logout 
						</Link>)
					: (
						<div>
							<Link rel="signup" to="/signup" className="navigation-menu__link navigation-menu__link--hidden navigation-menu__link--lng a-signup">sign up</Link>
							<Link 
								to="/login" 
								data-auth="no" 
								className="navigation-menu__sign_in a-login" 
								onClick={this.handleAuth}
							> 
								Login 
							</Link>
						</div>
						)	
				
					}
					
				</nav>
				</div>

				
				{this.state.signInClicked ? (
					<Modal
						ref={node => {
							this.modal = node;
						}}
						modalIsOpen={true}
						title="Login"
					>
						<LoginForm />
					</Modal>
				) : null}
			</div>
		)
	}
}
export default Navbar;
