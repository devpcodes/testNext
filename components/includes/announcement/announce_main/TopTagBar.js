import { Menu } from 'antd';
import { useState, useCallback, useEffect } from 'react';

// type: String；radio: 單選； checkbox: 多選
const TopTagBar = ({current , onClick}) => {
    const [state, setState] = useState({current: 'all'});

    const menuList = [
        {   title:'全部', key:'all'},
        {   title:'活動', key:'active'},
        {   title:'重大', key:'important'},
        {   title:'訊息', key:'messege'},
        {   title:'平台', key:'platform'},]

    const handleClick = e => {
        setState({current:e.key});
            if(e.key=='all'){
                onClick('')
            }else{
        menuList.map(x=>{
            if(x.key===e.key){
                onClick(x.title)
            }
        })            
        }};      

    return (
        <>
        <div className="menu_box announce_menu">
        <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
            {
                menuList.map(x=>{
                    return(
                  <Menu.Item key={x.key} value={x.title}>
                    {x.title}
                  </Menu.Item>                        
                    )
                })
            }
        </Menu>
        </div>
        <style jsx global>
                {`
                .announce_menu.menu_box{border-width:1px 1px 0 1px;border-color:#e6ebf5; border-style:solid;}
                .announce_menu  .ant-menu-horizontal{ border-bottom: none;}
                .announce_menu .ant-input-search-button{background-color:#c43826; border:#c43826;}
                .announce_menu .ant-input-search-button:hover{background-color:#c43826; border:#c43826;filter: brightness(1.2);}
                .announce_menu .ant-menu-horizontal>.ant-menu-item{line-height:60px;font-size:16px;}
                .announce_menu .ant-menu-horizontal>.ant-menu-item:hover:after,
                .announce_menu .ant-menu-horizontal>.ant-menu-item-selected:after{border-bottom:4px solid #daa360 !important;}
                .announce_menu .ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-item-selected{color:#daa360 !important;}
                .announce_menu .ant-menu-horizontal>.ant-menu-item:not(.ant-menu-item-selected):hover:after{ display:none; }
                .announce_menu .ant-menu-horizontal>.ant-menu-item:after, .announce_menu .ant-menu-horizontal>.ant-menu-submenu:after {
                    position: absolute; right: 20px; bottom: 0; left: 20px; border-bottom: none; -webkit-transition: none; transition: none; content: ""; }
                .announce_menu .ant-menu-horizontal>.ant-menu-item-active, .announce_menu .ant-menu-horizontal>.ant-menu-item-open,
                .announce_menu .ant-menu-horizontal>.ant-menu-item-selected, .announce_menu .ant-menu-horizontal>.ant-menu-item:hover,
                .announce_menu .ant-menu-horizontal>.ant-menu-submenu-active, .announce_menu .ant-menu-horizontal>.ant-menu-submenu-open,
                .announce_menu .ant-menu-horizontal>.ant-menu-submenu-selected, .announce_menu .ant-menu-horizontal>.ant-menu-submenu:hover { border-bottom: none;}
                `}
        </style>
        </>
    );
};

export default TopTagBar;
