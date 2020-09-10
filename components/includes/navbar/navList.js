import React, { Component } from 'react';
import Link from 'next/link'

const NavList = React.memo((props) => {
    return (
        <ul className="navbar__lv2">
            {props.navItems.map((lv2Item, lv2Index) => (
                <li className="navbar__lv2__item" key={lv2Index} >
                    <h6 className="navbar__lv2__item__title">{lv2Item.title}</h6>
                    <ul className="navbar__lv3">
                        {lv2Item.items.map((lv3Item, lv3Index) => (
                            <li className="navbar__lv3__item" key={lv3Index}>
                                <a className="navbar__lv3__item__title">{lv3Item.title}</a>
                                {/* <h6 className="navbar__lv3__item__title">{lv3Item.title}</h6>  icon*/}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
            <style jsx>{`
                .navbar__lv2 {
                    margin:0;
                    padding:0;
                    display:none; 
                    position:absolute;
                    top: 70px;
                    left: -180px;
                    width: fit-content;
                    display: flex;
                    padding: 18px 36px;
                    border-top: 6px solid #daa360;
                    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
                    background: #FFF;
                    z-index: 1001;
                    text-align: left;
                }
                .navbar__lv2__item { 
                    list-style: none;
                    width:122px;
                    padding:0;
                    margin-right: 37px;
                    
                }
                .navbar__lv2__item:last-child {
                    margin-right: 0;
                }
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
        </ul>
        
    )
});

export default NavList;