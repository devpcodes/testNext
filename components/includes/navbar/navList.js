import React, { Component } from 'react';
import Link from 'next/link'

const NavList = React.memo((props) => {
    console.log(props.open)
    return (
            <div>
                <h6 className="navbar__lv2__item__title">{props.lv2Data.title}</h6>
                <ul className="navbar__lv3">
                    {props.lv2Data.items.map((lv3Item, lv3Index) => (
                        <li className="navbar__lv3__item" key={lv3Index}>
                            <a className="navbar__lv3__item__title">{lv3Item.title}</a>
                            {/* <h6 className="navbar__lv3__item__title">{lv3Item.title}</h6>  icon*/}
                        </li>
                    ))}
                </ul>
            
                <style jsx>{`  
                    .navbar__lv2__item__title {
                        font-size: 16px;
                        color: #daa360;
                        border-bottom: 2px dotted #daa360;
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
                        color: #0d1623;
                        display: block;
                    }
                `}</style>
            </div>
        
    )
});

export default NavList;