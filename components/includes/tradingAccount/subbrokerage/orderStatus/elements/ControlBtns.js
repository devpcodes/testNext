import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { postStockInfo } from '../../../../../../services/components/goOrder/sb/postStockInfo';
import { getToken } from '../../../../../../services/user/accessToken';
import { setModal } from '../../../../../../store/components/layouts/action';
import UpdateQtyModal from './UpdateQtyModal';
import TitleBox from '../../../../goOrder_SB/SB/searchList/TitleBox';

const ControlBtns = ({ BS, CanCancel, CanModify, data }) => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const getQtyValueHandler = () => {};
    const delHandler = () => {};
    const updateHandler = async () => {
        const marketID = data.StockID.split('.').slice(-1).pop();
        const symbol = data.StockID.substring(0, data.StockID.lastIndexOf('.'));
        try {
            const stockInfo = await getStockInfo(currentAccount, marketID, symbol);
            dispatch(
                setModal({
                    title: '改量',
                    type: 'confirm',
                    content: (
                        <UpdateQtyModal
                            title={
                                <TitleBox
                                    info={data}
                                    stockInfo={stockInfo}
                                    style={{ marginBottom: '10px' }}
                                    icon={false}
                                />
                            }
                            product={'123'}
                            label={'123'}
                            color={BS === 'B' ? '#f45a4c' : '#22a16f'}
                            price={100}
                            unit={'股'}
                            value={100}
                            getValue={getQtyValueHandler}
                            data={[]}
                        />
                    ),
                    visible: true,
                }),
            );
        } catch (error) {
            message.info({
                content: error,
            });
        }
    };

    const getStockInfo = async (currentAccount, market, code) => {
        if (getToken()) {
            let AID = null;
            if (currentAccount != null && currentAccount.broker_id != null && currentAccount.accttype === 'H') {
                AID = currentAccount.broker_id + currentAccount.account;
            }
            const Exchid = market;
            const stockID = code;
            const token = getToken();
            return await postStockInfo({ AID, Exchid, stockID, token });
        }
    };

    return (
        <>
            {CanCancel === 'Y' && (
                <button className="btn" onClick={delHandler}>
                    <span>刪</span>
                </button>
            )}
            {CanModify === 'Y' && (
                <button className="btn" onClick={updateHandler}>
                    <span>改</span>
                </button>
            )}
            <style jsx>
                {`
                    .btn {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        background-color: ${BS === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${BS === 'B' ? '#f45a4c' : '#22a16f'};
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
                        background-color: ${BS === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
        </>
    );
};
export default ControlBtns;
