// import React from 'react';
import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import _ from 'lodash';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
function BreadcrumbLayout({ articleTitle, categoryName }) {
    // const routeList = useSelector(state => state.breadcrumb.routeList);
    const levelArr = useRef([]);
    const router = useRouter();
    const elementNameArr = useRef([]);
    const elementPathArr = useRef([]);

    const BreadcrumbItemHandler = useCallback(() => {
        elementNameArr.current = [];
        elementPathArr.current = [];
        levelArr.current = router.pathname.split('/');
        levelArr.current.splice(0, 1);
        levelHandler();
        if (categoryName != null && categoryName !== '') {
            elementNameArr.current.push(categoryName);
            elementPathArr.current.push('');
        }
        if (articleTitle != null && articleTitle !== '') {
            elementNameArr.current.push(articleTitle);
            elementPathArr.current.push('');
        }
        _.uniq(elementPathArr);
        _.uniq(elementNameArr);
        return elementNameArr.current;
    }, [router.pathname, articleTitle, categoryName]);

    const levelHandler = () => {
        if (levelArr.current.length > 0) {
            pathHandler(levelArr.current[0]);
            levelArr.current.splice(0, 1);
            levelHandler();
        }
        return elementNameArr.current;
    };

    const pathHandler = str => {
        switch (str) {
            case 'customer-support':
                elementNameArr.current.push('客戶支援');
                elementPathArr.current.push(`/${levelArr.current[0]}`);
                break;
            case 'search-result':
                elementNameArr.current.push('搜尋結果');
                elementPathArr.current.push(`/${levelArr.current[0]}`);
                break;
            case 'question':
                elementNameArr.current.push('常見問題');
                elementPathArr.current.push(`/${levelArr.current[0]}`);
                break;
            case 'financial-product':
                elementNameArr.current.push('理財商品');
                if (router.query.categoryCode) {
                    elementPathArr.current.push(
                        `/${levelArr.current[0]}?category=${router.query.category}&categoryCode=${router.query.categoryCode}`,
                    );
                } else {
                    elementPathArr.current.push(`/${levelArr.current[0]}`);
                }
                break;
            case 'trading-platform':
                elementNameArr.current.push('交易平台');
                if (router.query.categoryCode) {
                    elementPathArr.current.push(
                        `/${levelArr.current[0]}?category=${router.query.category}&categoryCode=${router.query.categoryCode}`,
                    );
                } else {
                    elementPathArr.current.push(`/${levelArr.current[0]}`);
                }
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Breadcrumb className="site-breadcrumb">
                {BreadcrumbItemHandler().map((item, index) => {
                    if (index !== BreadcrumbItemHandler().length - 1) {
                        let pathArr = _.clone(elementPathArr.current);
                        pathArr.splice(index + 1);
                        return (
                            <Breadcrumb.Item key={index}>
                                <Link href={pathArr.join('')} key={index}>
                                    <a>{item}</a>
                                </Link>
                            </Breadcrumb.Item>
                        );
                    } else {
                        return (
                            <Breadcrumb.Item key={index}>
                                <span>{item}</span>
                            </Breadcrumb.Item>
                        );
                    }
                })}
                {/* {routeList.map((breadcrumb, idx) => (
                    <Breadcrumb.Item key={idx}>
                        {breadcrumb.path ? (
                            <a href={breadcrumb.path}>{breadcrumb.pageName}</a>
                        ) : (
                            <span>{breadcrumb.pageName}</span>
                        )}
                    </Breadcrumb.Item>
                ))} */}
            </Breadcrumb>
            <style jsx global>{`
                .site-breadcrumb {
                    width: 100%;
                    margin: 18px auto;
                    font-size: 14px !important;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }

                .ant-breadcrumb a {
                    color: #a9b6cb;
                }

                .ant-breadcrumb span {
                    color: #3f5372;
                }

                // @media screen and (max-width: 1024px) {
                //     .site-breadcrumb {
                //         width: 90%;
                //     }
                // }

                @media screen and (max-width: 450px) {
                    .site-breadcrumb {
                        display: none;
                    }
                }

                .ant-breadcrumb-link:hover > a {
                    color: #daa360;
                }
            `}</style>
        </>
    );
}

export default BreadcrumbLayout;

BreadcrumbLayout.propTypes = {
    articleTitle: PropTypes.string,
    categoryName: PropTypes.string,
};
