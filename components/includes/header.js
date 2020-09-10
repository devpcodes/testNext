import React, { Component } from 'react';
import Navbar from "../includes/navbar/navbar";
import logo from "../../resorces/images/components/header/sinopac_securities_logo@3x.png";
import Link from 'next/link'

const contentWidth = "102.4rem";
class Header extends Component {
    // state = {
    //     current: 'mail',
	// };
	// handleClick = ({item, key}) => {
	// 	if(key === 'shoLogin'){
	// 		this.props.showLoginClick();
	// 	}
	// };
    render() {
        // const { current } = this.state;
        return (
          	<header>
            	<div className="header__navbar">
					<Link href="/">
						<a className="header_logo"></a> 
					</Link>
					<Navbar />
				</div>
            	<style jsx>{`
					header {
                		height: 70px;
                		background: #0d1623;
					}
					.header__navbar {
						width: ${contentWidth};
						height: 100%;
						margin: 0 auto;
						display: flex;
    					justify-content: space-between;
					}
					.header_logo {
						display:inline-block;
						width: 158px;
						height: 38px;
						margin: 16px 0;
						background: url(${logo}) no-repeat center center;
						background-size: 158px 38px;
					}
            	`}</style>
          </header>
        );
    }
}

export default Header;