import Link from 'next/link';

import Navbar from './navbar/navbar';
import { HeaderCallToAction } from './headerCallToAction/HeaderCallToAction';

import logo from '../../resources/images/components/header/sinopac_securities_logo.png';

const contentWidth = '102.4rem';

const Header = () => {
    return (
        <header>
            <div className="header__navbar">
                <Link href="/">
                    <a className="header_logo">
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
                    width: ${contentWidth};
                    height: 100%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                }
                .header_logo {
                    display: inline-block;
                    width: 158px;
                    height: 38px;
                    margin: 16px 0;
                    background-size: 158px 38px;
                }
            `}</style>
        </header>
    );
};

export default Header;
