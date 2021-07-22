import dynamic from 'next/dynamic';
import { Carousel } from 'antd';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesDetail from './QuotesDetail';
import FiveLatestOffer from './FiveLatestOffer';
import { setCheckLot, setLot } from '../../../../store/goOrder/action';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const Chart = dynamic(() => import('../chart/chart'), { ssr: false });
const QuoteContainer = () => {
    const [stopRenderNum, setStopRenderNum] = useState(1);
    const [quotesDetailShow, setQuotesDetailShow] = useState(true);

    const slider = useRef(null);
    const dispatch = useDispatch();
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const code = useSelector(store => store.goOrder.code);
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const checkCA = useSelector(store => store.goOrder.checkCA);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const checkLot = useSelector(store => store.goOrder.checkLot);
    const solaceData = useSelector(store => store.solace.solaceData);

    const winSize = useWindowSize();
    const quoteContainerElement = useRef(null);
    const currentCode = useRef(null);
    const isLogin = useSelector(store => store.user.isLogin);

    useEffect(() => {
        if (currentCode.current != code) {
            setTimeout(() => {
                if (slider.current != null) {
                    setStopRenderNum(1);
                    slider.current.goTo(0);
                    currentCode.current = code;
                }
            }, 500);
            return;
        }
    }, [code]);

    useEffect(() => {
        if (lot === 'Odd' && checkLot) {
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
    }, [lot, checkLot, solaceData]);

    useEffect(() => {
        if (bs === 'B' || bs === 'S') {
            setQuotesDetailShow(false);
        }
    }, [bs]);

    useEffect(() => {
        if (productInfo != null) {
            if (productInfo.TIB != null) {
                if (productInfo.TIB.indexOf('創新') >= 0 || productInfo.TIB.indexOf('戰略') >= 0) {
                    dispatch(setCheckLot(false));
                    return;
                }
            }
            if (
                productInfo.solaceMarket != null &&
                (productInfo.solaceMarket == '興櫃' || productInfo.solaceMarket == '權證')
            ) {
                dispatch(setCheckLot(false));
            } else {
                dispatch(setCheckLot(true));
            }
        }
    }, [productInfo]);

    const chartChildren = useMemo(() => {
        if (bs === '') {
            return <Chart />;
        }
        if (panelHeight < 100) {
            return <Chart />;
        } else {
            return <div style={{ height: '230px' }}></div>;
        }
    }, [panelHeight, bs]);

    const quoteContainer = useMemo(() => {
        return (
            <Carousel
                afterChange={current => {
                    if (current) {
                        // console.log('current', current);
                        setStopRenderNum(0);
                        dispatch(setLot('Odd'));
                    } else {
                        // console.log('current', current);
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
                    <FiveLatestOffer code={code} stopRender={stopRenderNum === 0 ? true : false} />
                </div>
                {checkLot && (
                    <div>
                        <QuotesDetail stopRender={stopRenderNum === 1 ? true : false} show={true} />
                        <FiveLatestOffer code={code} stopRender={stopRenderNum === 1 ? true : false} />
                    </div>
                )}
            </Carousel>
        );
    }, [stopRenderNum, checkLot]);

    const quoteContainerStyleHandler = () => {
        if (panelHeight >= 100 && bs !== '' && quoteContainerElement.current != null) {
            quoteContainerElement.current.scrollTop = 0;
            return {
                transform: 'translateY(-290px)', //-60
            };
        }
    };

    const otherHeightHandler = () => {
        if (isLogin && checkCA) {
            return 274;
        } else {
            return 314;
        }
    };
    return (
        <div className="quote__container" ref={quoteContainerElement}>
            <div className="quote__container--content" style={quoteContainerStyleHandler()}>
                {/* <div style={{display: panelHeight >= 100 && bs !== '' ? 'none' : 'block'}}> */}
                {/* <Chart /> */}
                {chartChildren}
                {quoteContainer}
                {/* <Carousel
                    afterChange={current => {
                        if (current) {
                            console.log('current', current);
                            setStopRenderNum(0);
                            dispatch(setLot('Odd'));
                        } else {
                            console.log('current', current);
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
                    {checkLot && (
                        <div>
                            <QuotesDetail stopRender={stopRenderNum === 1 ? true : false} show={true} />
                            <FiveLatestOffer stopRender={stopRenderNum === 1 ? true : false} />
                        </div>
                    )}
                </Carousel> */}
            </div>
            <style jsx>{`
                .quote__container {
                    overflow: ${bs === '' || panelHeight == 80 ? 'auto' : 'hidden'};
                    height: ${panelHeight > 100 && bs !== '' ? 180 : winSize.height - otherHeightHandler()}px;
                }
                .quote__container--content {
                    transition: all 0.3s;
                    transition-delay: 0.2s;
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
