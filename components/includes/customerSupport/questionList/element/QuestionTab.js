import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const QuestionTab = ({ children, categories, activeKey, defaultActiveKey, onTabsChange, ...props }) => {
    const { TabPane } = Tabs;

    return (
        <Tabs
            className="question-tab"
            defaultActiveKey={categories && categories[0].id}
            activeKey={activeKey}
            onChange={onTabsChange}
            categories={categories}
            key={activeKey}
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

export default QuestionTab;

QuestionTab.propTypes = {
    children: PropTypes.node,
    categories: PropTypes.array,
    defaultActiveKey: PropTypes.number,
    activeKey: PropTypes.string,
    onTabsChange: PropTypes.func,
};
