import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import ProductQuestionTable from '../../../financial-product/FinancialProductArticle/element/ProductQuestionTable';
import ProductFileTable from '../../../financial-product/FinancialProductArticle/element/ProductFileTable';

const QuestionTab = ({
    children,
    categories,
    activeKey,
    onTabsChange,
    isFinancialProduct,
    keywords,
    attachments,
    ...props
}) => {
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
            {isFinancialProduct ? (
                <>
                    <TabPane tab="常見問題" key="commonQuestion">
                        <ProductQuestionTable keywords={keywords} />
                    </TabPane>
                    <TabPane tab="相關下載" key="fileDownload">
                        <ProductFileTable dataSource={attachments} />
                    </TabPane>
                </>
            ) : (
                ''
            )}
        </Tabs>
    );
};

export default QuestionTab;

QuestionTab.propTypes = {
    children: PropTypes.node,
    categories: PropTypes.array,
    onTabsChange: PropTypes.func,
    isFinancialProduct: PropTypes.bool,
    keywords: PropTypes.string,
    attachments: PropTypes.array,
};
