import { Menu, Tabs } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import theme from '../../../../resources/styles/theme';

const TopTabBar = ({ current, menuList, onClick, btnObj, ...props }) => {
    const [state, setState] = useState({ current: 'all' });
    const { TabPane } = Tabs;
    const handleClick = key => {
        setState({ current: key });
        let key_ = key == 'all' ? '' : key;
        console.log(key_);
        onClick(key_);
    };

    return (
        <>
            <div className="tab_box subBrokerage">
                <Tabs defaultActiveKey="all" onChange={handleClick} {...props}>
                    {menuList.map(x => {
                        return <TabPane tab={x.title} key={x.key}></TabPane>;
                    })}
                </Tabs>
                {btnObj != null && (
                    <div className="btn" onClick={btnObj.onClick} style={btnObj.style}>
                        <img src={btnObj.icon} style={{ marginRight: 2, marginTop: -3 }} />
                        {btnObj.text}
                    </div>
                )}
            </div>
            <style jsx>{`
                .subBrokerage {
                    position: relative;
                }
                .btn {
                    position: absolute;
                    right: 28px;
                    top: 15px;
                    font-size: 14px;
                    color: #3f5372;
                    cursor: pointer;
                }
            `}</style>
            <style jsx global>
                {`
                .subBrokerage.tab_box .ant-tabs-nav{margin-bottom:0;background-color: #FFF;border: 1px solid #d7e0ef; border-width: 1px 1px 0 1px;}
                .subBrokerage.tab_box .ant-tabs-nav::before{display:none;}
                .subBrokerage.tab_box .ant-tabs-tab{font-size:16px;font-weight:700;0 25px 0 15px}
                .subBrokerage.tab_box .ant-tabs-tab:hover,
                .subBrokerage.tab_box .ant-tabs-tab-btn:active,.subBrokerage.tab_box .ant-tabs-tab-btn:focus,
                .subBrokerage.tab_box .ant-tabs-tab-remove:active,.subBrokerage.tab_box .ant-tabs-tab-remove:focus,
                .subBrokerage.tab_box .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{color:#daa360}
                .subBrokerage.tab_box .ant-tabs-ink-bar{background:#daa360;height: 4px;}
                .subBrokerage .ant-tabs-nav-wrap {padding:0 16px;}
                `}
            </style>
        </>
    );
};

export default TopTabBar;
