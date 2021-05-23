import { useEffect, useState, useRef } from 'react';
import currentIcon from '../../../../../resources/images/components/goOrder/sb/arrow-caret-down.svg';
const DKbar = ({ high, low, close, open }) => {
    const [positionLeft, setPositionLeft] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [closePosition, setClosePosition] = useState(0);
    const maxWidthElement = useRef(null);
    useEffect(() => {
        if (maxWidthElement.current) {
            console.log('w', maxWidthElement.current.offsetWidth);
            let tick = maxWidthElement.current.offsetWidth / (high - low);
            if (close - open >= 0) {
                let closePosition =
                    Number((tick * (close - low)).toFixed(2)) - Number((tick * (open - low)).toFixed(2));
                setPositionLeft(Number((tick * (open - low)).toFixed(2)));
                setBarWidth(closePosition);
                setClosePosition(Number((tick * (open - low)).toFixed(2)) + closePosition);
            } else {
                let closePosition =
                    Number((tick * (open - low)).toFixed(2)) - Number((tick * (close - low)).toFixed(2));
                setPositionLeft(Number((tick * (close - low)).toFixed(2)));
                setBarWidth(closePosition);
                setClosePosition(Number((tick * (close - low)).toFixed(2)));
            }
        }
    }, []);
    return (
        <>
            <div className="priceBetween__container">
                <div className="price__info">
                    <span className="price__info-item">{low}</span>
                    <span className="price__info-description">當日價格區間</span>
                    <span className="price__info-item">{high}</span>
                </div>
                <div className="price__bar" ref={maxWidthElement}>
                    <div className="box"></div>
                    <img className="closeIcon" src={currentIcon} />
                </div>
            </div>
            <style jsx>{`
                .priceBetween__container {
                    padding-left: 16px;
                    padding-right: 16px;
                }
                .price__info {
                    display: flex;
                    justify-content: space-between;
                }
                .price__info-description {
                    font-size: 1.6rem;
                    color: #6c7b94;
                }
                .price__info-item {
                    color: #0d1623;
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .price__bar {
                    margin-top: 5px;
                    height: 8px;
                    background-color: #e6ebf5;
                    position: relative;
                }
                .box {
                    position: absolute;
                    left: ${positionLeft}px;
                    width: ${barWidth <= 1 ? 1 : barWidth}px;
                    height: 8px;
                    background-color: #254a91;
                }
                .closeIcon {
                    position: absolute;
                    left: ${closePosition - 5}px;
                    top: 8px;
                }
            `}</style>
        </>
    );
};

export default DKbar;
