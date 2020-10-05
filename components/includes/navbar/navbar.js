import React, { useState } from 'react';
import Link from 'next/link'
import theme from '../../../resources/styles/theme'
import NavList from "../navbar/navList"

const fakeHeaderData = [
    {title : "國內證券", 
        items: [
            {title: "下單", 
                items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    },
    {title : "海外投資",
        items: [
            {title: "下單", 
                items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    },
    {title : "期貨選擇權",
    items: [
        {title: "下單", 
            items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    },
    {title : "財富管理", 
    items: [
        {title: "下單", 
            items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    },
    {title : "客戶支援", 
    items: [
        {title: "下單", 
            items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    },
    {title : "法人專區",
    items: [
        {title: "下單22", 
            items: [
                    {title : "豐存台股", iconType: "HOT" },
                    {title : "借券專區", iconType: null },
                    {title : "股票申購", iconType: null },
                    {title : "競價拍賣", iconType: null },
                    {title : "公開收購", iconType: null },
                ]
            },
            {title: "報價", 
                items: [
                    {title : "大盤報價", iconType: null },
                    {title : "類股報價", iconType: null },
                    {title : "個股報價", iconType: null },
                    {title : "權證報價", iconType: null },
                    {title : "智慧選股", iconType: null },
                    {title : "Ai幫你顧", iconType: null },
                ]
            },
            {title: "商品", 
                items: [
                    {title : "國內債券", iconType: null },
                    {title : "ETN專區", iconType: null },
                    {title : "結構型商品", iconType: null },
                    {title : "投顧台股報告", iconType: null },
                    {title : "豐TV", iconType: null },
                    {title : "豐雲學堂", iconType: null },
                ]
            },
            {title: "資訊", 
                items: [
                    {title : "台股公佈欄", iconType: null },
                    {title : "理財行事曆", iconType: null },
                    {title : "財經新聞", iconType: null },
                    {title : "台股公告", iconType: null },
                ]
            },
        ]
    }
    
];

const Navbar = React.memo((props) => {
    return (
        <ul className="navbar">
            {fakeHeaderData.map((lv1Item, lv1Index) => (
                <li className="navbar__lv1__item" key={lv1Index}>
                    <Link href="/">
                        <a className="navbar__lv1__item__title">
                            <span className="active__mark"></span>
                            {lv1Item.title}
                        </a>
                    </Link>
                    <ul className="navbar__lv2" style={{ width:168*lv1Item.items.length }}>
                        {lv1Item.items.map((lv2Item, lv2Index) => (
                            <li className="navbar__lv2__item" key={lv2Index} >
                                <NavList navItems={lv1Item.items} lv2Data={lv2Item} twoColumnPX={1024}/>
                            </li>
                        ))}
                    </ul>
                    
                </li>
            ))}
            <style jsx>{`
                .navbar {
                    display: flex;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    vertical-align: top;
                    z-index: 1001;
                }
                .navbar__lv1__item {
                    width: 105px;
                    text-align:center;
                    display: flex;
                    flex-direction: column;
                    list-style: none;
                    font-size: 18px;
                    color: ${theme.colors.text};
                    height:100%;
                    position:relative;
                }
                .navbar__lv1__item__title {
                    position: relative;
                    width:100%;
                    height:100%;
                    line-height:70px;
                }
                .active__mark {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 5.5px 8px 5.5px;
                    border-color: transparent transparent ${theme.colors.secondary} transparent;
                    position: absolute;
                    bottom: 0;
                    left: calc(50% - 6px);
                    display:none;
                }

                .navbar__lv1__item__title:hover ,.navbar__lv1__item.active{
                    color: ${theme.colors.secondary};
                }
                .navbar__lv1__item__title:hover > .active__mark, .navbar__lv1__item.active .active__mark{
                    display:block;
                }
                .navbar__lv1__item:hover .navbar__lv2 { 
                    display:flex;
                }

                .navbar__lv2 {
                    margin:0;
                    padding:0;
                    display: none;
                    position:absolute;
                    top: 70px;
                    left: -180px;
                    padding: 18px 36px;
                    border-top: 6px solid ${theme.colors.secondary};
                    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
                    background: #FFF;
                    z-index: 1001;
                    text-align: left;
                }
    
                .navbar__lv2__item { 
                    list-style: none;
                    padding:0;
                    margin-right: 37px;
                    
                }
                .navbar__lv2__item:last-child {
                    margin-right: 0;
                }

                @media (max-width:1024px) {
                    .navbar {
                        background : ${theme.colors.darkBg};
                        flex-direction: column;
                        position: absolute;
                        height: auto;
                        width: 316px;
                        top: 70px;
                    }
                    .active__mark  {
                        display : none!important;
                    }
                    .navbar__lv1__item {
                        width:100%;
                        text-align:left;
                    }
                    .navbar__lv1__item__title {
                        padding: 0 30px;
                    }
                    .navbar__lv2 {
                        position: relative;
                        top: 0;
                        left: 0;
                        display: none;
                        width: 100%;
                        flex-direction: column;
                    }
                    .navbar__lv2__item {
                        margin: 0;
                    }
				}

            `}</style>
        </ul>
    )

});

export default Navbar;