// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setLot } from '../../../../store/goOrder/action';

import share from '../../../../resources/images/components/goOrder/basic-share-outline.svg';
import search from '../../../../resources/images/components/goOrder/edit-search.svg';

import theme from '../../../../resources/styles/theme';

export const Info = () => {
    const dispatch = useDispatch();
    const lot = useSelector(store => store.goOrder.lot);

    const lotHandler = () => {
        const nextLot = lot === 'Board' ? 'Odd' : 'Board';
        dispatch(setLot(nextLot));
    };

    return (
        <div className="info__container">
            <div className="row">
                <div className="product__container">
                    <div className="product__name">台積電</div>
                    <div className="product__code">2330</div>
                </div>
                <div className="toolbar__container">
                    <img src={share} alt="share" className="share"></img>
                    <img src={search} alt="search" className="search"></img>
                </div>
            </div>
            <div className="row">
                <div className="price__container">503.5 ▲ 6.00 (+1.40%)</div>
                <div className="volume__container">
                    <div className="volume">總量 251543</div>
                    <div className="unit">張</div>
                </div>
            </div>
            <div className="row">
                <div className="market__container">
                    <button className="lot__box" onClick={lotHandler}>
                        <div className={`board box ${lot === 'Board' ? 'box--active' : ''}`}>整</div>
                        <div className={`odd box ${lot === 'Odd' ? 'box--active' : ''}`}>零</div>
                    </button>
                    <div className="market__box">上市</div>
                </div>
                <div className="more__container">
                    <div className="text__box dark">融</div>
                    <div className="text__box red">詳</div>
                    <div className="text__box orange">存</div>
                    <div className="text__box green">借</div>
                    <div className="text__box blue">學</div>
                    <div className="text__box brown">+ 自選</div>
                </div>
            </div>
            <style jsx>{`
                .info__container {
                    margin: 16px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }
                .row {
                    display: flex;
                    flex-wrap: wrap;
                }
                .row ~ .row {
                    margin-top: 8px;
                }
                .product__container {
                    display: flex;
                    align-items: flex-end;
                    width: calc((9 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .product__name {
                    font-size: 2.6rem;
                }
                .product__code {
                    font-size: 1.8rem;
                    margin-left: 1.2rem;
                }
                .toolbar__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    width: calc((3 / 12) * 100%);
                }
                .toolbar__container .search {
                    margin-left: 1rem;
                }
                .price__container {
                    display: flex;
                    align-items: flex-end;
                    width: calc((8 / 12) * 100%);
                    color: ${theme.colors.loss};
                    font-size: 2rem;
                }
                .volume__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    width: calc((4 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .volume__container .volume {
                    font-size: 1.6rem;
                }
                .volume__container .unit {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 2px 4px;
                }
                .market__container {
                    display: flex;
                    align-items: flex-end;
                    width: calc((4 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                }
                button.lot__box {
                    border: none;
                    padding: 0;
                    width: 44px;
                    height: 22px;
                    border-radius: 2px;
                    background-color: ${theme.colors.normalBg};
                }
                .lot__box .box {
                    display: inline-block;
                    color: #a9b6cb;
                    padding: 1px 3px 1px 4px;
                }
                .lot__box .box--active {
                    width: 22px;
                    height: 22px;
                    border-radius: 2px;
                    background-color: #0d1623;
                    color: ${theme.colors.text};
                }
                .market__box {
                    width: 42px;
                    height: 22px;
                    margin-left: 4px;
                    padding: 1px 6px;
                    border-radius: 2px;
                    background-color: ${theme.colors.normalBg};
                    color: ${theme.colors.darkBg};
                }
                .more__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    width: calc((8 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                }
                .text__box {
                    height: 22px;
                    padding: 1px 3.8px;
                    border-radius: 2px;
                }
                .text__box ~ .text__box {
                    margin-left: 4px;
                }
                .text__box.dark {
                    color: ${theme.colors.darkBg};
                    background-color: rgba(13, 22, 35, 0.1);
                }
                .text__box.red {
                    color: #c43826;
                    background-color: rgba(196, 56, 38, 0.1);
                }
                .text__box.orange {
                    color: #ff9100;
                    background-color: rgba(255, 210, 152, 0.27);
                }
                .text__box.green {
                    color: #22a16f;
                    background-color: rgba(34, 161, 111, 0.1);
                }
                .text__box.blue {
                    color: #254a91;
                    background-color: rgba(37, 74, 145, 0.1);
                }
                .text__box.brown {
                    color: #daa360;
                    background-color: rgba(218, 163, 96, 0.12);
                }
            `}</style>
        </div>
    );
};
