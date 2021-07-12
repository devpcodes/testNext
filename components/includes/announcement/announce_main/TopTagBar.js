import { Menu  } from 'antd';
import { useState, useCallback, useEffect } from 'react';

// type: String；radio: 單選； checkbox: 多選
const TopTagBar = ({current , onClick}) => {
    const [state, setState] = useState({current: current,value:''});
    const menuList = [
        {   title:'全部', key:''},
        {   title:'活動', key:'active'},
        {   title:'重大', key:'important'},
        {   title:'訊息', key:'messege'},
        {   title:'平台', key:'platform'},]

    const handleClick = e => {
        setState({current: e.key});
        console.log(e.key)
            if(e.key==''){
                onClick('')
            }else{
        menuList.map(x=>{
            if(x.key===e.key){
                onClick(x.title)
            }
        })            
        }
        };      

    return (
        <>
        <div className="menu_box">
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
                .menu_box{border-width:1px 1px 0 1px;border-color:#e6ebf5; border-style:solid;}
                .ant-input-search-button{background-color:#c43826; border:#c43826;}
                .ant-input-search-button:hover{background-color:#c43826; border:#c43826;filter: brightness(1.2);}
                .ant-menu-horizontal>.ant-menu-item{line-height:60px;font-size:16px;}
                .ant-menu-horizontal>.ant-menu-item:hover:after,
                .ant-menu-horizontal>.ant-menu-item-selected:after{border-bottom:4px solid #daa360 !important;}
                .ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-item-selected{color:#daa360 !important;}
                .ant-menu-horizontal>.ant-menu-item:not(.ant-menu-item-selected):hover:after{ display:none; }
                `}
            </style>
        </>
    );
};

export default TopTagBar;
