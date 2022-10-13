import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalTable from '../../overview/elements/VerticalTable';
import { setModal } from '../../../../../store/components/layouts/action';
import qrCode from '../../../../../resources/images/components/loanZone/demo.jpg';
const QRcodeModal = ({ btnText, className }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();

    useEffect(() => {}, []);
    const data = [
        {
            label: '銀行帳戶',
            value: (
                <>
                    <p className="item__p" style={{ marginBottom: 0 }}>
                        807永豐商業銀行 1262城中分行
                    </p>
                    <p className="item__p" style={{ marginBottom: 0 }}>
                        12600100386717
                    </p>
                </>
            ),
            labelStyle: {
                flex: '1.5 0 0',
            },
            valueStyle: {
                flex: '3 0 0',
            },
        },
        {
            label: '戶名',
            value: '永豐金證券公司客戶證券交割專戶',
            labelStyle: {
                flex: '1.5 0 0',
            },
            valueStyle: {
                flex: '3 0 0',
            },
        },
        {
            label: '分公司電話',
            value: '02-23495004',
            labelStyle: {
                flex: '1.5 0 0',
            },
            valueStyle: {
                flex: '3 0 0',
            },
        },
    ];
    const clickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '如何申請還款',
                type: 'info',
                bodyStyle: {
                    height: 350,
                    overflow: 'auto',
                },
                content: (
                    <>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>
                            1. 每筆借款期限為6個月，到期可向分公司申請展延，或於借貸期間隨時申請還款。
                        </p>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>2. 還款方式：</p>
                        <div style={{ marginLeft: '30px', color: '#0d1623' }}>
                            <p style={{ marginBottom: '5px' }}>
                                • <span style={{ fontWeight: 'bold' }}>賣股還款：</span>
                                透過線上或臨櫃交易賣出擔保品以償還該筆借款，扣除利息與相關費用並償還本金後，餘額將返還至您的交割帳戶。
                            </p>
                            <p>
                                • <span style={{ fontWeight: 'bold' }}>現金還款：</span>
                                請將還款金額轉帳或匯款至各分公司之償還帳戶，並去電至分公司進行還款指示，或以現金至臨櫃完成還款，還款費用以扣除利息與相關費用後再償還本金。
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <VerticalTable
                                data={data}
                                style={{
                                    flex: '3 0 0',
                                }}
                            />
                        </div>
                        <p
                            style={{
                                marginTop: '16px',
                                color: '#6c7b94',
                                marginBottom: 0,
                                display: isMobile ? 'none' : 'block',
                            }}
                        ></p>
                    </>
                ),
                okText: '確認',
                width: '600px',
            }),
        );
    };
    return (
        <a className={className} onClick={clickHandler}>
            {btnText ? btnText : '我要還款'}
        </a>
    );
};

export default QRcodeModal;
