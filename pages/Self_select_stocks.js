import React, { useState, memo, useEffect, useCallback } from 'react';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SelfSelectToolBar from '../components/includes/selfSelect/SelfSelectToolBar';
import SelfSelectTable from '../components/includes/selfSelect/SelfSelectTable';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const noNewwebHeader = true;
function Self_select_stocks() {
    const [count, setCount] = useState('--');

    const reloadCount = useCallback(listCount => {
        setCount(listCount);
    });

    return (
        <>
            {noNewwebHeader ? <Header /> : ''}
            <div className="select__box">
                <SelfSelectToolBar count={count} />
                <PageHead title={'我的自選'} />
                <div className="select__list__box">
                    <SelfSelectTable reloadCount={reloadCount} />
                </div>
            </div>

            <style jsx>{`
                .select__box {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 15px 22px 15px;
                }

                .select__list__box {
                    border: solid 1px #e6ebf5;
                    margin-top: 22px;
                }
            `}</style>
            <style jsx global>{`
                .ant-tabs-bottom > .ant-tabs-nav:before,
                .ant-tabs-bottom > div > .ant-tabs-nav:before,
                .ant-tabs-top > .ant-tabs-nav:before,
                .ant-tabs-top > div > .ant-tabs-nav:before {
                    border-bottom: 0;
                }
                .ant-tabs-top > .ant-tabs-nav {
                    margin: 0;
                }
            `}</style>
        </>
    );
}

if (noNewwebHeader) {
    Self_select_stocks.getLayout = Page => Page;
}
export default Self_select_stocks;
