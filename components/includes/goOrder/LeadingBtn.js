import { useState, useEffect } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';

const LeadingBtn = ({ containerHeight }) => {
    const [shadow, setShadow] = useState('0px -7px 6px -3px #C7C7C7');
    const winSize = useWindowSize();
    useEffect(() => {
        console.log(winSize.height, containerHeight + 110);
        if (winSize.height < containerHeight + 110) {
            setShadow('0px -7px 6px -3px #C7C7C7');
        } else {
            setShadow('none');
        }
    }, [winSize, containerHeight]);
    return (
        <div className="container">
            <button className="btn buy">買進</button>
            <button className="btn sell">賣出</button>
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
