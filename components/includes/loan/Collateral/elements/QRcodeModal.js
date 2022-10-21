import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalTable from '../../overview/elements/VerticalTable';
import { setModal } from '../../../../../store/components/layouts/action';
import qrCode from '../../../../../resources/images/components/loanZone/demo.jpg';
import RepayContent from './RepayContent';
const QRcodeModal = ({ btnText, className }) => {
    // const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();

    useEffect(() => {}, []);
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
                content: <RepayContent />,
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
