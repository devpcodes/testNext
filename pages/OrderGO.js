import { useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import CaHead from '../components/includes/CaHead';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';
import { checkLogin } from '../services/components/layouts/checkLogin';
import { StockContainer } from '../components/includes/goOrder/StockContainer';
import SBContainer from '../components/includes/goOrder/SB/SBContainer';
import { setProductInfo, setType } from '../store/goOrder/action';
import { setModal } from '../store/components/layouts/action';

import modalCloseIcon from '../resources/images/components/tradingAccount/acc_close.svg';
import modalTitleConfirmIcon from '../resources/images/components/tradingAccount/attention-error.svg';
import modalTitleConfirmIconSell from '../resources/images/components/tradingAccount/attention-error-sell.svg';
export async function getServerSideProps(context) {
    let requestStockId;
    let requestType;
    if (context.req.query != null) {
        const obj = {};
        if (context.req.query.stockid != null) {
            if (context.req.query.type == null) {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdS = requestStockId;
            }
            if (context.req.query.type === 'S') {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdS = requestStockId;
            }

            if (context.req.query.type === 'H') {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdH = requestStockId;
            }

            //requestStockId = context.req.query.stockid;
        }
        if (context.req.query.type != null) {
            requestType = context.req.query.type;
            obj.requestType = requestType;
        }
        return {
            props: obj,
        };
    }
    return {
        props: {},
    };
}

const OrderGO = ({ requestStockIdS, requestType, requestStockIdH }) => {
    const modal = useSelector(store => store.layout.modal);
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const [leadingBtnShow, setLeadingBtnShow] = useState(true);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const checkLot = useSelector(store => store.goOrder.checkLot);
    const type = useSelector(store => store.goOrder.type);
    const solaceInit = useSelector(store => store.goOrder.solaceInit);
    const init = useRef(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //solaceInit 訂閱到一半被中斷會有bug，所以等它初始化完成
        if (requestType != null && solaceInit && !init.current) {
            init.current = true;
            dispatch(setType(requestType));
        }
    }, [requestType, solaceInit]);

    useEffect(() => {
        if (type === 'S') {
            if (code === '') {
                setTopic([]);
            }
            if (lot === 'Odd') {
                if (!checkLot) {
                    return;
                } else {
                    setTopic([`MKT/*/*/${code}/ODDLOT`, `QUT/*/*/${code}/ODDLOT`, `SNP/*/*/${code}/ODDLOT`]);
                }
            } else {
                setTopic([`MKT/*/*/${code}`, `QUT/*/*/${code}`, `SNP/*/*/${code}`]);
            }
        }
    }, [lot, code, checkLot, type]);

    useEffect(() => {
        if (bs !== '') {
            setLeadingBtnShow(false);
        }
    }, [bs]);

    useEffect(() => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    });

    const handleResize = () => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    };

    const getModalIconHandler = useCallback(
        (type, bs) => {
            switch (type) {
                case 'confirm':
                    if (bs === 'S') {
                        return modalTitleConfirmIconSell;
                    }
                    return modalTitleConfirmIcon;
                default:
                    return '';
            }
        },
        [modal],
    );

    const getModalFooter = useCallback(
        (type, text, ok) => {
            switch (type) {
                case 'info':
                    return (
                        <Button
                            type={'primary'}
                            style={{ width: '100%', height: '44px', borderRadius: '4px' }}
                            onClick={
                                ok != null
                                    ? ok
                                    : () => {
                                          dispatch(setModal({ visible: false, footer: null }));
                                      }
                            }
                        >
                            {text}
                        </Button>
                    );
                default:
                    break;
            }
        },
        [modal],
    );

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="OrderGO__container" id="container">
                <CaHead />
                <PageHead title={'快速下單'} />
                {checkLogin() && type === 'S' && (
                    <SolaceClientComponent subscribeTopic={topic} idno={currentAccount?.idno} />
                )}
                {!checkLogin() && type === 'S' && <SolaceClientComponent subscribeTopic={topic} idno={''} />}
                <Header />
                {type === 'S' && <StockContainer requestStockId={requestStockIdS} />}
                {type === 'H' && <SBContainer requestStockId={requestStockIdH} />}
            </div>
            <LeadingBtn containerHeight={containerHeight} show={leadingBtnShow} />
            <Modal
                {...modal}
                title={
                    <>
                        <img
                            style={{ display: modal.titleIcon === false ? 'none' : 'inline-block' }}
                            src={getModalIconHandler(modal.type, modal.bs)}
                        />
                        <span>{modal.title}</span>
                    </>
                }
                className="confirm__container2"
                okText={modal.okText || '確定'}
                cancelText={modal.cancelText || '取消'}
                closeIcon={<img src={modalCloseIcon} />}
                onCancel={
                    modal.onCancel != null
                        ? modal.onCancel
                        : () => {
                              dispatch(setModal({ visible: false }));
                          }
                }
                footer={
                    modal.footer != null ? modal.footer : getModalFooter(modal.type, modal.okText || '確定', modal.onOk)
                }
                destroyOnClose={true}
            >
                {modal.content}
            </Modal>
            <style global jsx>{`
                * {
                    font-family: 'Roboto', Arial, '儷黑 Pro', 'LiHei Pro', '微軟正黑體', 'Microsoft JhengHei',
                        sans-serif;
                }
                body {
                    overflow: hidden;
                    position: fixed;
                }

                .confirm__container2 {
                    width: 382px !important;
                }
                .confirm__container2 .ant-modal-content {
                    border-radius: 4px;
                }
                .confirm__container2 .ant-modal-header {
                    /* background: #f2f5fa; */
                    padding: 22px 24px;
                }
                .confirm__container2 .ant-btn-primary {
                    background: #f45a4c;
                    border-radius: 2px;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
                    color: white !important;
                    font-size: 1.6rem;
                }
                .confirm__container2 .ant-modal-body {
                    padding-bottom: 36px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                .confirm__container2 .ant-btn {
                    width: 86px;
                    height: 40px;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .confirm__container2 .ant-modal-title {
                    font-size: 2rem;
                    font-weight: bold;
                }
                .confirm__container2 .ant-modal-title span {
                    margin-left: 5px;
                    vertical-align: middle;
                }
                .confirm__container2 .ant-modal-footer {
                    padding: 19px 22px;
                }
                .ant-modal-mask {
                    z-index: 10000;
                }
                .ant-modal-wrap {
                    z-index: 10000;
                }
                /* * {
                    -webkit-overflow-scrolling: auto !important;
                } */
            `}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
