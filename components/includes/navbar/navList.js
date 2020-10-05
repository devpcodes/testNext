import { useState } from 'react';
import { useSelector } from 'react-redux';

import theme from '../../../resources/styles/theme'
import Link from 'next/link'

const NavList = React.memo((props) => {
    const isMobile = useSelector((store) => store.layout.isMobile);
    const [lv3MobileVisible, setLv3MobileVisible] = useState(false);
    const clickHandler = () => {
        setLv3MobileVisible(!lv3MobileVisible);
    }

    return (
            <div className="navlist">
                <h6 className={`navbar__lv2__item__title ${isMobile && !lv3MobileVisible ? 'navbar__lv2__item__title--hide' : ''}`} onClick={clickHandler}>{props.lv2Data.title}</h6>
                <ul className={`navbar__lv3 ${isMobile && !lv3MobileVisible ? 'navbar__lv3--hide' : ''}`}>
                    {props.lv2Data.items.map((lv3Item, lv3Index) => (
                        <li className="navbar__lv3__item" key={lv3Index}>
                            <a className="navbar__lv3__item__title">{lv3Item.title}</a>
                            {/* <h6 className="navbar__lv3__item__title">{lv3Item.title}</h6>  icon*/}
                        </li>
                    ))}
                </ul>
            
                <style jsx>{`  
                    .navlist {
                        width:122px;
                    }

                    .navbar__lv2__item__title {
                        font-size: 16px;
                        color: ${theme.colors.secondary};
                        border-bottom: 2px dotted ${theme.colors.secondary};
                        padding: 0 0 10px 0;
                        margin: 0 0 18px 0;
                        font-weight: bold;
                    }
                    
                    .navbar__lv3 {
                        list-style: none;
                        padding:0;
                    }

                    .navbar__lv3__item {
                        margin: 8px 0;
                    }

                    .navbar__lv3__item__title {
                        font-size: 16px;
                        color: ${theme.colors.darkBg};
                        display: block;
                    }
                `}</style>
            </div>
        
    )
});

export default NavList;