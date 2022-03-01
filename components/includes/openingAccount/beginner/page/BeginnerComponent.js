import { useState, useEffect, useRef } from 'react';
import { Layout, Affix, Steps, Space } from 'antd';
import CustomerButton from '../../../customerSupport/CustomerButton';
import { RightOutlined } from '@ant-design/icons';
import ElectronicTrading from '../element/ElectronicTrading.js';
import NewsArticles from '../element/NewsArticles.js';

import bg from '../../../../../resources/images/pages/customer_support/bg_img.svg';
import pic1 from '../../../../../resources/images/pages/beginner/img-card.svg';
import pic2 from '../../../../../resources/images/pages/beginner/img-card-2.svg';
import icon1 from '../../../../../resources/images/pages/beginner/icon1.png';
import icon2 from '../../../../../resources/images/pages/beginner/icon2.png';
import icon3 from '../../../../../resources/images/pages/beginner/icon3.png';
import img1 from '../../../../../resources/images/pages/beginner/img1.png';

function BeginnerComponent(props) {
    const { Header, Content } = Layout;
    const { Step } = Steps;

    const [scrolled, setScrolled] = useState(false);

    const steps = [
        {
            title: '1',
            description: '線上開戶',
        },
        {
            title: '2',
            description: '啟用帳戶',
        },
        {
            title: '3',
            description: '選擇交易平台',
        },
        {
            title: '4',
            description: '開始交易',
        },
    ];

    const [platform] = useState([
        {
            title: '大戶投APP',
            version: '手機版',
            des: '平台說明平台說明平台說明平台說明平台說明平台說明平台說明',
            btnName: '下載App',
            image: icon1,
            link: 'https://www.sinotrade.com.tw/richclub/dawhotou/campaign/app',
        },
        {
            title: '理財網',
            version: '網頁版',
            des: '平台說明平台說明平台說明平台說明平台說明平台說明平台說明',
            btnName: '立即前往',
            image: icon2,
            link: `${process.env.NEXT_PUBLIC_SUBPATH}`,
        },
        {
            title: '好神通PLUS',
            version: '電腦版',
            des: '平台說明平台說明平台說明平台說明平台說明平台說明平台說明',
            btnName: '下載安裝',
            image: icon3,
            link: 'https://www.sinotrade.com.tw/Tradecenter/Tradecenter_2_2',
        },
    ]);

    const [articles] = useState([
        {
            type: '台股',
            value: [
                {
                    text: '台股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text:
                        '台股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...台股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text: '台股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
            ],
        },
        {
            type: '美股',
            value: [
                {
                    text:
                        '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
            ],
        },
        {
            type: '存股',
            value: [
                {
                    text: '存股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text: '存股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
                {
                    text: '存股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                    news: '寰球經濟',
                    date: '2021.10.31',
                    image: img1,
                    link: '/',
                },
            ],
        },
    ]);

    const stepIds = useRef([]),
        stepsBar = useRef();
    const [current, setCurrent] = useState(0);
    const [stepAry, setStepAry] = useState([]);
    const [menuHeight, setMenuHeight] = useState(70);

    const init = () => {
        if (stepIds.current.length > 0 && typeof stepIds.current[0] != 'null') {
            return stepIds.current;
        }
    };

    const prepare = () => {
        const qq = init();
        setMenuHeight(document.querySelector('.header__navbar').offsetHeight);
        let contentArray = [];
        for (let i = 0; i < steps.length; i++) {
            let tmp = qq[i],
                tmpOffsetTop = tmp.offsetTop,
                tmpHeight = tmp.offsetTop + tmp.offsetHeight;

            contentArray.push({
                current: i,
                top: tmpOffsetTop,
                bottom: tmpHeight,
            });
        }
        // console.log('contentArray ==>', contentArray);
        setStepAry(contentArray);
    };

    const update = () => {
        if (stepsBar.current && typeof stepsBar.current != 'null') {
            const barH = stepsBar.current.offsetHeight + menuHeight;
            if (stepAry.length > 0) {
                let scrollTop = document.documentElement.scrollTop;
                if (scrollTop >= stepAry[0].top) {
                    scrollTop += barH;
                    for (let i = 0; i < stepAry.length; i++) {
                        let content = stepAry[i];
                        if (scrollTop >= content.top && scrollTop < content.bottom) {
                            // console.log('current -->', current);
                            setCurrent(content.current);
                            break;
                        }
                    }
                } else {
                    setCurrent(0);
                }
            }
        }
    };

    const onChange = current => {
        const hh = stepAry[current].top;
        setCurrent(current);
        const barH = stepsBar.current.offsetHeight + menuHeight;
        document.documentElement.scrollTo(0, hh - barH);
    };

    useEffect(() => {
        prepare();
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', update);
    }, [stepAry.length]);

    return (
        <Layout>
            <Header className="beginner-header">
                <h1>新手上路</h1>
                <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} />
            </Header>
            <div className="space"></div>
            <Affix offsetTop={70} onChange={affixed => setScrolled(affixed)}>
                <div ref={stepsBar} className={['beginner-steps-bar-box', scrolled && 'scroll'].join(' ')}>
                    <Steps
                        responsive="false"
                        className="beginner-steps-bar"
                        current={current}
                        progressDot
                        onChange={onChange}
                    >
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} description={item.description} />
                        ))}
                    </Steps>
                </div>
            </Affix>
            <Content className="layoutContent">
                <ul>
                    <li ref={el => (stepIds.current[0] = el)}>
                        <div className="content">
                            <div className="stepTitle">
                                <h2>
                                    <span>STEP.1</span>
                                    <span>線上開證券戶</span>
                                </h2>
                                <h3>
                                    開戶超便捷，免出門，備妥雙證件及銀行帳號，快速完成證券與複委託帳戶，立即交易台股與美股。
                                </h3>
                                <Space size={[{ xs: 16, sm: 16, md: 24, lg: 24 }]} className="open-account-header-btn">
                                    <CustomerButton
                                        type="primary"
                                        onClick={() =>
                                            window.open('https://www.sinotrade.com.tw/openact?strProd=0002&strWeb=0001')
                                        }
                                    >
                                        開證券帳戶
                                    </CustomerButton>
                                    <CustomerButton
                                        onClick={() =>
                                            window.open(
                                                'https://www.sinotrade.com.tw/openact/progress?strProd=0002&strWeb=0001',
                                            )
                                        }
                                    >
                                        進度查詢
                                    </CustomerButton>
                                </Space>
                                <a
                                    className="open-account"
                                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/Service_Positions/`}
                                >
                                    查詢營業據點去臨櫃開戶 <RightOutlined />
                                </a>
                            </div>
                            <figure style={{ backgroundImage: `url(${pic1})` }}></figure>
                        </div>
                    </li>
                    <li ref={el => (stepIds.current[1] = el)}>
                        <div className="content">
                            <div className="stepTitle">
                                <h2>
                                    <span>STEP.2</span>
                                    <span>啟用帳戶</span>
                                </h2>
                                <h3>
                                    帳戶成功審核後會先收到集保e存摺，同時也會收到永豐金證券啟用帳戶通知，電子對帳單也同時開啟。
                                </h3>
                                <Space className="open-account-header-btn">
                                    <CustomerButton
                                        type="primary"
                                        onClick={() =>
                                            window.open(
                                                'https://www.sinotrade.com.tw/openact/progress?strProd=0002&strWeb=0001',
                                            )
                                        }
                                    >
                                        啟用帳戶
                                    </CustomerButton>
                                </Space>
                            </div>
                            <figure style={{ backgroundImage: `url(${pic2})` }}></figure>
                        </div>
                    </li>
                    <li ref={el => (stepIds.current[2] = el)}>
                        <div className="content">
                            <div className="stepTitle">
                                <h2>
                                    <span>STEP.3</span>
                                    <span>選擇電子交易平台</span>
                                </h2>
                                <h3>
                                    永豐金證券數位服務，透過最佳體驗的產品設計與最專業的內容經營，在不同階段的理財旅程，提供投資者更聰明便捷的體驗。
                                </h3>
                            </div>
                            <ElectronicTrading linkData={platform} />
                        </div>
                    </li>
                    <li ref={el => (stepIds.current[3] = el)}>
                        <div className="content">
                            <div className="stepTitle">
                                <h2>
                                    <span>STEP.4</span>
                                    <span>如何開始第一筆交易</span>
                                </h2>
                            </div>
                            <NewsArticles linkData={articles} />
                        </div>
                    </li>
                </ul>
            </Content>
            <style jsx>
                {`
                    .beginner-header {
                        position: relative;
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        height: 160px;
                        background-color: #3f5372;
                    }

                    .beginner-header h1 {
                        z-index: 1;
                        text-align: center;
                        font-size: 28px;
                        font-weight: 700;
                        color: white;
                        line-height: normal;
                        letter-spacing: 0.7px;
                    }

                    .backgroundImage {
                        position: absolute;
                        right: 0;
                        width: 293px;
                        height: 160px;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: right -1px top;
                    }

                    .space {
                        width: 100%;
                        padding-top: 16px;
                        background-color: #f9fbff;
                    }

                    .beginner-steps-bar-box {
                        width: 100%;
                        height: auto;
                        padding: 24px 0 23px;
                        background-color: #f9fbff;
                    }

                    .beginner-steps-bar-box.scroll {
                        background-color: #fff;
                        border-bottom: solid 1px #d7e0ef;
                    }

                    .layoutContent {
                        width: 100%;
                        background-color: #f9fbff;
                    }

                    .content {
                        width: 944px;
                        margin: 0 auto;
                        padding: 40px 0;
                    }

                    .layoutContent ul {
                        padding: 0;
                        margin: 0;
                    }

                    .layoutContent ul li {
                        display: block;
                    }

                    .layoutContent ul li .content {
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                    }

                    .layoutContent ul li .content figure {
                        width: 100%;
                        height: 240px;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: contain;
                        margin: 0;
                    }

                    .layoutContent ul li:nth-of-type(2) {
                        background-color: #fff;
                    }

                    .layoutContent ul li:nth-of-type(2) .content {
                        flex-direction: row-reverse;
                    }

                    .layoutContent ul li:nth-of-type(1) .stepTitle,
                    .layoutContent ul li:nth-of-type(2) .stepTitle {
                        padding-top: 16px;
                    }

                    .layoutContent ul li:nth-of-type(3) .content,
                    .layoutContent ul li:nth-of-type(4) .content {
                        flex-direction: column;
                    }

                    .layoutContent ul li:nth-of-type(4) .content {
                        padding-top: 0px;
                    }

                    .stepTitle h2 {
                        padding-left: 16px;
                        border-left: 4px solid #daa360;
                        font-size: 24px;
                        line-height: 2.7rem;
                        font-weight: 700;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        letter-spacing: 0.6px;
                        margin-bottom: 15px;
                    }

                    .stepTitle h2 span:nth-of-type(1) {
                        font-size: 16px;
                        font-weight: 600;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #daa360;
                        margin-bottom: 4px;
                    }

                    .stepTitle h3 {
                        width: 28.5vw;
                        height: auto;
                        margin: 15px 0 24px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.63;
                        letter-spacing: 0.4px;
                        color: #0d1623;
                    }

                    .layoutContent ul li:nth-of-type(3) .stepTitle h3 {
                        width: 100%;
                        height: auto;
                    }

                    .open-account {
                        height: 22px;
                        margin: 0;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    .layoutContent ul li:nth-of-type(1) .open-account {
                        width: 201px;
                    }

                    @media screen and (max-width: 768px) {
                      .backgroundImage {
                          right: 0;
                          width: 175px;
                          height: 160px;
                          background-size: 171%;
                          background-position: left top;
                      }

                      .beginner-steps-bar {
                          width: 100%;
                          margin: 0;
                          padding: 0 142px;
                      }

                      .space {
                          padding-top: 0px;
                      }

                      .content {
                          width: 100%;
                          margin: 0;
                          padding: 32px;
                      }

                      .layoutContent ul li .content figure {
                          width: 100%;
                          height: 181px;
                      }

                      .layoutContent ul li:nth-of-type(1) .content {
                          padding-top: 0;
                      }

                      .layoutContent ul li:nth-of-type(1) .stepTitle,
                      .layoutContent ul li:nth-of-type(2) .stepTitle {
                          padding-top: 0px;
                      }

                      .stepTitle h2 {
                          padding-left: 12px;
                          border-left: 5px solid #daa360;
                          font-size: 20px;
                          line-height: normal;
                          font-weight: 600;
                          letter-spacing: 0.5px
                          margin-bottom: 12px;
                      }

                      .stepTitle h3 {
                          width: 44.792vw;
                          margin: 12px 0 16px;
                      }
                    }

                    @media screen and (max-width: 450px) {
                      .beginner-header {
                          height: 100px;
                      }
      
                      .beginner-header h1 {
                          font-size: 20px;
                          letter-spacing: 0.5px;
                      }

                      .backgroundImage {
                          right: 0;
                          width: 0;
                      }

                      .beginner-steps-bar {
                          width: 100%;
                          margin: 0;
                          padding: 0 21px;
                      }

                      .beginner-steps-bar-box {
                          padding: 24px 0;
                      }

                      .content {
                          padding: 24px 16px;
                      }

                      .layoutContent ul {
                          padding: 0;
                          margin: 0;
                          padding-bottom: 24px;
                      }

                      .layoutContent ul li .content {
                          flex-direction: column !important;
                          justify-content: center;
                          align-items: flex-start;
                      }

                      .layoutContent ul li:nth-of-type(1) .content,
                      .layoutContent ul li:nth-of-type(2) .content {
                        flex-direction: column-reverse !important;
                      }

                      .layoutContent ul li .content figure {
                          height: 180px;
                          margin-bottom: 16px;
                      }

                      .stepTitle {
                          width: 100%;
                      }

                      .stepTitle h2 {
                          padding-left: 12px;
                          border-left: 5px solid #daa360;
                          font-size: 20px;
                          line-height: normal;
                          margin-bottom: 12px;
                      }

                      .stepTitle h2 span:nth-of-type(1) {
                          font-size: 14px;
                          letter-spacing: 0.35px;
                          margin-bottom: px;
                      }

                      .stepTitle h3 {
                          width: 100%;
                          margin: 12px 0 16px;
                      }

                      .open-account {
                        float: right;
                      }
                    }
                `}
            </style>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');

                html {
                    scroll-behavior: smooth;
                }

                .beginner-steps-bar {
                    width: 500px;
                    margin: 0 auto;
                }

                .beginner-steps-bar.ant-steps-dot .ant-steps-item-process .ant-steps-item-icon {
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                }

                .beginner-steps-bar .ant-steps-item-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .beginner-steps-bar.ant-steps-dot .ant-steps-item-tail {
                    top: 22px;
                }

                .beginner-steps-bar.ant-steps-dot .ant-steps-item-tail::after {
                    background-color: transparent;
                    height: 0px;
                    border: solid 2px #d7e0ef;
                    margin-left: 5px;
                }

                .beginner-steps-bar .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {
                    background-color: transparent;
                }

                .beginner-steps-bar.ant-steps-dot .ant-steps-item:first-child .ant-steps-icon-dot {
                    left: 0px;
                }

                .beginner-steps-bar.ant-steps-dot .ant-steps-item-icon {
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    margin: 0;
                }

                .beginner-steps-bar .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
                    border-color: #daa360;
                    background: #daa360;
                }

                .beginner-steps-bar .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot,
                .beginner-steps-bar .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
                    border-color: #d7e0ef;
                    background-color: #d7e0ef;
                }

                .beginner-steps-bar.ant-steps-label-vertical .ant-steps-item-content {
                    height: 22px;
                }

                .beginner-steps-bar .ant-steps-item-title {
                    font-family: 'Barlow', sans-serif;
                    font-size: 20px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.5px;
                    text-align: center;
                    color: #0d1623;
                    top: -46px;
                }

                .beginner-steps-bar .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                    color: #0d1623;
                }
                
                .beginner-steps-bar .ant-steps-item-container[role='button']:hover .ant-steps-item-title,
                .beginner-steps-bar .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-title,.beginner-steps-bar.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-title {
                  color: #fff;
                }

                /* 滑過節點時的效果 */
                .beginner-steps-bar .ant-steps-item-container[role='button']:hover .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot,
                .beginner-steps-bar .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot,.beginner-steps-bar.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
                    border-color: #daa360;
                    background: #daa360;
                }

                .beginner-steps-bar .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                    color: #fff !important;
                }

                .beginner-steps-bar .ant-steps-item-description {
                    position: relative;
                    top: -24px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #0d1623;
                }

                .beginner-steps-bar .ant-steps-item-container[role='button']:hover .ant-steps-item-description,
                .beginner-steps-bar .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-description, .beginner-steps-bar.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-description {
                    color: #000 ;
                }

                .beginner-steps-bar .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
                    color: #daa360;
                }

                /* 滑過節點時的效果 */
                .beginner-steps-bar .ant-steps-item-container[role='button']:hover .ant-steps-item-description,
                .beginner-steps-bar .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-description,.beginner-steps-bar.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role="button"]:hover .ant-steps-item-description {
                    color: #daa360;
                }

                .ant-steps-item-finish
                    > .ant-steps-item-container
                    > .ant-steps-item-content
                    > .ant-steps-item-description,
                .ant-steps-item-wait
                    > .ant-steps-item-container
                    > .ant-steps-item-content
                    > .ant-steps-item-description {
                    color: #0d1623;
                }

                .ant-steps-item-process
                    > .ant-steps-item-container
                    > .ant-steps-item-content
                    > .ant-steps-item-description {
                    color: #daa360;
                }

                .layoutContent ul li:nth-of-type(1) .open-account-header-btn {
                  width: 408px;
                }

                .open-account-header-btn {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .open-account-header-btn .customer-button {
                    width: 192px;
                    border-radius: 0.125vw;
                }

                .open-account-header-btn > div {
                    line-height: 1;
                }

                @media screen and (max-width: 768px) {
                  .layoutContent ul li:nth-of-type(1) .open-account-header-btn {
                    width: 344px;
                  }

                  .open-account-header-btn .customer-button {
                      width: 164px;
                      border-radius: 0.260vw;
                  }

                  .open-account-header-btn > div {
                      line-height: normal;
                  }
                }

                @media screen and (max-width: 450px) {

                  .beginner-steps-bar{
                    width: 333px;
                  }

                  .beginner-steps-bar.ant-steps-dot .ant-steps-item-process .ant-steps-item-icon {
                      width: 36px;
                      height: 36px;
                      line-height: 36px;
                  }

                  .beginner-steps-bar.ant-steps-dot .ant-steps-item-tail {
                      top: 15px;
                      margin-left: 50px;
                  }

                  .beginner-steps-bar.ant-steps-dot .ant-steps-item-icon {
                      width: 36px;
                      height: 36px;
                      line-height: 36px;
                      margin: 0;
                  }

                  .beginner-steps-bar .ant-steps-item-container {
                    width: fit-content;
                  }

                  .beginner-steps-bar.ant-steps-label-vertical .ant-steps-item-content {
                      width: 19.680vw;
                      height: 17px;
                  }

                  .beginner-steps-bar .ant-steps-item-title {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    top: -36px;
                  }

                  .beginner-steps-bar .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
                    color: #daa360; !important;
                  }

                  .beginner-steps-bar .ant-steps-item-description {
                    top: -17px;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.3px
                  }

                  .open-account-header-btn .customer-button {
                    border-radius:0.533vw;
                  }

                  .layoutContent ul li:nth-of-type(1) .open-account-header-btn {
                    width: 91.467vw;
                  }

                  .layoutContent ul li:nth-of-type(2) .open-account-header-btn {
                    margin-bottom: 0px;
                  }

                  .layoutContent ul li:nth-of-type(1) .open-account-header-btn .customer-button {
                    width: 43.467vw;
                  }

                  .layoutContent ul li:nth-of-type(2) .open-account-header-btn .customer-button {
                    width: 91.467vw;
                  }
                }
            `}</style>
        </Layout>
    );
}

export default BeginnerComponent;
