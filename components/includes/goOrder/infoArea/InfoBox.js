import { memo, useEffect } from 'react';
import theme from '../../../../resources/styles/theme';
export const InfoBox = memo(({ code, t30Data }) => {
    console.log(t30Data);
    return (
        <>
            <>
                {!!t30Data ? (
                    <div className="T30Box">
                        <span className="text__box dark">融</span>
                        <span className="t30__info">
                            資{t30Data['資成數']}成({t30Data['資配額']}張) / 券{t30Data['券成數']}成({t30Data['券配額']}
                            張)
                        </span>
                    </div>
                ) : (
                    <></>
                )}
            </>

            <div className="information__items__container">
                <a
                    className="information__items"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?code=${code}`}
                    target="_blank"
                >
                    <div className="information__items__icon red">詳</div>
                    <div className="information__items__desc">
                        <div className="information__items__title">詳細報價</div>
                        <div className="information__items__text">理財網完整報價</div>
                    </div>
                </a>
                <a
                    className="information__items"
                    href={`https://aiinvest.sinotrade.com.tw/Product/In?id=${code}`}
                    target="_blank"
                >
                    <div className="information__items__icon orange">存</div>
                    <div className="information__items__desc">
                        <div className="information__items__title">豐存股</div>
                        <div className="information__items__text">優質個股輕鬆存</div>
                    </div>
                </a>
                <a
                    className="information__items"
                    href={`https://www.sinotrade.com.tw/richclub/stock?code=${code}`}
                    target="_blank"
                >
                    <div className="information__items__icon blue">學</div>
                    <div className="information__items__desc">
                        <div className="information__items__title">豐雲學堂</div>
                        <div className="information__items__text">理財文章指點迷津</div>
                    </div>
                </a>
                {/* <a className="information__items">
                    <div className="information__items__icon">詳</div>
                    <div className="information__items__desc">
                        <div className="information__items__title">詳細報價</div>
                        <div className="information__items__text">理財網完整報價</div>
                    </div>
                </a> */}
            </div>
            <style jsx>{`
                .information__items__container {
                    display: flex;
                    flex-wrap: wrap;
                }
                .information__items {
                    display: flex;
                    width: 50%;
                    margin-bottom: 18px;
                }
                .information__items__icon {
                    height: 44px;
                    width: 44px;
                    padding: 1px 3.8px;
                    border-radius: 2px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 30px;
                }
                .information__items__title {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: ${theme.colors.textDark};
                }
                .information__items__desc {
                    color: ${theme.colors.textGray};
                    margin: 2px 0 2px 8px;
                }

                .information__items__icon.dark {
                    color: ${theme.colors.darkBg};
                    background-color: rgba(13, 22, 35, 0.1);
                }
                .information__items__icon.red {
                    color: #c43826;
                    background-color: rgba(196, 56, 38, 0.1);
                }
                .information__items__icon.orange {
                    color: #ff9100;
                    background-color: rgba(255, 210, 152, 0.27);
                }
                .information__items__icon.green {
                    color: #22a16f;
                    background-color: rgba(34, 161, 111, 0.1);
                }
                .information__items__icon.blue {
                    color: #254a91;
                    background-color: rgba(37, 74, 145, 0.1);
                }
                .information__items__icon.brown {
                    color: #daa360;
                    background-color: rgba(218, 163, 96, 0.12);
                }

                .T30Box {
                    margin: 0 0 10px 0;
                    font-size: 1.5rem;
                    font-weight: normal;
                }

                .text__box {
                    display: inline-block;
                    height: 22px;
                    width: 22px;
                    padding: 1px 3.8px;
                    border-radius: 2px;
                    line-height: 20px;
                }
                .text__box {
                    margin-right: 6px;
                }
                .text__box.dark {
                    color: ${theme.colors.darkBg};
                    background-color: rgba(13, 22, 35, 0.1);
                }
                .t30__info {
                    font-size: 1.6rem;
                    color: ${theme.colors.textDark};
                }
            `}</style>
        </>
    );
});

// TextBox.displayName = 'goOrder-textBox';

// TextBox.propTypes = {
//     color: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
// };
