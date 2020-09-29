import Link from 'next/link';

import Navbar from './navbar/navbar';
import { HeaderCallToAction } from './headerCallToAction/HeaderCallToAction';

import logo from '../../resources/images/components/header/sinopac_securities_logo.png';
import theme from '../../resources/styles/theme';

const Header = () => {
    return (
        <header>
            
            <div className="header__navbar">
                <div className="navbar__switch__m"></div>
                <Link href="/">
                    <a className="header__logo">
                        <img src={logo}></img>
                    </a>
                </Link>
                <Navbar />
                <HeaderCallToAction />
            </div>
            <style jsx>{`
                header {
                    height: 70px;
                    background: #0d1623;
                }
                .header__navbar {
                    width: ${theme.contentWidth.pc};
                    height: 100%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                }
                .navbar__switch__m {
                    width:70px;
                    height:70px;
                    background : #FFF; 
                    display: none;
                    cursor: pointer;
                }
                .header__logo {
                    display: inline-block;
                    width: 158px;
                    height: 38px;
                    margin: 16px 0;
                    background-size: 158px 38px;
                }
                @media (max-width:1250px) {
                    .header__navbar {
                        width: 90%;
                    }
                }
                @media (max-width:1112px) {
                    .header__navbar {
                        width: 100%;
					}
					.header__logo { 
						margin: 16px 0 16px 10px;
					}
                }
                
                @media (max-width:1024px) {
                    .navbar__switch__m {
                        display:block;
                    }
				}
				
            `}</style>
        </header>
    );
};

export default Header;
