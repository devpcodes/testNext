import { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ChartContainer from './quotes/ChartContainer';
import Fundamentals from './quotes/Fundamentals';
import DKbar from './quotes/DKbar';
import { useWindowSize } from '../../../../hooks/useWindowSize';
const QuoteContainer = () => {
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const bs = useSelector(store => store.goOrderSB.bs);
    const chartHeight = useRef(0);
    const quoteContainerElement = useRef(null);
    const winSize = useWindowSize();

    const quoteContainerStyleHandler = () => {
        if (panelHeight >= 100 && bs !== '' && quoteContainerElement.current != null) {
            // setChartLineVisible(false);
            quoteContainerElement.current.scrollTop = 0;
            return {
                transform: `translateY(-${chartHeight.current}px)`, //-60
            };
        }
    };
    const getChartHeightHandler = useCallback(h => {
        chartHeight.current = h;
    });
    const bottomLineVisible = useCallback(() => {
        if (bs === '') {
            return true;
        }
        if (panelHeight >= 100) {
            return false;
        } else {
            return true;
        }
    }, [panelHeight, bs]);

    return (
        <div className="quote__container" ref={quoteContainerElement}>
            <div className="chart__info">
                <span className="text">報價時間／美東，幣別／美金</span>
                <span className="line"></span>
            </div>
            <div className="quote__container--content" style={quoteContainerStyleHandler()}>
                <ChartContainer getHeight={getChartHeightHandler} bottomLineVisible={bottomLineVisible()} />
                <Fundamentals />
                <DKbar
                    close={78.99}
                    open={98.99}
                    low={58.99}
                    high={103.83}
                    text={'當日價格區間'}
                    style={{ marginBottom: '18px' }}
                />
                <DKbar close={78.99} open={98.99} low={53.15} high={145.09} text={'52週區間'} />
            </div>
            <style jsx>{`
                .quote__container {
                    overflow-y: ${bs === '' || panelHeight == 80 ? 'auto' : 'hidden'};
                    overflow-x: hidden;
                    /* overflow: hidden; */
                    background-color: white;
                    height: ${panelHeight > 100 && bs !== '' ? 210 : winSize.height - 315}px;
                }
                .quote__container--content {
                    transition: all 0.3s;
                    transition-delay: 0.2s;
                }
                .chart__info {
                    display: flex;
                    padding-left: 16px;
                    padding-right: 16px;
                    background: white;
                }
                .line {
                    display: inline-block;
                    background-color: #0d1623;
                    width: 100%;
                    height: 1px;
                    justify-content: space-between;
                    margin-top: 7px;
                }
                .text {
                    justify-content: space-between;
                    white-space: nowrap;
                    margin-right: 8px;
                    color: #0d1623;
                    font-size: 1.2rem;
                }
            `}</style>
        </div>
    );
};

export default QuoteContainer;
