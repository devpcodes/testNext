import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { setBs } from '../../../store/goOrder/action';
import { useDispatch, useSelector } from 'react-redux';
import { objectToQueryHandler } from '../../../services/objectToQueryHandler';
import { checkLogin } from '../../../services/components/layouts/checkLogin';
import { usePlatform } from '../../../hooks/usePlatform';
import { setSBBs } from '../../../store/goOrderSB/action';
import { useOpenAccountUrl } from '../../../hooks/useOpenAccountUrl';

const LeadingBtn = ({ containerHeight, show } = { show: true }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [shadow, setShadow] = useState('0px -7px 6px -3px #C7C7C7');
    const type = useSelector(store => store.goOrder.type);
    const socalLoginData = useSelector(store => store.user.socalLogin);
    // const platform = useSelector(store => store.general.platform);
    const platform = usePlatform();
    const openAccountUrl = useOpenAccountUrl();
    const winSize = useWindowSize();

    useEffect(() => {
        // console.log('hhhhh====111', winSize.height, containerHeight + 110, containerHeight);
        if (winSize.height <= containerHeight + 110) {
            setShadow('0px -7px 6px -3px #C7C7C7');
        } else {
            // setShadow('none');
            setShadow('0px -7px 6px -3px #C7C7C7');
        }
    }, [winSize, containerHeight]);

    const bsHandler = (bs, type) => {
        if (checkLogin()) {
            if (type === 'S') {
                dispatch(setBs(bs));
                dispatch(setSBBs(bs));
                return;
            }
            if (type === 'H') {
                dispatch(setBs(bs));
                dispatch(setSBBs(bs));
                return;
            }
        }
        const query = router.query;
        const queryStr = objectToQueryHandler(query);
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            `redirectUrl=${router.pathname}`;
    };

    // const socalClickHandler = () => {
    //     switch (platform) {
    //         case 'udn':
    //             window.open('https://www.sinotrade.com.tw/openact?strProd=0102&strWeb=0135');
    //             // window.location =
    //             //     'https://www.sinotrade.com.tw/openact?strProd=0102&strWeb=0135&utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=login';
    //             break;

    //         default:
    //             window.open(
    //                 'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer????????????',
    //             );
    //             // window.location =
    //             //     'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer????????????';
    //             break;
    //     }
    // };

    const socalClickHandler = useCallback(() => {
        window.open(openAccountUrl);
        // switch (platform) {
        //     case 'udn':
        //         window.open('https://www.sinotrade.com.tw/openact?strProd=0102&strWeb=0135');
        //         // window.location =
        //         //     'https://www.sinotrade.com.tw/openact?strProd=0102&strWeb=0135&utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=login';
        //         break;

        //     default:
        //         window.open(
        //             'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer????????????',
        //         );
        //         // window.location =
        //         //     'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer????????????';
        //         break;
        // }
    }, [openAccountUrl]);

    return (
        <div className="container" style={{ display: show ? 'block' : 'none' }}>
            {socalLoginData._id == null && (
                <>
                    <button className="btn buy" onClick={bsHandler.bind(null, 'B', type)}>
                        ??????
                    </button>
                    <button className="btn sell" onClick={bsHandler.bind(null, 'S', type)}>
                        ??????
                    </button>
                </>
            )}
            {socalLoginData._id != null && (
                <>
                    <button className="btn buy" style={{ width: '100%' }} onClick={socalClickHandler}>
                        ????????????
                    </button>
                </>
            )}

            <style jsx>{`
                .container {
                    padding: 16px;
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background-color: white;
                    z-index: 999;
                    box-shadow: ${shadow};
                    -webkit-box-shadow: ${shadow};
                    -moz-box-shadow: ${shadow};
                    -o-box-shadow: ${shadow};
                }
                .btn {
                    padding: 0;
                    border: none;
                    font: inherit;
                    color: inherit;
                    background-color: transparent;
                    cursor: pointer;
                    width: calc(50% - 8px);
                    height: 60px;
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    border-radius: 2px;
                }
                .buy {
                    background-color: #f45a4c;
                    margin-right: 8px;
                }
                .sell {
                    background-color: #22a16f;
                    margin-left: 8px;
                }
            `}</style>
        </div>
    );
};
export default LeadingBtn;
