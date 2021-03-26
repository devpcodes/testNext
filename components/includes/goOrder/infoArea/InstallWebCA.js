import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { checkCert, caResultDataHandler } from '../../../../services/webCa';
import { getToken } from '../../../../services/user/accessToken';
import { setHaveCA } from '../../../../store/goOrder/action';
import warning from '../../../../resources/images/components/goOrder/attention-warning.svg';

export const InstallWebCA = () => {
    const dispatch = useDispatch();

    const isLogin = useSelector(store => store.user.isLogin);
    const currentAccount = useSelector(store => store.user.currentAccount);

    const [checkCA, setCheckCA] = useState(false);
    const [reCheckCA, setReCheckCA] = useState(null);
    const suggestAction = useRef('');

    useEffect(() => {
        if (reCheckCA || reCheckCA == null) {
            if (currentAccount.idno) {
                const checkData = checkCert(currentAccount.idno);
                suggestAction.current = checkData.suggestAction;

                if (checkData.suggestAction == 'None') {
                    setCheckCA(true);
                    dispatch(setHaveCA(true));
                } else {
                    setCheckCA(false);
                    dispatch(setHaveCA(false));
                }
                setReCheckCA(false);
            }
        }
    }, [reCheckCA, currentAccount]);

    const signCaHandler = async () => {
        const token = getToken();
        await caResultDataHandler(suggestAction.current, currentAccount.idno, token);
        setReCheckCA(true);
    };
    return (
        <>
            {isLogin && !checkCA && (
                <div className="noLogin__box">
                    <img className="warningIcon" src={warning} />
                    <span className="endTime">下單交易前請先安裝憑證！</span>
                    <Button
                        style={{
                            width: '70px',
                            height: '28px',
                            margin: '0 0 0 9px',
                            padding: '4px 1px 4px 2px',
                            borderRadius: '2px',
                            backgroundColor: '#254a91',
                            color: 'white',
                            lineHeight: '20px',
                            position: 'absolute',
                            right: '16px',
                            top: '8px',
                            border: 'none',
                            letterSpacing: '-1px',
                        }}
                        onClick={() => {
                            signCaHandler();
                        }}
                    >
                        安裝
                    </Button>
                </div>
            )}
            <style jsx>{`
                .noLogin__box {
                    height: 44px;
                    background-color: #e6ebf5;
                    position: relative;
                }
                .warningIcon {
                    margin-left: 16px;
                    margin-top: -1px;
                }
                .endTime {
                    color: #254a91;
                    font-size: 1.4rem;
                    display: inline-block;
                    line-height: 44px;
                    margin-left: 8px;
                }
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
            `}</style>
        </>
    );
};
