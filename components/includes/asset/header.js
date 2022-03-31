import { useCallback, useState, memo } from 'react';
import { Button } from 'antd';
import refresh from '../../../resources/images/pages/asset/basic-refresh-02.svg';
import hide from '../../../resources/images/pages/asset/ic-hide.svg';

const AssetHeader = memo(({ title }) => {
    return (
        <>
            <div className="asset__toolbar">
                <div className="asset__toolbar__left">
                    <h2>{title}</h2>
                </div>
                <div className="asset__toolbar__right">
                    <span className="time">最後更新時間 : 2022.02.18 15:36</span>
                    <div className="tools">
                        <Button className="btn refresh__btn">
                            <img src={refresh} />
                        </Button>
                        <Button className="btn refresh__btn">
                            <img src={hide} />
                        </Button>
                        <span className="account__info">A2288***** ｜ 金大戶</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .asset__toolbar {
                    display: flex;
                    justify-content: space-between;
                }

                .asset__toolbar__left {
                    display: flex;
                }
                .asset__toolbar__left > h2 {
                    display: inline-block;
                    font-size: 2.6rem;
                    font-weight: bold;
                    margin: 0 28px 0 0;
                    padding: 0;
                }
                .asset__toolbar__right > span {
                    font-size: 1.4rem;
                    color: #3f5372;
                    margin-right: 16px;
                }
                .asset__toolbar__right .account__info {
                    font-size: 1.4rem;
                    color: #3f5372;
                    border: solid 1px #d7e0ef;
                    padding: 11px 27px;
                    border-radius: 2px;
                }
                .tools {
                    display: inline-block;
                }

                @media (max-width: 900px) {
                    .asset__toolbar {
                        flex-direction: column;
                    }
                    .asset__toolbar__right {
                        margin-top: 3px;
                    }
                    .asset__toolbar {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                }

                @media (max-width: 570px) {
                    .tools {
                        margin-top: 10px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .asset__toolbar__right .btn {
                    padding: 0px 0px;
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                }
            `}</style>
        </>
    );
});

export default AssetHeader;
