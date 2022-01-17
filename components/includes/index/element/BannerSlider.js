import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { getAdSlot } from '../../../../services/components/bannerSlider/AdSlot';
import bg from '../../../../resources/images/pages/index/banner/banner.png';

const BannerSlider = () => {
    const [ads, setAds] = useState([]);

    const getAds = async () => {
        const data = await getAdSlot('0104');
        setAds(data.ads);
    };

    useEffect(async () => {
        getAds();
    }, []);

    return (
        <>
            <div className="banner-slider-container">
                <Carousel dots={{ className: 'dots' }}>
                    {ads.map((e, i) => (
                        <div key={i}>
                            <a href={e.url}>
                                <h3
                                    style={{
                                        backgroundImage: `url(https://webrd.sinotrade.com.tw/files/images/${e.desktopImagePath})`,
                                    }}
                                >
                                    2
                                </h3>
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>
            <style jsx global>{`
                .banner-slider-container {
                    width: 100%;
                    height: 500px;
                }

                .banner-slider-container h3 {
                    display: flex;
                    height: 500px;
                    color: #fff;
                    line-height: 100%;
                    text-align: center;
                    background-color: #fff;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    margin-bottom: 0;
                }

                .banner-slider-container .dots li {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin: 0 4px;
                }

                .banner-slider-container .dots li.slick-active {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin: 0 4px;
                }

                .banner-slider-container .dots li button {
                    background-color: #d7e0ef;
                    opacity: 1;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .banner-slider-container .dots li.slick-active button {
                    background-color: #c43826;
                }

                @media screen and (max-width: 450px) {
                    .banner-slider-container {
                        width: 100%;
                        height: 250px;
                    }

                    .banner-slider-container h3 {
                        height: 250px;
                    }
                }
            `}</style>
        </>
    );
};

export default BannerSlider;
