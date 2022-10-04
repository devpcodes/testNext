import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'antd';
import { getAdSlot } from '../../../../services/components/bannerSlider/AdSlot';
import AnnouncementMarquee from '../element/AnnouncementMarquee';
// import { array } from 'prop-types';
import { useRouter } from 'next/router';
import { setModal } from '../../../../store/components/layouts/action';

const BannerSlider = () => {
    const clientWidth = useSelector(store => store.layout.winWidth);
    const [ads, setAds] = useState([]);
    const [banner, setBanner] = useState(true);
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
    const showMask = useSelector(store => store.layout.showMask);
    const dispatch = useDispatch();
    const router = useRouter();
    const getAds = async () => {
        const data = await getAdSlot('0104');
        setAds(data.ads);
        // console.log('data',data)
    };

    const onCloseAnnouncement = () => {
        setIsAnnouncementOpen(false);
    };

    useEffect(() => {
        getAds();
    }, []);

    useEffect(() => {
        if (showMask) {
            setBanner(false);
        } else {
            setTimeout(() => {
                setBanner(true);
            }, 1000);
        }
    }, [showMask]);

    const blankConfirm = data => {
        console.log('data', data);
        if (data.isExternalLink) {
            dispatch(
                setModal({
                    visible: true,
                    content: <div>提醒您，您即將離開永豐金證券理財網，前往其他機構提供之網站!</div>,
                    type: 'confirm',
                    title: '提醒',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    bodyStyle: { paddingTop: 20, paddingBottom: 20, borderTop: '1px solid #EEE' },
                    okButtonProps: {
                        style: {
                            width: '100px',
                            backgroundColor: '#C43826',
                        },
                    },
                    okText: '確定前往',
                    onOk: () => {
                        window.open(data.url);
                    },
                    onCancel: () => {
                        dispatch(setModal({ visible: false }));
                    },
                    class: 'adblank_confirm',
                    maskClosable: false,
                }),
            );
        } else {
            window.location.href = data.url;
        }
    };

    return (
        <>
            <div className="banner-slider-container">
                <AnnouncementMarquee isOpen={isAnnouncementOpen} onCloseAnnouncement={onCloseAnnouncement} />
                <Carousel dots={{ className: 'dots' }} autoplay>
                    {Array.isArray(ads) &&
                        ads.map((e, i) => (
                            <div key={i}>
                                <a
                                    onClick={blankConfirm.bind(null, e)}
                                    rel="noreferrer noopener"
                                    target={e.isBlank ? '_blank' : '_self'}
                                >
                                    {/* <h3
                                        style={
                                            clientWidth > 450
                                                ? {
                                                      backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${e.desktopImagePath})`,
                                                  }
                                                : {
                                                      backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${e.mobileImagePath})`,
                                                  }
                                        }
                                    ></h3> */}
                                    {clientWidth > 450 ? (
                                        <img
                                            width="100%"
                                            height="auto"
                                            src={`${process.env.NEXT_PUBLIC_FILE}/images/${e.desktopImagePath}`}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            width="100%"
                                            height="auto"
                                            src={`${process.env.NEXT_PUBLIC_FILE}/images/${e.mobileImagePath}`}
                                            alt=""
                                        />
                                    )}
                                </a>
                            </div>
                        ))}
                </Carousel>
            </div>
            <style jsx global>{`
                .banner-slider-container {
                    width: 100%;
                    // height: 500px;
                    height: auto;
                    position: relative;
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

                .banner-slider-container img {
                    display: flex;
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
                        // height: 250px;
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
