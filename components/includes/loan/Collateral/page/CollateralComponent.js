import { Drawer } from 'antd';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '../../../../../hooks/useUser';
import { setMaskVisible, setModal, showLoginHandler } from '../../../../../store/components/layouts/action';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import { AccountDropdown } from '../../../personalArea/accountDropdown/AccountDropdown';
import TopTabBar from '../../../subBrokerage/elements/TopTabBar';
import CalculationDescription from '../elements/CalculationDescription';
import LoanCalculation from '../elements/LoanCalculation';
import LoanDays from '../elements/LoanDays';
import SearchStock from '../elements/SearchStock';
import SelfTable from '../elements/SelfTable';
import closeIcon from '../../../../../resources/images/components/loanZone/menu-close-big (1).svg';
import Modal from 'antd/lib/modal/Modal';
import GoLoan from '../elements/GoLoan';
import { fetchGreenChannel } from '../../../../../services/components/loznZone/calculation/fetchGreenChannel';
import { useLoanAccount } from '../../../../../hooks/useLoanAccount';
const CollateralComponent = () => {
    const menuList = [
        { key: 'self', title: '自選試算' },
        { key: 'inventory', title: '庫存試算' },
    ];
    const showLogin = useSelector(store => store.layout.showLogin);
    const isMobile = useSelector(store => store.layout.isMobile);
    const winWidth = useSelector(store => store.layout.winWidth);
    const { isLogin, accounts } = useUser();
    const dispatch = useDispatch();
    const [showAccount, setShowAccount] = useState(false);
    const [current, setCurrent] = useState('self');
    const [hasStockAcc, setHasStockAcc] = useState(false);
    const [loanDays, setLoanDays] = useState('');
    const inputLoanDays = useRef('');
    // const submitData = useRef([]);
    const [submitData, setSubmitData] = useState([]);
    const submitDataCurr = useRef([]);
    const [allLoanMoney, setAllLoanMoney] = useState('--');
    const [interest, setInterest] = useState('--');
    const [handlingFee, setHandlingFee] = useState('100');
    const [qty, setQty] = useState('--');
    const [reset, setReset] = useState(false);
    const [visible, setVisible] = useState(false);
    const [tabletCalculationShow, setTabletCalculationShow] = useState(false);
    const [goLoanVisible, setGoLoanVisible] = useState(false);
    const [stockData, setStockData] = useState({});
    const [reload, setReload] = useState(false);
    useLoanAccount();

    useEffect(() => {
        if (isLogin) {
            setCurrent('inventory');
        }
    }, [isLogin]);
    useEffect(() => {
        if (isLogin && current === 'inventory') {
            setShowAccount(true);
        } else {
            setShowAccount(false);
        }
    }, [isLogin, current]);

    useEffect(() => {
        if (!showLogin && !isLogin && current === 'inventory') {
            setCurrent('self');
        }
        // if(isLogin && !hasStockAcc && current === 'inventory'){

        // }
    }, [showLogin, current, hasStockAcc, isLogin]);

    useEffect(() => {
        if (isLogin) {
            let hasStockAccount = false;
            accounts.forEach(element => {
                if (element.accttype === 'S') {
                    hasStockAccount = true;
                }
            });
            if (hasStockAccount) {
                setHasStockAcc(true);
            }
        }
    }, [accounts, isLogin]);

    const renderTable = current => {
        console.log('current', current);
        return (
            <SelfTable
                currentKey={current}
                setCurrentData={currentDataHandler}
                reset={reset}
                stockData={stockData}
                reload={reload}
            />
        );
    };

    // 設定現在勾選的資料
    const currentDataHandler = data => {
        console.log('now Data', data);
        // submitData.current = data;
        setSubmitData(data);

        //避免有人不按試算
        submitDataCurr.current = data;
        submitHandler();
    };

    const tabClickHandler = currentKey => {
        if (currentKey === 'inventory' && !isLogin) {
            dispatch(showLoginHandler(true));
        }
        setCurrent(currentKey);
    };

    const changeDaysHandler = val => {
        // setLoanDays(val);
        inputLoanDays.current = val;
    };

    const submitHandler = click => {
        setLoanDays(inputLoanDays.current);
        const allMoney = getAllLoanHandler(submitDataCurr.current);
        getInterestHandler(submitDataCurr.current, inputLoanDays.current);
        // getInterestHandler(allMoney, inputLoanDays.current);
        getQtyHandler(submitDataCurr.current);

        if (winWidth <= 920 && click === 'click') {
            setTabletCalculationShow(true);
            // setMaskShow(true);
            // setVisible(true);
        }
        if (winWidth <= 450 && !visible && click === 'click') {
            setVisible(true);
        }
    };

    const resetHandler = () => {
        setReset(true);
        setTimeout(() => {
            if (winWidth > 920) {
                submitHandler();
            }
        }, 100);
        setTimeout(() => {
            setReset(false);
        }, 500);
    };

    //取借款總額
    const getAllLoanHandler = submitData => {
        let allMoney = 0;
        submitData.forEach(item => {
            allMoney += Number(item.canLoanMoney);
        });
        setAllLoanMoney(allMoney);
        return allMoney;
    };

    //取預估利息
    // const getInterestHandler = (allMoney, days) => {
    //     const nowInterest = Math.ceil(allMoney * 0.04 * (days / 365));
    //     setInterest(nowInterest);
    // };
    const getInterestHandler = (data, days) => {
        console.log('.......', data);
        let nowInterest = 0;
        data.forEach(item => {
            console.log(
                '------------+++++',
                Math.ceil(Number(item.canLoanMoney) * Number(item.groupRate) * Number(days / 365)),
            );
            nowInterest += Math.ceil(
                Number(item.canLoanMoney) * Number(item.groupRate || item.loanYearRate) * Number(days / 365),
            );
        });
        // const nowInterest = Math.ceil(allMoney * 0.04 * (days / 365));
        setInterest(nowInterest);
    };

    const getQtyHandler = submitData => {
        let allQty = 0;
        submitData.forEach(item => {
            allQty += Number(item.expectedCollateralShare);
        });
        setQty(allQty);
    };

    const drawerClose = () => {
        setVisible(false);
    };

    const closeTabletCalculation = () => {
        setTabletCalculationShow(false);
    };

    const goLoanHandler = () => {
        setTabletCalculationShow(false);
        setGoLoanVisible(true);
    };

    const goLoanClose = () => {
        setGoLoanVisible(false);
    };

    const searchStockHandler = async val => {
        const stockId = val.split(' ')[0];
        console.log('sssss', stockData);
        try {
            const res = await fetchGreenChannel(stockId);
            setStockData(res);
            console.log('----------', res);
        } catch (error) {
            dispatch(
                setModal({
                    visible: true,
                    title: '系統訊息',
                    content: error,
                    type: 'info',
                    buttonProps: {
                        style: {
                            background: '#c43826',
                        },
                    },
                }),
            );
        }
    };
    const inventoryReload = () => {
        setReload(true);
        setTimeout(() => {
            setReload(false);
        }, 500);
    };
    return (
        <div className="collateral__container">
            {winWidth > 530 && <Breadcrumb />}

            <div className="collateral__content">
                <div className="collateral__left">
                    <div className="collateral__head--left">
                        <h1>擔保品試算</h1>
                        {/* 自選試算 PC版 */}
                        {!showAccount && winWidth > 920 && (
                            <SearchStock btnName="新增擔保品" onClick={searchStockHandler} />
                        )}

                        {/* 自選試算 tab版 */}
                        {winWidth <= 920 && winWidth > 530 && !showAccount && (
                            <div className="tablet__self">
                                <div className="tablet__dropdown">
                                    <SearchStock btnName="新增擔保品" onClick={searchStockHandler} />
                                </div>
                                <div className="tablet__desc--self">
                                    <CalculationDescription />
                                </div>
                            </div>
                        )}
                        {/* 自選試算 MOBILE版 */}
                        {winWidth <= 530 && !showAccount && (
                            <>
                                <CalculationDescription />
                                <SearchStock btnName="新增擔保品" onClick={searchStockHandler} />
                            </>
                        )}

                        {/* 庫存試算 tab版 */}
                        {winWidth <= 920 && winWidth > 530 && showAccount && (
                            <div>
                                <div className="tablet__dropdown">
                                    {showAccount && (
                                        <AccountDropdown
                                            type={'S'}
                                            personalAreaVisible={false}
                                            tradingLayout={true}
                                            width={'100%'}
                                            tradingContainerWidth={'100%'}
                                        />
                                    )}
                                </div>
                                <div className="tablet__desc">
                                    <CalculationDescription />
                                </div>
                            </div>
                        )}
                        {/* 庫存試算 手機版 */}
                        {showAccount && winWidth <= 530 && <CalculationDescription />}
                        {winWidth <= 530 && (
                            <>
                                <div className="dropDown">
                                    {showAccount && (
                                        <AccountDropdown
                                            type={'S'}
                                            personalAreaVisible={false}
                                            tradingLayout={true}
                                            width={'100%'}
                                            tradingContainerWidth={'100%'}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <TopTabBar menuList={menuList} current={current} onClick={tabClickHandler} activeKey={current} />
                    {renderTable(current)}
                    <LoanDays changeDaysHandler={changeDaysHandler} reset={reset} />
                    <div className="collateral__btnBox">
                        <button className="btn__reset" onClick={resetHandler}>
                            {isMobile ? '清除' : '清除重置'}
                        </button>
                        <button className="btn__calculation" onClick={submitHandler.bind(null, 'click')}>
                            立即試算
                        </button>
                    </div>
                </div>
                {winWidth > 920 ? (
                    <div className="collateral__right">
                        <div className="collateral__head--right">
                            <div className="collateral__dropDown">
                                {showAccount && (
                                    <AccountDropdown
                                        type={'S'}
                                        personalAreaVisible={false}
                                        tradingLayout={true}
                                        width={'100%'}
                                        tradingContainerWidth={'100%'}
                                    />
                                )}
                            </div>
                            <CalculationDescription />
                        </div>
                        <LoanCalculation
                            loanDays={loanDays}
                            allLoanMoney={allLoanMoney}
                            interest={interest}
                            handlingFee={handlingFee}
                            qty={qty}
                            currentKey={current}
                            submitData={submitData}
                            goLoanHandler={goLoanHandler}
                        />
                    </div>
                ) : null}
                {winWidth <= 920 && winWidth > 450 && (
                    <Modal
                        visible={tabletCalculationShow}
                        footer={null}
                        width={375}
                        onCancel={closeTabletCalculation}
                        closeIcon={<img src={closeIcon} />}
                    >
                        <LoanCalculation
                            loanDays={loanDays}
                            allLoanMoney={allLoanMoney}
                            interest={interest}
                            handlingFee={handlingFee}
                            qty={qty}
                            currentKey={current}
                            submitData={submitData}
                            goLoanHandler={goLoanHandler}
                        />
                    </Modal>
                )}
                {winWidth <= 450 && (
                    <Drawer
                        visible={visible}
                        placement="bottom"
                        height={485}
                        onClose={drawerClose}
                        closeIcon={<img src={closeIcon} />}
                    >
                        <LoanCalculation
                            loanDays={loanDays}
                            allLoanMoney={allLoanMoney}
                            interest={interest}
                            handlingFee={handlingFee}
                            qty={qty}
                            currentKey={current}
                            submitData={submitData}
                            goLoanHandler={goLoanHandler}
                        />
                    </Drawer>
                )}
                <GoLoan
                    visible={goLoanVisible}
                    goLoanClose={goLoanClose}
                    allLoanMoney={allLoanMoney}
                    goSubmitData={submitData}
                    inventoryReload={inventoryReload}
                />
            </div>

            <style jsx>{`
                .mask {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: black;
                    z-index: 2;
                    opacity: 0.65;
                }
                .collateral__container {
                    width: 80%;
                    margin: 0 auto;
                    padding-top: 24px;
                }
                .collateral__head {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2px;
                }
                .collateral__head--right {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 17px;
                }
                .collateral__dropDown {
                    display: inline-block;
                    flex: 1 0 0;
                    margin-right: 12px;
                    min-width: 100px;
                }
                .collateral__content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }
                .collateral__left {
                    margin-right: 24px;
                    flex: 2 0 0;
                    min-width: 400px;
                }
                .collateral__right {
                    flex: 1 0 0;
                    min-width: 250px;
                }
                h1 {
                    color: #0d1623;
                    font-size: 28px;
                    font-weight: bold;
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 35px;
                    white-space: nowrap;
                }
                .collateral__btnBox {
                    display: flex;
                    justify-content: center;
                    margin-top: 12px;
                }
                .btn__reset {
                    margin: 0;
                    padding: 0;
                    border: none;
                    outline: none;
                    background-color: white;
                    width: 122px;
                    height: 40px;
                    font-size: 16px;
                    padding: 9px 19px 9px 20px;
                    border-radius: 2px;
                    width: 200px;
                    height: 48px;
                    border: solid 1px #d7e0ef;
                    margin-right: 20px;
                }
                .btn__calculation {
                    margin: 0;
                    padding: 0;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    width: 122px;
                    height: 40px;
                    font-size: 16px;
                    padding: 9px 19px 9px 20px;
                    border-radius: 2px;
                    background-color: #c43826;
                    width: 200px;
                    height: 48px;
                    color: white;
                }
                @media (max-width: 1280px) {
                    .collateral__container {
                        width: 90%;
                    }
                }
                @media (max-width: 920px) {
                    .collateral__left {
                        margin-right: 0;
                    }
                    .collateral__head--left {
                        display: flex;
                        justify-content: space-between;
                    }
                    .tablet__dropdown {
                        display: inline-block;
                    }
                    .tablet__desc {
                        display: inline-block;
                        vertical-align: top;
                        margin-left: 12px;
                    }
                    .tablet__self {
                        display: flex;
                        justify-content: space-between;
                    }
                    .tablet__desc--self {
                        margin-left: 12px;
                    }
                    .collateral__calculation--tablet {
                        margin: 0 auto;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 375px;
                        z-index: 3;
                    }
                }
                @media (max-width: 680px) {
                    .tablet__desc--self {
                        display: none;
                    }
                }
                @media (max-width: 530px) {
                    .collateral__head--left {
                        display: block;
                    }
                    .collateral__container {
                        width: 100%;
                        padding-top: 20px;
                    }
                    .collateral__left {
                        min-width: 100%;
                    }
                    h1 {
                        font-size: 20px;
                        margin-left: 16px;
                    }
                    .collateral__btnBox {
                        border: solid 1px #d7e0ef;
                        border-left: none;
                        border-right: none;
                        padding: 16px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .btn__reset {
                        width: 100px;
                        margin-right: 16px;
                    }
                    .btn__calculation {
                        flex: 2;
                        min-width: 122px;
                    }
                    .dropDown {
                        min-width: 100%;
                        padding: 16px;
                        padding-top: 0;
                    }
                }
            `}</style>
            <style jsx global>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
                .site-breadcrumb.ant-breadcrumb {
                    margin-bottom: 27px;
                }
                .sino__table {
                    margin-bottom: 12px;
                }
                .collateral__left .sino__table .ant-table-container {
                    border: solid 1px #d7e0ef;
                }
                .loanDays__container {
                    margin-top: -6px;
                }
                @media (max-width: 450px) {
                    .loanDays__container {
                        margin-top: -8px;
                    }
                    .collateral__left .sino__table .ant-table-container {
                        border-left: none;
                        border-right: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default CollateralComponent;
