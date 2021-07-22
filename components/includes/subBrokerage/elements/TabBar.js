import { Menu, Tabs } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import theme from '../../../../resources/styles/theme';

const TabBar = ({ current, menuList, onClick }) => {
    const [state, setState] = useState({ current: 'all' });
    const { TabPane } = Tabs;
    const handleClick = (key) => {
        setState({ current: key });
        let key_ = key == 'all'? '':key
        console.log(key_)
        onClick(key_);
    };

    return (
        <>
            <div className="tab_box subBrokerage">
                <Tabs 
                defaultActiveKey="all" 
                onChange={handleClick}
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
                .subBrokerage.tab_box {padding:0 16px;}
                .subBrokerage.tab_box .ant-tabs-nav{margin-bottom:0;}
                `}
            </style>
        </>
    );
};

export default TabBar;
