import { Carousel } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesDetail from './QuotesDetail';
import FiveLatestOffer from './FiveLatestOffer';
import { setLot } from '../../../../store/goOrder/action';

const QuoteContainer = () => {
    const [stopRenderNum, setStopRenderNum] = useState(1);
    const slider = useRef(null);
    const dispatch = useDispatch();
    const lot = useSelector(store => store.goOrder.lot);

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

    return (
        <>
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
                    <QuotesDetail stopRender={stopRenderNum === 0 ? true : false} />
                    <FiveLatestOffer stopRender={stopRenderNum === 0 ? true : false} />
                </div>
                <div>
                    <QuotesDetail stopRender={stopRenderNum === 1 ? true : false} />
                    <FiveLatestOffer stopRender={stopRenderNum === 1 ? true : false} />
                </div>
            </Carousel>
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
        </>
    );
};

export default QuoteContainer;
