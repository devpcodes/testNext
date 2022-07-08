import { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import CardSliderItem from './cardSliderItem';
const CardSlider = ({ rowData, itemNum = 3 }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let d = dataReplace();
        setData(d);
    }, [rowData]);

    const dataReplace = () => {
        let arr = [];
        let arr_ = [];
        let total = rowData.length;
        rowData.map((x, i) => {
            x.side = 'A';
            x.key = i;
            if (i % itemNum == 0) {
                arr_ = [];
                arr_.push(x);
                arr.push(arr_);
            } else if (i == total) {
                arr_.push(x);
                arr.push(arr_);
            } else {
                arr_.push(x);
            }
        });
        return arr;
    };

    const onCarouselChange = currentSlide => {
        console.log(currentSlide);
    };

    return (
        <div id="cardSlider__container">
            <Carousel arrows dots={false} afterChange={onCarouselChange}>
                {data.map(x => {
                    return (
                        <div>
                            <div className="slideContent">
                                {x.map((stockData, index) => {
                                    return <CardSliderItem rowData={stockData} />;
                                })}
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            <style jsx global>{`
                #cardSlider__container .slick-slide .slideContent {
                    display: flex;
                    justify-content: space-between;
                }
                #cardSlider__container .slick-slide .slideContent .slideCard {
                    width: 32%;
                }
            `}</style>
        </div>
    );
};

export default CardSlider;
