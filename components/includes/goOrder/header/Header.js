import { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import { Select } from 'antd';

import { useUser } from '../../../../hooks/useUser';
import { usePlatform } from '../../../../hooks/usePlatform';
import { useHasMounted } from '../../../../hooks/useHasMounted';

import {
    setBs,
    setCode,
    setType,
    setDefaultOrdPrice,
    setOrdQty,
    setLot,
    setTradeTime,
} from '../../../../store/goOrder/action';
import { setCurrentAccount } from '../../../../store/user/action';

import { accountGroupByType, getAccountText } from '../../../../services/user/accountGroupByType';

// import grid from '../../../../resources/images/components/goOrder/grid-grid-big.svg';
import arrow from '../../../../resources/images/components/goOrder/arrow-caret-down.svg';
import theme from '../../../../resources/styles/theme';
import logo from '../../../../resources/images/components/goOrder/logo.svg';

import { checkServer } from '../../../../services/checkServer';
import { getParamFromQueryString } from '../../../../services/getParamFromQueryString';
import { useCheckSocialLogin } from '../../../../hooks/useCheckSocialLogin';
import { AccountAvatar } from '../../AccountAvatar';
import { objectToQueryHandler } from '../../../../services/objectToQueryHandler';

const { Option } = Select;

const DropDownArrow = () => {
    return (
        <>
            <img src={arrow} alt="arrow"></img>
        </>
    );
};

const Header = () => {
    // 客戶登入/登出的帳號及個人化設定處理，回傳 { isLogin, accounts, userSettings }
    const { isLogin } = useUser();
    const { socalLogin } = useCheckSocialLogin();
    // 來源別相關的處理
    const platform = usePlatform();
    const hasMounted = useHasMounted();

    const dispatch = useDispatch();
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const type = useSelector(store => store.goOrder.type);
    const userSettings = useSelector(store => store.user.userSettings);
    const solaceData = useSelector(store => store.solace.solaceData);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const socalLoginData = useSelector(store => store.user.socalLogin);

    const groupedAccount = accountGroupByType(accounts);
    const groupedTypes = Object.keys(groupedAccount);
    const accountList = groupedAccount[type];

    const router = useRouter();
    const init = useRef(false);
    const goCheckLot = useRef(false);
    const checkSolaceConnect = useRef(false);

    const accountElement = (
        <AccountAvatar
            style={{
                width: '26px',
                height: '26px',
                lineHeight: '26px',
                fontSize: '1.2rem',
            }}
        >
            {currentAccount.username && currentAccount.username[0]}
        </AccountAvatar>
    );

    // TODO: 頁面登入權限處理 (未登入導到登入頁)
    // TODO: query string 傳入 type 處理
    // TODO: 連動 current account 的處理

    //避免畫面先初始在永豐金再跳回querystring的股票代碼，導致畫面閃礫
    const initHandler = (() => {
        if (!checkServer()) {
            const stockid = getParamFromQueryString('stockid');
            if (!init.current) {
                if (stockid) {
                    dispatch(setCode(stockid));
                } else {
                    dispatch(setCode('2890'));
                }
            }

            setTimeout(() => {
                init.current = true;
            }, 1500);
        }
    })();

    useEffect(() => {
        if (router.query.bs != null && !init.current) {
            // 因為畫面整個與預設畫面不同，所以延遲作業，避免一次處理太多事情，影響效能
            setTimeout(() => {
                dispatch(setBs(router.query.bs));
            }, 1000);
        }

        if (router.query.price != null) {
            dispatch(setDefaultOrdPrice(router.query.price));
        }

        if (router.query.qty != null) {
            dispatch(setOrdQty(router.query.qty));
        } else {
            if (userSettings.stockOrderUnit != null) {
                dispatch(setOrdQty(userSettings.stockOrderUnit));
            }
        }

        if (router.query.session != null) {
            //盤中零股
            if (router.query.session === 'C') {
                // TODO 零股資料完整後可以替換
                checkSolaceConnect.current = true;

                // setTimeout(() => {
                //     dispatch(setLot('Odd'));
                // }, 500);
            }
            //盤後零股和興櫃盤後 都是2
            if (router.query.session === '2') {
                goCheckLot.current = true;
                dispatch(setTradeTime('after'));
            }
        }
    }, [router, userSettings]);

    // TODO 零股資料完整後可以刪掉
    useEffect(() => {
        if (solaceData.length != 0) {
            if (checkSolaceConnect.current) {
                dispatch(setLot('Odd'));
                checkSolaceConnect.current = false;
            }
        }
    }, [solaceData]);

    useEffect(() => {
        if (goCheckLot.current) {
            if (productInfo.solaceMarket !== '興櫃') {
                dispatch(setLot('Odd'));
                goCheckLot.current = false;
            }
        }
    }, [productInfo]);

    useEffect(() => {
        // TODO: 無帳號處理
        if (hasMounted) {
            let currentAccount;
            if (type === 'S') {
                const defaultStockAccount = groupedAccount.S.find(
                    account => `${account.broker_id}-${account.account}` === userSettings.defaultStockAccount,
                );
                currentAccount = defaultStockAccount || groupedAccount.S[0];
            } else {
                currentAccount = groupedAccount[type][0];
            }
            dispatch(setCurrentAccount(currentAccount));
        }
    }, [type]);

    const socalLoginChildren = useMemo(() => {
        if (socalLoginData._id != null) {
            if (socalLoginData.img != null && socalLoginData.img) {
                return (
                    <div className="socal__box">
                        <span className="socalName">{socalLoginData.name}</span>
                        <Avatar src={socalLoginData.img} size={26} />
                    </div>
                );
            } else {
                return (
                    <div className="socal__box">
                        <span className="socalName">{socalLoginData.name}</span>
                        <Avatar size={26}>{socalLoginData.name.substr(0, 1)}</Avatar>
                    </div>
                );
            }
        } else {
            return null;
        }
    }, [socalLoginData]);

    // const getUserSetting = async () => {
    //     const token = getToken();
    //     // const userSetting = await fetchUserSettings(token, '');
    //     console.log('userSetting', userSetting)
    // }

    const handleTypeChange = value => {
        dispatch(setType(value));
        // dispatch(setCurrentAccount(groupedAccount[value][0]));
    };

    const onAccountChange = value => {
        const account = accountList.find(account => `${account.broker_id}-${account.account}` === value);
        dispatch(setCurrentAccount(account));
    };

    const loginClickHandler = () => {
        const query = router.query;
        const queryStr = objectToQueryHandler(query);
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            'redirectUrl=OrderGO';
    };

    const currentAccountHandler = () => {
        if (currentAccount.accttype !== type) {
            return '--';
        } else {
            return `${currentAccount.broker_id || ''}-${currentAccount.account || ''}`;
        }
    };

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="Header__container">
            <div className="colorArea__container">
                <div className="primary"></div>
                <div className="secondary"></div>
            </div>
            <div className="main__container">
                {isLogin && (
                    <>
                        <div className="dropdown__container">
                            <Select
                                // defaultValue={type}
                                defaultValue={'S'}
                                style={{ width: 111 }}
                                // onChange={handleTypeChange}
                                getPopupContainer={trigger => trigger.parentElement}
                                bordered={false}
                                suffixIcon={<DropDownArrow />}
                            >
                                {/* {groupedTypes.map(accType => (
                                    <Option key={accType}>{getAccountText(accType)}</Option>
                                ))} */}
                                <Option value={'S'}>國內證券</Option>
                            </Select>
                        </div>
                        <div className="dropdown__container">
                            <Select
                                style={{ width: 136 }}
                                value={currentAccountHandler()}
                                onChange={onAccountChange}
                                getPopupContainer={trigger => trigger.parentElement}
                                bordered={false}
                                suffixIcon={<DropDownArrow />}
                                notFoundContent={<div></div>}
                            >
                                {accountList.map(account => (
                                    <Option
                                        key={`${account.broker_id}-${account.account}`}
                                    >{`${account.bhname} ${account.username}`}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="accountElement">{accountElement}</div>
                    </>
                )}
                {socalLogin && (
                    <>
                        <img className="logo" src={logo} />
                        {socalLoginChildren}
                    </>
                )}
                {!socalLogin && !isLogin && (
                    <>
                        <img className="logo" src={logo} />
                        <button className="grid__button" onClick={loginClickHandler}>
                            開戶 / 登入
                        </button>
                    </>
                )}
            </div>
            <style jsx>{`
                .accountElement {
                    position: absolute;
                    right: 16px;
                }
                .Header__container {
                    width: 100%;
                }
                .logo {
                    margin-left: 16px;
                }
                .colorArea__container {
                    display: flex;
                }
                .colorArea__container .primary {
                    width: 111px;
                    height: 4px;
                    background-color: ${theme.colors.primary};
                }
                .colorArea__container .secondary {
                    width: calc(100% - 111px);
                    height: 4px;
                    background-color: ${theme.colors.secondary};
                }
                .main__container {
                    width: 100%;
                    height: 44px;
                    background-color: ${theme.colors.darkBg};
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                button.grid__button {
                    border: none;
                    background-color: #c43826;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 112px;
                    color: white;
                    height: 44px;
                    font-size: 1.6rem;
                }
            `}</style>
            <style jsx global>{`
                .dropdown__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    background-color: inherit;
                    color: #ffffff;
                    padding: 0 16px;
                }
                .dropdown__container .ant-select-arrow {
                    top: 28%;
                    right: 11px;
                }
                .ant-avatar-string {
                    line-height: 26px !important;
                }
                .socalName {
                    font-size: 1.6rem;
                    color: white;
                    margin-right: 8px;
                }
                .socal__box {
                    position: absolute;
                    right: 16px;
                }
            `}</style>
        </div>
    );
};

export default Header;
