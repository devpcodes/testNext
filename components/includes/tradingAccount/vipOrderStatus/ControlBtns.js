import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import {
    mappingShowChangeBtn,
    checkPriceUpdate,
    mappingCommissionedCodeTradingAcc,
    mappingCommissionedCode,
    mappingIspreOrder,
    padLeft,
} from '../../../../services/components/goOrder/dataMapping';
import UpdateQtyModal from './UpdateQtyModal';
import icon from '../../../../resources/images/components/tradingAccount/attention-error.svg';
import iconSell from '../../../../resources/images/components/tradingAccount/attention-error-sell.svg';
import closeIcon from '../../../../resources/images/components/tradingAccount/acc_close.svg';
import { getToken } from '../../../../services/user/accessToken';
import { getCookie } from '../../../../services/components/layouts/cookieController';
import { getWebId } from '../../../../services/components/goOrder/getWebId';
import { postUpdatePrice } from '../../../../services/components/goOrder/postUpdatePrice';
import { checkSignCA, sign } from '../../../../services/webCa';
import { usePlatform } from '../../../../hooks/usePlatform';
import UpdatePriceModal from './UpdatePriceModal';
import { formatPrice, formatPriceByUnit } from '../../../../services/numFormat';
//{ ord_bs, status_code, price_flag, order_type1, delClickHandler, id }
let qtyValue = '';
let priceValue = '';
const ControlBtns = ({ data, delClickHandler, submitSuccess }) => {
    const [showControlBtn, setShowControlBtn] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('qty');
    const currentAccount = useSelector(store => store.user.currentAccount);
    const platform = usePlatform();

    useEffect(() => {
        qtyValue = getQtyHandler();
        priceValue = data.price;
    }, []);

    useEffect(() => {
        setShowControlBtn(mappingShowChangeBtn(data.status_code));
    }, [data.ord_bs, data.status_code, data.price_flag, data.ord_type1]);

    const qtyUpdateHandler = useCallback(() => {
        // console.log('ddd===', data);
        setIsModalVisible(true);
        setModalContent('qty');
    }, [data]);

    const priceUpdateHandler = useCallback(() => {
        setIsModalVisible(true);
        setModalContent('price');
    }, [data]);

    const getLabel = useMemo(() => {
        return mappingCommissionedCodeTradingAcc(data.ord_bs, data.ord_type2, data.market_id, data.ord_type1);
    }, [data]);

    const getQtyHandler = useCallback(() => {
        let qty;
        let cancelQty;
        let match_qty;
        if (data.ord_type1 === '2' || data.ord_type1 === 'C') {
            qty = Number(data.qty);
            cancelQty = Number(data.cancel_qty);
            match_qty = Number(data.match_qty);
        } else {
            qty = Number(data.qty) / 1000;
            cancelQty = Number(data.cancel_qty) / 1000;
            match_qty = Number(data.match_qty) / 1000;
        }
        return qty - cancelQty - match_qty;
    });

    const getQtyValueHandler = useCallback(val => {
        qtyValue = val;
    });

    const getPriceValueHandler = useCallback(val => {
        // console.log('price', val);
        priceValue = val;
    });

    const getContent = useMemo(() => {
        if (modalContent === 'qty') {
            return (
                <UpdateQtyModal
                    product={data.name_zh}
                    label={getLabel}
                    color={data.ord_bs === 'B' ? '#f45a4c' : '#22a16f'}
                    price={formatPriceByUnit(data.stock_id, data.price)}
                    unit={data.ord_type1 === '2' || data.ord_type1 === 'C' ? '???' : '???'}
                    value={getQtyHandler()}
                    getValue={getQtyValueHandler}
                    data={data}
                />
            );
        } else {
            return (
                <UpdatePriceModal
                    product={data.name_zh}
                    label={getLabel}
                    color={data.ord_bs === 'B' ? '#f45a4c' : '#22a16f'}
                    price={formatPriceByUnit(data.stock_id, data.price)}
                    qty={getQtyHandler()}
                    unit={data.ord_type1 === '2' || data.ord_type1 === 'C' ? '???' : '???'}
                    value={formatPriceByUnit(data.stock_id, data.price)}
                    getValue={getPriceValueHandler}
                    stock_id={data.stock_id}
                    data={data}
                />
            );
        }
    }, [modalContent, data]);

    const titleContent = () => {
        return (
            <>
                <img src={data.ord_bs === 'B' ? icon : iconSell} />
                <span>{modalContent === 'qty' ? '??????' : '??????'}</span>
            </>
        );
    };

    const submitHandler = useCallback(async () => {
        setIsModalVisible(false);
        // var ca_content = {
        //     signature:
        //         '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',
        //     plainText: 'ACCIFFACDJ1582264901237',
        //     certSN: '6036E563',
        //     type: 'web',
        // };
        const token = getToken();
        const ca_content = sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token,
        );
        if (checkSignCA(ca_content)) {
            const ID = currentAccount.idno;
            //TODO cookie???????????????
            const IP = getCookie('client_ip');
            const account = currentAccount.account;
            const broker_id = currentAccount.broker_id;
            const is_preorder = mappingIspreOrder(data.ord_no);
            const market_id = data.market_id;
            const ord_bs = data.ord_bs;
            const ord_cond = data.ord_type2;
            const ord_no = data.ord_no;
            const ord_price = priceValue;
            const ord_qty = qtyValue;
            const ord_seq = padLeft(data.sord_seq, 6);
            const ord_type = data.ord_type1;
            const stock_id = data.stock_id;
            const web_id = getWebId(platform, 'stock');
            const resVal = await postUpdatePrice({
                ID,
                IP,
                account,
                broker_id,
                is_preorder,
                market_id,
                ord_bs,
                ord_cond,
                ord_no,
                ord_price,
                ord_qty,
                ord_seq,
                ord_type,
                stock_id,
                token,
                web_id,
                ca_content,
                postName: modalContent,
            });
            if (submitSuccess != null) {
                submitSuccess();
            }
            if (resVal.indexOf('??????') >= 0) {
                Modal.success({
                    content: resVal,
                });
            } else {
                Modal.warning({
                    content: resVal,
                });
            }
        }
    }, [data, modalContent]);

    const cancelHandler = useCallback(() => {
        setIsModalVisible(false);
    });

    const getModalClassName = useCallback(bs => {
        if (bs === 'B') {
            return 'confirm__container';
        } else {
            return 'confirm__container confirm__container-s';
        }
    });
    return (
        <div>
            {showControlBtn && (
                <>
                    <button className="btn" onClick={delClickHandler.bind(null, data.key)}>
                        <span>???</span>
                    </button>
                    {data.market_id !== 'R' && (
                        <button className="btn" onClick={qtyUpdateHandler}>
                            <span>???</span>
                        </button>
                    )}
                    {checkPriceUpdate(data.price_flag, data.ord_type1, data.market_id) && (
                        <button className="btn" onClick={priceUpdateHandler}>
                            <span>???</span>
                        </button>
                    )}
                    <Modal
                        title={titleContent()}
                        visible={isModalVisible}
                        // className="confirm__container"
                        className={getModalClassName(data.ord_bs)}
                        okText="??????"
                        cancelText="??????"
                        onCancel={cancelHandler}
                        closeIcon={<img src={closeIcon} />}
                        onOk={submitHandler}
                        destroyOnClose={true}
                    >
                        {getContent}
                    </Modal>
                </>
            )}

            <style jsx>
                {`
                    .btn {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        background-color: ${data.ord_bs === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${data.ord_bs === 'B' ? '#f45a4c' : '#22a16f'};
                        padding-left: 4px;
                        padding-right: 4px;
                        margin-right: 4px;
                        font-weight: bold;
                        border-radius: 2px;
                        transition: all 0.3s;
                    }
                    .btn:last-child {
                        margin-right: 0;
                    }
                    .btn:hover {
                        background-color: ${data.ord_bs === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
            <style global jsx>{`
                .confirm__container {
                    width: 382px !important;
                }
                .confirm__container .ant-modal-content {
                    border-radius: 4px;
                }
                .confirm__container .ant-modal-header {
                    background: #f2f5fa;
                }
                .confirm__container .ant-btn-primary {
                    background: #f45a4c;
                    border-radius: 2px;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
                    color: white !important;
                    font-size: 1.6rem;
                }
                .confirm__container-s .ant-btn-primary {
                    background: #22a16f;
                    border-radius: 2px;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
                    color: white !important;
                    font-size: 1.6rem;
                }
                .confirm__container .ant-modal-body {
                    padding-bottom: 36px;
                }
                .confirm__container .ant-btn {
                    width: 86px;
                    height: 40px;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .confirm__container .ant-modal-title {
                    font-size: 2rem;
                    font-weight: bold;
                }
                .confirm__container .ant-modal-title span {
                    margin-left: 5px;
                    vertical-align: middle;
                }
                .confirm__container .ant-modal-footer {
                    padding: 19px 22px;
                }
            `}</style>
        </div>
    );
};

export default ControlBtns;
