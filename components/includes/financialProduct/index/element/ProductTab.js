import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const ProductTab = ({ children, categories, activeKey, defaultActiveKey, onTabsChange, ...props }) => {
    const { TabPane } = Tabs;

    return (
        <>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                activeKey={activeKey}
                className="product-tabs"
                onChange={onTabsChange}
                {...props}
            >
                {categories &&
                    categories.map(category => {
                        return (
                            <TabPane tab={category.categoryName} key={category.categoryCode}>
                                {children}
                            </TabPane>
                        );
                    })}
            </Tabs>
            <style jsx global>
                {`
                    .ant-layout {
                        background: #f9fbff !important;
                    }

                    .product-tabs {
                        background-color: #f9fbff;
                    }

                    // the tab bottom line
                    .product-tabs .ant-tabs-bottom > .ant-tabs-nav:before,
                    .ant-tabs-bottom > div > .ant-tabs-nav:before,
                    .ant-tabs-top > .ant-tabs-nav:before,
                    .ant-tabs-top > div > .ant-tabs-nav:before {
                        border-bottom: 1px solid #d7e0ef;
                        width: 96%;
                        margin: auto;
                    }

                    .product-tabs .ant-tabs-nav-list {
                        margin: auto;
                    }

                    @media screen and (max-width: 450px) {
                        .product-tabs {
                            background-color: white;
                        }

                        .product-tabs .ant-tabs-bottom > .ant-tabs-nav:before,
                        .ant-tabs-bottom > div > .ant-tabs-nav:before,
                        .ant-tabs-top > .ant-tabs-nav:before,
                        .ant-tabs-top > div > .ant-tabs-nav:before {
                            width: 100%;
                        }
                    }

                    .product-tabs .ant-tabs-tab div {
                        font-size: 20px;
                        font-weight: normal;
                        color: #0d1623;
                    }

                    .product-tabs .ant-tabs-tab {
                        margin: 0 25px;
                    }

                    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: #daa360 !important;
                    }

                    .ant-tabs-tab:hover {
                        color: #daa360 !important;
                    }

                    .ant-tabs-ink-bar {
                        height: 4px !important;
                        background: #daa360 !important;
                    }

                    @media screen and (max-width: 1024px) {
                        .product-tabs {
                            margin-top: 20px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-tabs {
                            margin-top: 0;
                        }

                        .product-tabs .ant-tabs-tab div {
                            font-size: 16px;
                        }

                        .ant-tabs-bottom > .ant-tabs-nav,
                        .ant-tabs-bottom > div > .ant-tabs-nav,
                        .ant-tabs-top > .ant-tabs-nav,
                        .ant-tabs-top > div > .ant-tabs-nav {
                            margin: 0;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ProductTab;

ProductTab.propTypes = {
    children: PropTypes.node,
    categories: PropTypes.array,
    defaultActiveKey: PropTypes.string,
    onTabsChange: PropTypes.func,
};
