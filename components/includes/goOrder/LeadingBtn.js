import { useState, useEffect } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { setBs } from '../../../store/goOrder/action';
import { useDispatch } from 'react-redux';

const LeadingBtn = ({ containerHeight, show } = { show: true }) => {
    const dispatch = useDispatch();
    const [shadow, setShadow] = useState('0px -7px 6px -3px #C7C7C7');
    const winSize = useWindowSize();

    useEffect(() => {
        // console.log('hhhhh====111', winSize.height, containerHeight + 110, containerHeight);
        if (winSize.height <= containerHeight + 110) {
            setShadow('0px -7px 6px -3px #C7C7C7');
        } else {
            setShadow('none');
        }
    }, [winSize, containerHeight]);

    const bsHandler = type => {
        dispatch(setBs(type));
    };
    return (
        <div className="container" style={{ display: show ? 'block' : 'none' }}>
            <button className="btn buy" onClick={bsHandler.bind(null, 'B')}>
                買進
            </button>
            <button className="btn sell" onClick={bsHandler.bind(null, 'S')}>
                賣出
            </button>
            <style jsx>{`
                .container {
                    padding: 16px;
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background-color: white;
                    z-index: 10000;
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
