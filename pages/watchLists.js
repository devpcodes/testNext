import React, { useState, memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SelfSelectToolBar from '../components/includes/selfSelect/SelfSelectToolBar';
import SelfSelectTable from '../components/includes/selfSelect/SelfSelectTable';
import { checkServer } from '../services/checkServer';
import { getCookie } from '../services/components/layouts/cookieController';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Self_select_stocks() {
    const socalLogin = useSelector(store => store.user.socalLogin);
    const isSocalLogin = Object.keys(socalLogin).length > 0 ? true : false;
    const [count, setCount] = useState('--');
    const [tabkey, setTabkey] = useState('0');
    const [selectReloadTime, setSelectReloadTime] = useState(null);
    const [inventoryReloadTime, setInventoryReloadTime] = useState(null);
    const [selectGroupReloadTime, setSelectGroupReloadTime] = useState(null);

    const reloadCount = useCallback(listCount => {
        setCount(listCount);
    });

    const reloadTabkey = useCallback(tabkey => {
        setTabkey(tabkey);
    });

    const reload = useCallback(() => {
        const time = new Date().getTime();
        // setTabkey('0');
        setSelectReloadTime(time);
        setInventoryReloadTime(time);
        setSelectGroupReloadTime(time);
    });

    const reloadSelectReloadTime = useCallback(() => {
        const time = new Date().getTime();
        setSelectReloadTime(time);
    });

    return (
        <>
            {isSocalLogin ? <Header /> : ''}
            <div className="select__box">
                <SelfSelectToolBar
                    count={count}
                    tabkey={tabkey}
                    reloadTabkey={reloadTabkey}
                    isSocalLogin={isSocalLogin}
                    reload={reload}
                    reloadSelectReloadTime={reloadSelectReloadTime}
                />
                <PageHead title={'我的自選'} />
                <div className="select__list__box">
                    <SelfSelectTable
                        reloadCount={reloadCount}
                        reloadTabkey={reloadTabkey}
                        selectReloadTime={selectReloadTime}
                        inventoryReloadTime={inventoryReloadTime}
                        setSelectGroupReloadTime={selectGroupReloadTime}
                        tabkey={tabkey}
                    />
                </div>
            </div>

            <style jsx>{`
                .select__box {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 15px 22px 15px;
                }

                .select__list__box {
                    margin-top: 22px;
                }
                .select__box {
                    background-color: rgb(249, 251, 255);
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
                .page__container {
                    background-color: rgb(249, 251, 255);
                }
            `}</style>
        </>
    );
}

const setGoOrderLayout = () => {
    const isServer = checkServer();
    if (isServer) {
        Self_select_stocks.getLayout = Page => Page;
    } else {
        const token = getCookie('token');
        if (!token) {
            Self_select_stocks.getLayout = Page => Page;
        }
    }
};

setGoOrderLayout();

export default Self_select_stocks;
