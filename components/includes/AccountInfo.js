import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { setModal } from '../../store/components/layouts/action';
import { getAccountData, getCustomerCredit } from '../../services/getAccountInfo';
import { getToken } from '../../services/user/accessToken';
import { EnvironmentFilled, InfoCircleFilled } from '@ant-design/icons';
import info from '../../resources/images/pages/Service_ForgetPassword/attention-info-circle.svg';
import { AccountDropdown } from './personalArea/accountDropdown/AccountDropdown';
import Breadcrumb from './breadcrumb/breadcrumb';
import { Popover } from 'antd';
const AccountInfo = () => {
    const winWidth = useSelector(store => store.layout.winWidth);
    const isMobile = useSelector(store => store.layout.isMobile);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState({});
    const [dataMore, setDataMore] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, [currentAccount]);

    const getData = async () => {
        try {
            //
            let token = getToken();
            let ds = await getAccountData(token, currentAccount.idno, currentAccount.broker_id, currentAccount.account);
            console.log(ds);
            if (ds) {
                setData(ds);
            }
            let more = await getCustomerCredit(currentAccount.broker_id, currentAccount.account, token);
            if (more) {
                console.log(more);
                setDataMore(more);
            }
        } catch (err) {
            Modal.error({
                title: '伺服器錯誤',
            });
        }
    };

    const dateFormat = val => {
        if (val) {
            let d = val.split('');
            let d_ = d[0] + d[1] + d[2] + d[3] + '/' + d[4] + d[5] + '/' + d[6] + d[7];
            return d_;
        } else {
            return '--';
        }
    };
    const clickHandler = type => {
        let title = type == 'address' ? '變更戶籍地址' : '開立電子交易';
        let content =
            type == 'address'
                ? '戶籍地址無法線上變更，如需變更請至鄰近分公司辦理！'
                : '您尚未開立電子戶，請洽所屬營業員/理財專員，將為您服務。';
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: title,
                type: 'info',
                bodyStyle: {
                    height: 'auto',
                    overflow: 'auto',
                },
                content: content,
                okText: '確認',
                width: '320px',
            }),
        );
    };

    return (
        <>
            <div id="AccInfo__container">
                <div className="AccInfoContent">
                    <div className="mainArea mainArea1">
                        <div className="breadCrumb">{winWidth > 530 && <Breadcrumb />}</div>
                        <div className="topTitle">
                            帳戶基本資料
                            <Popover
                                content={'以下資訊僅用於描述描述個人資料，你的資料將會安全地被我們保存且不會公開'}
                                trigger={isMobile ? 'click' : 'hover'}
                                placement="bottomRight"
                                className="infoPopoverBtn forMB"
                                overlayClassName="infoPopover"
                                overlayStyle={{ width: '70%' }}
                            >
                                <img src={info} />
                            </Popover>
                        </div>
                        <div className="subTitle flexBox ">
                            <p className="forPC">
                                以下資訊僅用於描述描述個人資料，你的資料將會安全地被我們保存且不會公開
                            </p>
                            <div className="AccountDropdownBox">
                                <AccountDropdown
                                    type={'S'}
                                    personalAreaVisible={false}
                                    tradingLayout={true}
                                    width={'100%'}
                                    tradingContainerWidth={'100%'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mainArea mainArea2 flexBox">
                        <div className="contentBox fullWidth" fullWidth>
                            <div className="title flexBox">開戶資料</div>
                            <div className="firstDatabox flexBox">
                                <div className="dataBox">
                                    <p>
                                        <span>證券帳號</span>
                                        <span>{data.ACNT ? data.ACNT : '--'}</span>
                                    </p>
                                    <p>
                                        <span>開戶日期</span>
                                        <span name="OAODATE">{data.OAODATE ? dateFormat(data.OAODATE) : '--'}</span>
                                    </p>
                                    <p>
                                        <span>帳戶狀態</span>
                                        <span>{data.OASTATUS ? data.OASTATUS : '--'}</span>
                                    </p>
                                    <p>
                                        <span>台幣交割銀行</span>
                                        <span>{data.BANK ? data.BANK : '--'}</span>
                                    </p>
                                    <p>
                                        <span>台幣交割帳號</span>
                                        <span>{data.BACNO ? data.BACNO : '--'}</span>
                                    </p>
                                    <p>
                                        <span>戶籍地址</span>
                                        <span>
                                            {data.NADDR ? data.NADDR : '--'}
                                            <br className="forMB" />{' '}
                                            <a onClick={clickHandler.bind(null, 'address')} className="ml-10">
                                                變更
                                            </a>
                                        </span>
                                    </p>
                                    {/* <p> 
                                        <span>手續費率 </span>
                                        <span>
                                            <a>查看更多</a>
                                        </span>
                                    </p> */}
                                </div>
                                <div className="dataBox">
                                    <p>
                                        <span>分公司名稱</span>
                                        <span>{data.BKNO ? data.BKNO : '--'}</span>
                                    </p>
                                    <p>
                                        <span>分公司電話</span>
                                        <span>{data.BKNO_TEL ? data.BKNO_TEL : '--'}</span>
                                    </p>
                                    <p>
                                        <span>分公司地址</span>
                                        <span>
                                            {data.BKNO_ADDR ? (
                                                <a
                                                    href="https://www.sinotrade.com.tw/newweb/Service_Positions/"
                                                    className="textBlack"
                                                >
                                                    <EnvironmentFilled
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#daa360',
                                                            marginRight: '5px',
                                                        }}
                                                    />
                                                    {data.BKNO_ADDR}
                                                </a>
                                            ) : (
                                                '--'
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        <span>營業員</span>
                                        <span>{data.BROKER ? data.BROKER : '--'}</span>
                                    </p>
                                    <p>
                                        <span>理專</span>
                                        <span>{data.RM ? data.RM : '--'}</span>
                                    </p>
                                    <p>
                                        <span>最後交易日</span>
                                        <span name="LAST_TRADE_DATE">
                                            {data.LAST_TRADE_DATE ? dateFormat(data.LAST_TRADE_DATE) : '--'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">一般交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>電子交易</span>
                                    <span>
                                        {data.GASTATUS === '正常' ? (
                                            data.GASTATUS
                                        ) : (
                                            <a onClick={clickHandler.bind(null, 'apply')}>立即申辦</a>
                                        )}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        單日買賣額度
                                        <Popover
                                            content="人工＋電子額度"
                                            trigger={isMobile ? 'click' : 'hover'}
                                            placement="top"
                                            className="infoPopoverBtn"
                                            overlayClassName="infoPopover"
                                        >
                                            <InfoCircleFilled />
                                        </Popover>
                                    </span>
                                    <span>
                                        {data.TAMT ? data.TAMT : '--'}
                                        {/* <a>申請調整</a> */}
                                    </span>
                                </p>
                                <p>
                                    <span>總電子交易額度</span>
                                    <span>
                                        {dataMore.leaves ? dataMore.leaves : '--'}
                                        {/*<a>申請調整</a> */}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        今日電子已用/
                                        <br className="forMB" />
                                        剩餘額度
                                    </span>
                                    <span>
                                        {dataMore.used ? dataMore.used : '--'}/
                                        <br className="forMB" />
                                        {dataMore.leaves ? dataMore.leaves : '--'}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">當沖交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>可現沖方式</span>
                                    <span name="DTFLAG">
                                        {data.DTSTATUS === '正常' ? (
                                            data.DTFLAG
                                        ) : (
                                            <a href="https://www.sinotrade.com.tw/newweb/Inside_Frame/?URL=https://service.sinotrade.com.tw/signCenter/index/">
                                                立即簽署
                                            </a>
                                        )}
                                    </span>
                                </p>
                                <p>
                                    <span>現沖額度</span>
                                    <span>{data.DTAMT ? data.DTAMT : '--'}</span>
                                </p>
                                <p>
                                    <span>交易啟用日</span>
                                    <span name="DTBDT">{data.DTBDT ? dateFormat(data.DTBDT) : '--'}</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">信用交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>{data.CDATE === '正常' ? data.CDATE : <a>立即開信用戶</a>}</span>
                                </p>
                                <p>
                                    <span>信用開戶日</span>
                                    <span name="CTODATE">{data.CTODATE ? dateFormat(data.CTODATE) : '--'}</span>
                                </p>
                                <p>
                                    <span>整戶維持率</span>
                                    <span>{data.SCD21 ? data.SCD21 : '--'}</span>
                                </p>
                                <p>
                                    <span>總融資額度</span>
                                    <span>{dataMore.finAmt ? dataMore.finAmt : '--'}</span>
                                </p>
                                <p>
                                    <span>
                                        今日融資已用／
                                        <br className="forMB" />
                                        剩餘額度
                                    </span>
                                    <span>
                                        {dataMore.finUsedAmt ? dataMore.finUsedAmt : '--'}/
                                        <br className="forMB" />
                                        {dataMore.finLeavesAmt ? dataMore.finLeavesAmt : '--'}
                                    </span>
                                </p>
                                <p>
                                    <span>總融券額度</span>
                                    <span>{dataMore.shortAmt ? dataMore.shortAmt : '--'}</span>
                                </p>
                                <p>
                                    <span>
                                        今日融券已用／
                                        <br className="forMB" />
                                        剩餘額度
                                    </span>
                                    <span>
                                        {dataMore.shortUsedAmt ? dataMore.shortUsedAmt : '--'}/
                                        <br className="forMB" />
                                        {dataMore.shortLeavesAmt ? dataMore.shortLeavesAmt : '--'}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">
                                借券交易 <a className="arrowLink">前往借貸專區</a>
                            </div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>{data.SLSTATUS === '正常' ? data.SLSTATUS : <a>立即開借券戶</a>}</span>
                                </p>
                                <p>
                                    <span>帳戶類型</span>
                                    <span>{data.TOL ? data.TOL : '--'}</span>
                                </p>
                                <p>
                                    <span>借券額度</span>
                                    <span>{data.LAMT ? data.LAMT : '--'}</span>
                                </p>
                                <p>
                                    <span>
                                        已用額度／
                                        <br className="forMB" />
                                        借券可用
                                    </span>
                                    <span>
                                        {data.LAMTU ? data.LAMTU : '--'}/<br className="forMB" />
                                        {data.LAMTUA ? data.LAMTUA : '--'}
                                    </span>
                                </p>
                                <p>
                                    <span>未還借券金額</span>
                                    <span>{data.ULAMT ? data.ULAMT : '--'}</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">
                                不限用途款項借貸 <a className="arrowLink">前往借貸專區</a>
                            </div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>{data.ELSTATUS === '正常' ? data.ELSTATUS : <a>立即申辦</a>}</span>
                                </p>
                                <p>
                                    <span>整戶維持率</span>
                                    <span>{data.ELMR ? data.ELMR : '--'}</span>
                                </p>
                                <p>
                                    <span>總計可借款金額</span>
                                    <span>{data.LOC ? data.LOC : '--'}</span>
                                </p>
                                <p>
                                    <span>
                                        已申請借款／
                                        <br className="forMB" />
                                        剩餘可借
                                    </span>
                                    <span>
                                        {data.AA ? data.AA : '--'}/<br className="forMB" />
                                        {data.RAA ? data.RAA : '--'}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        已動用／
                                        <br className="forMB" />
                                        剩餘可動用
                                    </span>
                                    <span>
                                        {data.AU ? data.AU : '--'}/<br className="forMB" />
                                        {data.RAU ? data.RAU : '--'}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">其他交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>語音交易</span>
                                    <span>{data.VCUSTOMER ? data.VCUSTOMER : '--'}</span>
                                </p>
                                <p>
                                    <span>興櫃交易</span>
                                    <span>
                                        {data.NEWEMERGINGFLAG === '已簽署' ? data.NEWEMERGINGFLAG : <a>立即簽署</a>}
                                    </span>
                                </p>
                                <p>
                                    <span>券差借貸同意書</span>
                                    <span>
                                        {data.NEWEMERGINGFLAG === '已簽署' ? data.NEWEMERGINGFLAG : <a>立即簽署</a>}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <>
                            {/* <div className="middleTitle">其他情境</div>
                        <div className="contentBox">
                            <div className="title flexBox">一般交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>電子交易</span>
                                    <span>
                                        <a>立即申辦</a>
                                    </span>
                                </p>
                                <p>
                                    <span>單日買賣額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>總電子交易額度</span>
                                    <span>正常</span>
                                </p>
                                <p>
                                    <span>今日電子已用/剩餘額度</span>
                                    <span>正常</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title">當沖交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>可現沖方式</span>
                                    <span>9A95-198515</span>
                                </p>
                                <p>
                                    <span>現沖額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>交易啟用日</span>
                                    <span>正常</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title">信用交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>
                                        <a>立即開信用戶</a>
                                    </span>
                                </p>
                                <p>
                                    <span>信用開戶日</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>整戶維持率</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>總融資額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>今日融資已用／剩餘額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>總融券額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>今日融券已用／剩餘額度</span>
                                    <span>正常</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">
                                借券交易 <a className="arrowLink">前往借貸專區</a>
                            </div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>
                                        <a>立即開借券戶</a>
                                    </span>
                                </p>
                                <p>
                                    <span>帳戶類型</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>借券額度</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>已用額度／借券可用</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>未還借券金額</span>
                                    <span>2015.05.23</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">
                                不限用途款項借貸 <a className="arrowLink">前往借貸專區</a>
                            </div>
                            <div className="dataBox">
                                <p>
                                    <span>帳戶狀態</span>
                                    <span>
                                        <a>立即申辦</a>
                                    </span>
                                </p>
                                <p>
                                    <span>整戶維持率</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>總計可借款金額</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>已申請借款／剩餘可借</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>已動用／剩餘可動用</span>
                                    <span>2015.05.23</span>
                                </p>
                            </div>
                        </div>
                        <div className="contentBox">
                            <div className="title flexBox">其他交易</div>
                            <div className="dataBox">
                                <p>
                                    <span>語音交易</span>
                                    <span>9A95-198515</span>
                                </p>
                                <p>
                                    <span>興櫃交易</span>
                                    <span>2015.05.23</span>
                                </p>
                                <p>
                                    <span>券差借貸同意書</span>
                                    <span>
                                        <a>立即簽署</a>
                                    </span>
                                </p>
                            </div>
                        </div> */}
                        </>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .red {
                    color: red;
                }
                #AccInfo__container {
                    width: 100%;
                    min-height: 520px;
                    background: #f9fbff;
                }
                #AccInfo__container .AccInfoContent {
                    width: 80%;
                    margin: 0 auto;
                    padding: 1px 0 40px;
                }
                #AccInfo__container .flexBox {
                    display: flex;
                    justify-content: space-between;
                }
                #AccInfo__container .arrowLink::after {
                    content: '';
                    display: inline-block;
                    margin-left: 1em;
                    width: 8px;
                    height: 8px;
                    border: 2px solid #0d1623;
                    border-width: 2px 2px 0 0;
                    transform: rotate(45deg) translateY(-1px);
                    margin-left: 4px;
                }
                #AccInfo__container .breadCrumb {
                    margin-bottom: 20px;
                }
                .mainArea1 .topTitle {
                    font-size: 28px;
                    color: #0d1623;
                    line-height: 2;
                }
                .mainArea1 .subTitle > p {
                    font-size: 16px;
                    color: #3f5372;
                }
                .mainArea1 .subTitle > div {
                }
                .mainArea2 {
                    flex-wrap: wrap;
                }
                .mainArea2 .middleTitle {
                    width: 100%;
                    color: #0d1623;
                    font-size: 16px;
                    font-weight: 800;
                    margin-top: 40px;
                }
                .mainArea2 .contentBox {
                    font-size: 16px;
                    border: 1px solid #d7e0ef;
                    margin: 10px 0;
                    width: calc(50% - 10px);
                    background-color: #fff;
                }
                .mainArea2 .contentBox.fullWidth {
                    width: 100%;
                }
                .mainArea2 .contentBox .title {
                    color: #3f5372;
                    padding: 0 20px;
                    line-height: 40px;
                    border-bottom: 1px solid #d7e0ef;
                    background-color: #f2f5fa;
                    width: 100%;
                }
                .mainArea2 .contentBox .title a {
                    font-size: 14px;
                    color: #0d1623;
                }
                .mainArea2 .contentBox .dataBox {
                    padding: 20px 20px 5px;
                    width: 100%;
                }
                .mainArea2 .contentBox .dataBox p {
                    color: #0d1623;
                    justify-content: space-between;
                    display: flex;
                }
                .mainArea2 .contentBox .dataBox p a {
                    color: #c97b1d;
                }
                .mainArea2 .contentBox .dataBox p a.ml-10 {
                    margin-left: 10px;
                }
                .mainArea2 .contentBox .dataBox p > span:nth-child(1) {
                    width: 40%;
                    font-weight: 700;
                }
                .mainArea2 .contentBox .dataBox p > span:nth-child(2) {
                    width: 57%;
                }
                .textBlack {
                    color: #0d1623 !important;
                }
                .forPC {
                    display: inherite;
                }
                .forMB {
                    display: none;
                }
                @media screen and (max-width: 425px) {
                    .forPC {
                        display: none;
                    }
                    .forMB {
                        display: block;
                    }
                    .flexBox {
                        flex-wrap: wrap;
                    }
                    #AccInfo__container .AccInfoContent {
                        width: 90%;
                    }
                    .mainArea1 .topTitle {
                        font-size: 20px;
                        font-weight: 800;
                        margin-bottom: 0.5em;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .mainArea2 .contentBox {
                        width: 100%;
                    }
                    .mainArea2 .firstDatabox .dataBox:nth-child(2) {
                        width: 100%;
                    }
                    .mainArea2 .contentBox .dataBox p > span:nth-child(1) {
                        width: 45%;
                    }
                    .mainArea2 .contentBox .dataBox p > span:nth-child(2) {
                        width: 52%;
                        text-align: right;
                    }
                    #AccInfo__container .flexBox {
                        display: flex;
                        justify-content: space-between;
                    }
                    .mainArea2 .contentBox {
                        font-size: 15px;
                    }
                }
            `}</style>
            <style jsx global>{`
                #AccInfo__container .infoPopoverBtn {
                    margin-left: 5px;
                }
                .infoPopover .ant-popover-arrow {
                    border-color: #0d1623 !important;
                }
                .infoPopover .ant-popover-inner-content {
                    color: #fff;
                    background: #000;
                }
                @media screen and (max-width: 425px) {
                    #AccInfo__container .AccountDropdownBox {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default AccountInfo;
