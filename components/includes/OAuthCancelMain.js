import { Modal, Button, Tooltip } from 'antd';
import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { getOAuthList, cancelOAuth } from '../../services/components/oauth/getOAuthList';
import { getToken } from '../../services/user/accessToken';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/components/layouts/action';
import { Popover } from 'antd';
import info from '../../resources/images/pages/Service_ForgetPassword/attention-info-circle.svg';
import noDataImg from '../../resources/images/components/oauthCancel/img-no-data.svg';

const OAuthCancelMain = () => {
    const [dataSource, ds_getData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const ds = await getOAuthList(getToken());
            console.log(ds);
            ds_getData(ds);
        } catch (err) {
            Modal.error({
                title: '伺服器錯誤',
            });
        }
    };

    const cancel = async (data, e) => {
        e.preventDefault();
        // Modal.confirm({
        //     content:`你確定要解除在 ${data.name} 應用程式的授權?`,
        //     title: '解除授權',
        //     onOk() {
        //         dispatch(setModal({ visible: false }));
        //         let res_ = cancelOAuth(getToken(),data.id)
        //         .then( res => {
        //         if(res){
        //             console.log('[確認]',res)
        //             dispatch(setModal({ visible: true, content: `${data.name}授權已解除`, type: 'info', title: '系統訊息' }));
        //             getData()
        //         }else{
        //             dispatch(setModal({ visible: true, content: `伺服器錯誤`, type: 'info', title: '系統訊息' }));
        //         }
        //         })
        //     },
        //     okText: '確認',
        //     cancelText: '取消',
        // });
        dispatch(
            setModal({
                visible: true,
                content: `你確定要解除在 ${data.name} 應用程式的授權?`,
                type: 'confirm',
                icon: false,
                title: '解除授權',
                onOk: async () => {
                    dispatch(setModal({ visible: false }));
                    let res_ = cancelOAuth(getToken(), data.id).then(res => {
                        if (res) {
                            console.log('[確認]', res);
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: `${data.name}授權已解除`,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                            getData();
                        } else {
                            dispatch(
                                setModal({ visible: true, content: `伺服器錯誤`, type: 'info', title: '系統訊息' }),
                            );
                        }
                    });
                },
            }),
        );
    };

    return (
        <>
            <div className="content_box">
                <div className="oac_title">
                    第三方授權設定
                    <Popover
                        content={
                            <p className="tooltips">
                                這些是你使用永豐金證券帳號登入過的應用程式或網站，你可以自由地解除與他們之間的授權。
                            </p>
                        }
                        trigger="click"
                        placement="topRight"
                    >
                        <img src={info} className="info for_m" />
                    </Popover>
                </div>
                <div className="sub_text for_pc">
                    這些是你使用永豐金證券帳號登入過的應用程式或網站，你可以自由地解除與他們之間的授權。
                </div>
                <ul className="item_list">
                    {dataSource.length > 0 ? (
                        dataSource.map((x, i) => (
                            <li key={x.clientId}>
                                <div className="list_img">
                                    <img src={x.clientImage}></img>
                                </div>
                                <div className="text_area">
                                    <div className="t1">{x.clientName}</div>
                                    <div className="t2">{x.createdAt}新增</div>
                                </div>
                                <div className="btn_box">
                                    <a
                                        className="btn_r"
                                        onClick={e => cancel({ id: x.clientId, name: x.clientName }, e)}
                                    >
                                        解除<span>授權</span>
                                    </a>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="noDataBox">
                            <img src={noDataImg}></img>
                            <div className="noDataTxt">目前暫無資料</div>
                        </div>
                    )}
                </ul>
            </div>
            <style jsx>{`
                .content_box {
                    max-width: 776px;
                    min-height: 700px;
                    margin: 0px auto;
                    padding-top: 100px;
                }
                .list_img {
                    width: 68px;
                    height: 68px;
                    flex-shrink: 0;
                    padding: 5px;
                    margin: 0 20px 0 0;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    overflow: hidden;
                }
                .list_img img {
                    width: 100%;
                }
                .text_area {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .btn_box {
                    margin: 0 0 0 20px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                }
                .t1 {
                    width: 100%;
                    font-family: Roboto;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 1.5;
                    letter-spacing: -0.2px;
                    color: #0d1623;
                }
                .t2 {
                    width: 100%;
                    font-family: PingFang TC/Arial;
                    font-size: 16px;
                    line-height: 1.5;
                    letter-spacing: 0.4px;
                    color: #6c7b94;
                }
                .btn_r {
                    padding: 0 0.5em;
                    line-height: 2.2;
                    font-size: 14px;
                    text-align: center;
                    margin: 0 auto;
                    word-break: keep-all;
                    color: white;
                    border-radius: 2px;
                    min-width: 86px;
                    line-height: 40px;
                    background-color: #c43826;
                }
                .oac_title {
                    position: relative;
                    margin: 0 578px 12px 1px;
                    font-family: PingFang TC;
                    font-size: 28px;
                    font-weight: 700;
                    color: #0d1623;
                }
                .sub_text {
                    width: 774px;
                    height: 22px;
                    margin: 12px 0 28px 2px;
                    font-family: PingFang TC;
                    font-size: 16px;
                    font-weight: 700;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #6c7b94;
                }
                .item_list {
                    width: 776px;
                    margin: 28px 0 4em;
                    padding: 0;
                    list-style: none;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #ffffff;
                }
                .item_list li {
                    width: 100%;
                    padding: 20px;
                    border-bottom: solid 1px #d7e0ef;
                    display: flex;
                }
                .item_list li:last-child {
                    border-bottom: none;
                }
                .noDataBox {
                    text-align: center;
                    padding: 60px 0;
                }
                .noDataBox .noDataTxt {
                    text-align: center;
                    font-size: 16px;
                    color: #3f5372;
                    margin-top: 1.5em;
                }
                .for_m {
                    display: none;
                }
                @media (max-width: 768px) {
                    .content_box {
                        width: 100%;
                        padding: 0;
                        min-height: 0px;
                    }
                    .content_box {
                    }
                    .list_img {
                        width: 52px;
                        height: 52px;
                    }
                    .text_area {
                        width: calc(100% - 105px);
                    }
                    .btn_box {
                        margin-left: 16px;
                    }
                    .oac_title {
                        font-size: 20px;
                        margin: 0;
                        padding: 20px 16px;
                    }
                    .item_list {
                        width: 100%;
                        margin: 0;
                        border-width: 1px 0;
                        border-radius: 0;
                    }
                    .item_list li {
                        padding: 16px;
                    }
                    .btn_r {
                        line-height: 2;
                        min-width: 50px;
                    }
                    .btn_r span {
                        display: none;
                    }
                    .noDataBox {
                        padding: 40px 0;
                    }
                    .noDataBox img {
                        width: 100px;
                    }
                    .noDataBox .noDataTxt {
                        margin-top: 1em;
                    }
                    .for_pc {
                        display: none;
                    }
                    .for_m {
                        display: inherit;
                    }
                }
            `}</style>
            <style jsx global>{`
                body {
                    background-color: #f9fbff;
                }
                .ant-tooltip-inner {
                    color: #000;
                }
                .tooltips {
                    width: 230px;
                    margin: 0;
                    color: #3f5372;
                }
                .info {
                    right: 15px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                .ant-modal-title img {
                    display: none;
                }
                .ant-modal-title span {
                    font-size: 20px;
                    line-height: 1.7;
                }
                .confirm__container .ant-modal-header {
                    background-color: #ffffff;
                }
                .confirm__container .ant-modal-body {
                    color: #6c7b94;
                    font-size: 16px;
                }
                .ant-btn.ant-btn-primary {
                    background: #c43826;
                }
            `}</style>
        </>
    );
};

export default OAuthCancelMain;
