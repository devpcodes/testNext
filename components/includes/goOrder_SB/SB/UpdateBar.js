import { useState, useEffect } from 'react';
import icon from '../../../../resources/images/components/goOrder/ic-trending-up.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { setRefreshCode } from '../../../../store/goOrderSB/action';
const UpdateBar = ({ text }) => {
    const code = useSelector(store => store.goOrder.code);
    const refreshCode = useSelector(store => store.goOrderSB.refreshCode);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (refreshCode === '') {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            setLoading(true);
        }
    }, [refreshCode]);

    const reloadHandler = () => {
        dispatch(setRefreshCode(code));
    };
    return (
        <>
            <div className="noLogin__box">
                {<img className="noLoginIcon" src={icon} />}
                <span className="text">{text}</span>
                <Button
                    style={{
                        width: '70px',
                        height: '28px',
                        margin: '0 0 0 9px',
                        padding: '4px 1px 4px 2px',
                        borderRadius: '2px',
                        backgroundColor: '#254a91',
                        color: 'white',
                        position: 'absolute',
                        right: '16px',
                        top: '8px',
                        border: 'none',
                    }}
                    onClick={() => {
                        reloadHandler();
                    }}
                    loading={loading}
                >
                    更新
                </Button>
            </div>
            <style jsx>{`
                .noLogin__box {
                    height: 44px;
                    background-color: #e6ebf5;
                    position: relative;
                }
                .noLoginIcon {
                    margin-left: 16px;
                    /* margin-top: 15px; */
                }
                .text {
                    color: #254a91;
                    font-size: 1.4rem;
                    display: inline-block;
                    line-height: 44px;
                    margin-left: 8px;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
};

export default UpdateBar;
