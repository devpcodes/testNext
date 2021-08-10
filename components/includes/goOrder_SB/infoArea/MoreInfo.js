import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockT30 } from '../../../../services/stock/stockT30Fetcher';
import { InfoBox } from './InfoBox';
import { TextBox } from './TextBox';
import { fetchCheckSelfSelect } from '../../../../services/selfSelect/checkSelectStatus';
import AddSelectStock from '../../editSelfSelectGroupBox/AddSelectStock';
import { setSelectInfo, setT30 } from '../../../../store/goOrder/action';
import { getToken } from '../../../../services/user/accessToken';
import AddSelectGroup from '../../selfSelect/AddSelectGroup';

const MoreInfo = ({ children }) => {
    const code = useSelector(store => store.goOrder.code);
    const [isMoreDetailVisitable, setIsMoreDetailVisitable] = useState(false);
    const [t30Data, setT30Data] = useState(false);
    const [moreItems, setMoreItems] = useState([]);
    const [isAddSelectGroupVisitable, setAddSelectGroupVisitable] = useState(false);
    const [isSelfSelectVisitable, setIsSelfSelectVisitable] = useState(false);
    const isLogin = useSelector(store => store.user.isLogin);
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const selectInfo = useSelector(store => store.goOrder.selectInfo);
    const type = useSelector(store => store.goOrder.type);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const T30 = useSelector(store => store.goOrder.T30Data);
    const dispatch = useDispatch();

    let defaultMoreItems = [
        {
            id: '1',
            color: 'red',
            text: '詳',
            title: '詳細報價',
            desc: '理財網完整報價',
            inInfoBox: true,
            link: `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?code=${code}`,
        },
        {
            id: '2',
            color: 'orange',
            text: '存',
            title: '豐存股',
            desc: '優質個股輕鬆存',
            inInfoBox: true,
            link: `https://aiinvest.sinotrade.com.tw/Product/In?id=${code}`,
        },
        {
            id: '3',
            color: 'blue',
            text: '學',
            title: '豐雲學堂',
            desc: '理財文章指點迷津',
            inInfoBox: true,
            link: `https://www.sinotrade.com.tw/richclub/stock?code=${code}`,
        },
        { id: '4', color: 'brown', text: '+ 自選', title: '', desc: '', inInfoBox: false, link: '' },
    ];
    const showSelfSelect = () => {
        setIsSelfSelectVisitable(true);
    };
    const closeSelfSelect = useCallback(() => {
        setIsSelfSelectVisitable(false);
    }, []);
    useEffect(() => {
        if (type === 'S') {
            if (!code) {
                return;
            }
            setInfoItems(code);
        } else {
            setMoreItems(defaultMoreItems);
        }
    }, [code]);

    useEffect(() => {
        if (type === 'H') {
            moreItemHandler(defaultMoreItems, code, type, productInfo);
        }
    }, [code, type, productInfo]);

    useEffect(() => {
        if (selectInfo) {
            reloadSelfSelectSmallIcon();
        }
    }, [selectInfo]);

    // 更新一次狀態
    setTimeout(() => {
        reloadSelfSelectSmallIcon();
    }, 200);

    const closeAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(false);
        setIsSelfSelectVisitable(true);
    }, []);

    const openAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(true);
    }, []);
    const reload = () => {};
    const reloadTabkey = () => {};

    const moreItemHandler = (defaultMoreItems, code, type, productInfo) => {
        if (type === 'H') {
            defaultMoreItems[0].link = `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_SubBrokerage/?tab=2&symbol=${code}&exch=${productInfo?.exchange}`;
            defaultMoreItems[1].link =
                productInfo?.market === 'US'
                    ? `https://aiinvest.sinotrade.com.tw/foreign/product/quote/${code}`
                    : 'https://aiinvest.sinotrade.com.tw/foreign';
            defaultMoreItems[2].link = 'https://www.sinotrade.com.tw/richclub/oversea';
        }
        setMoreItems(defaultMoreItems);
    };

    const reloadSelfSelectSmallIcon = useCallback(() => {
        const cloneMoreItems = JSON.parse(JSON.stringify(moreItems));
        const index = cloneMoreItems.findIndex(obj => obj.id === '4');
        if (cloneMoreItems[index]) {
            if (selectInfo.isExist) {
                cloneMoreItems[index].text = '❤ 自選';
            } else {
                cloneMoreItems[index].text = '+ 自選';
            }
            setMoreItems(cloneMoreItems);
        }
    });
    useEffect(async () => {
        if (!isLogin && Object.keys(socalLoginData).length === 0) {
            return;
        }
        getSelect();
    }, [T30, productInfo, isLogin, isSelfSelectVisitable]);

    const getSelect = useCallback(async () => {
        let exchange;
        let market;
        const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;

        switch (type) {
            case 'S':
                exchange = T30.EXCHANGE ? T30.EXCHANGE : 'OES';
                market = type;
                break;
            case 'H':
                exchange = productInfo.exchange;
                market = 'SB';
                break;
            default:
                break;
        }
        const reqData = {
            symbol: code,
            exchange: exchange,
            market: market,
            isShowDetail: true,
            isSocalLogin: isSocalLogin,
            token: isSocalLogin ? getSocalToken() : getToken(),
        };
        const res = await fetchCheckSelfSelect(reqData);
        dispatch(setSelectInfo(res));
    });
    const setInfoItems = async code => {
        // { id: '1', color: 'dark', text: '融' },
        // { id: '2', color: 'red', text: '詳' },
        // { id: '3', color: 'orange', text: '存' },
        // { id: '4', color: 'green', text: '借' },
        // { id: '5', color: 'blue', text: '學' },
        // { id: '6', color: 'brown', text: '+ 自選' },

        const t30Res = await fetchStockT30(code);
        dispatch(setT30(t30Res));
        // const test = await fetchGetRichClubReport(code);
        // console.log(test)

        let moreItems = [
            {
                id: '1',
                color: 'red',
                text: '詳',
                title: '詳細報價',
                desc: '理財網完整報價',
                inInfoBox: true,
                link: `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?code=${code}`,
            },
            {
                id: '2',
                color: 'orange',
                text: '存',
                title: '豐存股',
                desc: '優質個股輕鬆存',
                inInfoBox: true,
                link: `https://aiinvest.sinotrade.com.tw/Product/In?id=${code}`,
            },
            {
                id: '3',
                color: 'blue',
                text: '學',
                title: '豐雲學堂',
                desc: '理財文章指點迷津',
                inInfoBox: true,
                link: `https://www.sinotrade.com.tw/richclub/stock?code=${code}`,
            },
            { id: '4', color: 'brown', text: '+ 自選', title: '', desc: '', inInfoBox: false, link: '' },
        ];

        if (![t30Res['券成數'], t30Res['券配額'], t30Res['資成數'], t30Res['資配額']].some(el => el == null)) {
            moreItems.unshift({ id: '5', color: 'dark', text: '融', title: '', desc: '', inInfoBox: false, link: '' });
        }
        setT30Data(t30Res);
        setMoreItems(moreItems);
    };
    const loginClickHandler = () => {
        const query = router.query;
        let queryStr = objectToQueryHandler(query);
        if (code) {
            queryStr = updateQueryStringParameter(queryStr, 'stockid', code);
        }
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            'redirectUrl=OrderGO';
    };
    const setMoreDetailIsVisitable = () => {
        isMoreDetailVisitable ? setIsMoreDetailVisitable(false) : setIsMoreDetailVisitable(true);
    };

    return (
        <>
            <div className="info__box">
                <div className="row">
                    {children}
                    <div className="more__container" onClick={setMoreDetailIsVisitable}>
                        {moreItems.map(item => (
                            <TextBox key={item.id} color={item.color} text={item.text} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="more__info__container">
                <div className="information__box">
                    <InfoBox code={code} t30Data={t30Data} moreItems={moreItems} />
                    <button
                        className="btn add__self__select"
                        onClick={isLogin || Object.keys(socalLoginData).length > 0 ? showSelfSelect : loginClickHandler}
                    >
                        {isLogin ? (!!selectInfo && selectInfo.isExist ? '編輯自選' : '加入自選') : '加入自選'}
                    </button>
                </div>
            </div>
            <div className="page__mask"></div>
            <AddSelectStock
                isVisible={isSelfSelectVisitable}
                handleClose={closeSelfSelect}
                addSelectGroupWindowOpen={openAddSelfGroup}
            />
            <AddSelectGroup
                isAddSelectGroupVisitable={isAddSelectGroupVisitable}
                handleClose={closeAddSelfGroup}
                callBack={reload}
                reloadTabkey={reloadTabkey}
            />
            <style jsx>{`
                .info__box {
                    margin-top: 8px;
                    position: relative;
                }
                .more__info__container {
                    background: #fff;
                    display: block;
                    left: 0;
                    position: absolute;
                    padding: 0 16px 12px 16px;
                    width: 100%;
                    z-index: 1300;
                    display: ${isMoreDetailVisitable === false ? 'none' : 'block'};
                    margin-top: 15px;
                }
                .more__info__container .information__box {
                    padding-top: 12px;
                    border-top: 1px solid #0d1623;
                }
                .more__info__container .add__self__select {
                    width: 100%;
                    height: 52px;
                    border-radius: 2px;
                    background-color: #c43826;
                    color: #fff;
                    font-size: 1.6rem;
                    border: none;
                }
                .more__info__container .add__self__select:disabled {
                    color: rgba(0, 0, 0, 0.25);
                    background: #f5f5f5;
                    border: 1px solid #d9d9d9;
                    cursor: no-drop;
                }
                .page__mask {
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1200;
                    height: calc(100% - 230px);
                    background-color: rgb(0 0 0 / 30%);
                    display: ${isMoreDetailVisitable === false ? 'none' : 'block'};
                }
                .more__info__container .add__self__select {
                    width: 100%;
                    height: 52px;
                    border-radius: 2px;
                    background-color: #c43826;
                    color: #fff;
                    font-size: 1.6rem;
                }
                .more__info__container .add__self__select:disabled {
                    color: rgba(0, 0, 0, 0.25);
                    background: #f5f5f5;
                    border: 1px solid #d9d9d9;
                    cursor: no-drop;
                }
                .more__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                    position: absolute;
                    cursor: pointer;
                    right: 0;
                    top: 0;
                }
            `}</style>
            <style jsx global>{`
                .ant-modal-wrap {
                    z-index: 15001;
                }
                .ant-modal-mask {
                    z-index: 15000;
                }
            `}</style>
        </>
    );
};

export default MoreInfo;
