import { Carousel } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesDetail from './QuotesDetail';
import FiveLatestOffer from './FiveLatestOffer';
import { setLot } from '../../../../store/goOrder/action';

const QuoteContainer = () => {
    const [stopRenderNum, setStopRenderNum] = useState(1);
    const [quotesDetailShow, setQuotesDetailShow] = useState(true);
    const slider = useRef(null);
    const dispatch = useDispatch();
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const panelHeight = useSelector(store => store.goOrder.panelHeight);

    useEffect(() => {
        if (lot === 'Odd') {
            setStopRenderNum(0);
            if (slider.current != null) {
                slider.current.goTo(1);
            }
        } else {
            setStopRenderNum(1);
            if (slider.current != null) {
                slider.current.goTo(0);
            }
        }
    }, [lot]);

    useEffect(() => {
        if (bs === 'B' || bs === 'S') {
            setQuotesDetailShow(false);
        }
    }, [bs]);

    const quoteContainerStyleHandler = () => {
        console.log(panelHeight, 'hhh');
        if (panelHeight >= 100 && bs !== '') {
            return {
                transform: 'translateY(-60px)',
            };
        }
    };

    return (
        <div className="quote__container">
            <div className="quote__container--content" style={quoteContainerStyleHandler()}>
                <Carousel
                    afterChange={current => {
                        console.log('current', current);
                        if (current) {
                            setStopRenderNum(0);
                            dispatch(setLot('Odd'));
                        } else {
                            setStopRenderNum(1);
                            dispatch(setLot('Board'));
                        }
                    }}
                    ref={ref => {
                        slider.current = ref;
                    }}
                >
                    <div>
                        <QuotesDetail stopRender={stopRenderNum === 0 ? true : false} show={true} />
                        <FiveLatestOffer stopRender={stopRenderNum === 0 ? true : false} />
                    </div>
                    <div>
                        <QuotesDetail stopRender={stopRenderNum === 1 ? true : false} show={true} />
                        <FiveLatestOffer stopRender={stopRenderNum === 1 ? true : false} />
                    </div>
                </Carousel>
            </div>
            <style jsx>{`
                .quote__container {
                    overflow: hidden;
                    height: 230px;
                }
                .quote__container--content {
                    transition: all 0.3s;
                }
            `}</style>
            <style global jsx>{`
                .ant-carousel .slick-dots-bottom {
                    bottom: -27px;
                }
                .ant-carousel .slick-dots li button {
                    width: 5px;
                    height: 5px;
                    background: #000000;
                    border-radius: 50%;
                }
                .ant-carousel .slick-dots li.slick-active button {
                    background: #0d1623;
                    border-radius: 50%;
                }
                .ant-carousel .slick-dots li.slick-active {
                    width: 4px;
                }
                .ant-carousel .slick-dots li {
                    width: 4px;
                }
            `}</style>
        </div>
    );
};

export default QuoteContainer;
