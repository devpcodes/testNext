import { useCallback, useState, memo } from 'react';
import { Button } from 'antd';
import refresh from '../../../resources/images/pages/asset/basic-refresh-02.svg';
import hide from '../../../resources/images/pages/asset/ic-hide.svg';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQueryRealTimePrtLosSum } from '../../../services/asset/queryRealTimePrtLosSum';
import { getToken } from '../../../services/user/accessToken';
import { setRealTimePrtLosSum } from '../../../store/asset/action';
import { useRouter } from 'next/router';
import { Tooltip } from 'antd';
import info from '../../../resources/images/pages/asset/ic-ic-info@2x.png';
import { Modal } from 'antd';

const AssetHeader = memo(({ title }) => {
    const user = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    const router = useRouter();
    const getTime = () => {
        const now = new Date();
        const formatTime = `${now.getFullYear()}.${
            now.getMonth() + 1
        }.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
        return formatTime;
    };

    const [refreshTime, setrefreshTime] = useState(getTime());

    const refreshAction = async () => {
        const type = router.query.type ? (router.query.type == 'S' ? ['S', 'L'] : [router.query.type]) : null;
        const res = await fetchQueryRealTimePrtLosSum(getToken(), type);
        if (res?.success != null && res?.success === true) {
            dispatch(setRealTimePrtLosSum(res.result));
            setrefreshTime(getTime());
        } else {
            Modal.error({
                content: res === '伺服器錯誤' ? res : res.message,
            });
        }
    };
    return (
        <>
            <div className="asset__toolbar">
                <div className="asset__toolbar__left">
                    <h2>{title}</h2>
                </div>
                <div className="asset__toolbar__right">
                    <span className="time">最後更新時間 : {refreshTime}</span>
                    <div className="tools">
                        <Button className="btn refresh__btn">
                            <img src={refresh} onClick={refreshAction} />
                        </Button>
                        {/* <Button className="btn refresh__btn">
                            <img src={hide} />
                        </Button> */}
                        <span className="account__info">
                            {user.idno} ｜ {user.username}
                            <Tooltip title="資產總覽僅彙總登入ID所擁有的資產，不適用於群組帳號。">
                                <img src={info} className="info_png" />
                            </Tooltip>
                        </span>
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

                .info_png {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    margin: 0 0px 0 10px;
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
