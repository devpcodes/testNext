import { Menu, Tabs } from 'antd';
import { useState, useCallback, useEffect } from 'react';

// type: String；radio: 單選； checkbox: 多選
const TopTagBar = ({ current, onClick }) => {
    const [state, setState] = useState({ current: 'all' });
    const { TabPane } = Tabs;
    const menuList = [
        { title: '全部', key: 'all' },
        { title: '活動', key: 'active' },
        { title: '重大', key: 'important' },
        { title: '訊息', key: 'messege' },
        { title: '平台', key: 'platform' },
    ];

    const handleClick = (key) => {
        setState({ current: key });
        console.log(key)
        if (key == 'all') {
            onClick('');
        } else {
            menuList.map(x => {
                if (x.key === key) {
                    onClick(x.title);
                }
            });
        }
    };

    return (
        <>
            <div className="menu_box announce_menu">
                <Tabs 
                defaultActiveKey="all" 
                onChange={handleClick}
                tabBarGutter={44}
                >
                    {menuList.map(x => {
                        return (
                            <TabPane tab={x.title} key={x.key}>
                            </TabPane>
                        );
                    })}
                </Tabs>
            </div>
            <style jsx global>
                {`
                    .announce_menu.menu_box {
                        border-width: 1px 1px 0 1px;
                        border-color: #e6ebf5;
                        border-style: solid;
                        padding-left:45px;
                        background:#FFF;
                    }
                    
                    .announce_menu.menu_box .ant-tabs-tab{font-size:16px;}
                    .announce_menu.menu_box .ant-tabs-nav:before{display:none;}
                    .announce_menu.menu_box .ant-tabs-ink-bar {background:rgb(218, 163, 96);height:4px;}
                    .announce_menu.menu_box .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
                        color:rgb(218, 163, 96);}

                    .announce_menu .ant-input-search-button {
                        background-color: #c43826;
                        border: #c43826;
                    }
                    .announce_menu .ant-input-search-button:hover {
                        background-color: #c43826;
                        border: #c43826;
                        filter: brightness(1.2);
                    }
                    .ant-tabs-bottom>.ant-tabs-nav, 
                    .ant-tabs-bottom>div>.ant-tabs-nav, 
                    .ant-tabs-top>.ant-tabs-nav, 
                    .ant-tabs-top>div>.ant-tabs-nav{
                        margin:0;
                    }
                `}
            </style>
        </>
    );
};

export default TopTagBar;
