import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const CustomerTab = ({ children, categories, activeKey, onTabsChange, ...props }) => {
    const { TabPane } = Tabs;

    return (
        <Tabs
            defaultActiveKey={categories && categories[0].id}
            activeKey={activeKey}
            className="tabs"
            onChange={onTabsChange}
            {...props}
        >
            {categories &&
                categories.map(category => {
                    return (
                        <TabPane tab={category.categoryName} key={category.id}>
                            {children}
                        </TabPane>
                    );
                })}
        </Tabs>
    );
};

export default CustomerTab;

CustomerTab.propTypes = {
    children: PropTypes.node,
    categories: PropTypes.array,
    activeKey: PropTypes.number,
    onTabsChange: PropTypes.func,
};
