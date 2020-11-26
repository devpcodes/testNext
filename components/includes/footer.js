import React from 'react';
import qrCode from '../../resources/images/components/footer/img_ileaderapp.png';
import logo from '../../resources/images/logo/logo.svg';
import fb from '../../resources/images/components/footer/btn_fb.png';
import youtube from '../../resources/images/components/footer/btn_youtube.png';
import line from '../../resources/images/components/footer/btn_line.png';
import theme from '../../resources/styles/theme';
const footerData = [
    {
        title: '關於永豐金證券',
        children: [
            {
                title: '關於永豐金',
                link: 'https://securities.sinopac.com/',
            },
            {
                title: '投資人訊息',
                link: 'https://securities.sinopac.com/currentOperation/20170706160641375000000000000202.html',
            },
            {
                title: '金融友善服務準則',
                link: 'https://www.sinotrade.com.tw/ec/Friendly-service/creterion.html',
            },
            {
                title: '服務據點',
                link: 'https://www.sinotrade.com.tw/newweb/Service_Positions',
            },
            {
                title: '人力招募',
                link: 'http://www.sinopac.com/footer/20170522162509790000000000000025.html',
            },
        ],
    },
    {
        title: '數位服務',
        children: [
            {
                title: '新理財網下單',
                link: '',
            },
            {
                title: 'iLeader App下單',
                link: 'https://www.sinotrade.com.tw/Tradecenter/Tradecenter_4',
            },
            {
                title: 'eLeader AP下單',
                link: 'https://www.sinotrade.com.tw/UploadFiles/setup_eLeader.exe',
            },
            {
                title: '好神通 AP下單',
                link: 'https://www.sinotrade.com.tw/UploadFiles/sinosetup.exe',
            },
            {
                title: '豐管家服務App',
                link: 'https://play.google.com/store/apps/details?id=com.softmobile.service.app&amp;hl=zh_TW',
            },
        ],
    },
    {
        title: '企業團網站',
        children: [
            {
                title: '永豐金控',
                link: 'http://www.sinopac.com/',
            },
            {
                title: '永豐金證券(亞洲)',
                link: 'http://www.sinopacasia.com/',
            },
            {
                title: '永豐期貨',
                link: 'http://www.spf.com.tw/',
            },
            {
                title: '永豐投信',
                link: 'http://sitc.sinopac.com/',
            },
            {
                title: '永豐MMA交易網',
                link: 'https://mma.sinopac.com/MemberPortal/Member/NextWebLogin.aspx',
            },
            {
                title: '永豐信用卡服務網',
                link: 'https://card.sinopac.com/',
            },
        ],
    },
];

const Footer = React.memo(props => {
    const telHandler = () => {
        window.location.href = 'tel:+886-2-66308899';
    };
    return (
        <div className="footer">
            <div className="footer__up">
                <ul>
                    <li>
                        <span>客服專線</span> 0800-038-123
                    </li>
                    <li> 02-6630-8899</li>
                    <li>
                        <span>台股營業日</span> (AM8:00~PM9:00)
                    </li>
                </ul>
                <a
                    href="https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕"
                    target="_blank"
                    className="footer__up--signup"
                >
                    快速開戶
                </a>
            </div>
            <div className="mobile__box2">
                <p onClick={telHandler} className="box2__title">
                    撥打客服專線
                </p>
                <p className="box2__val">
                    <span>服務時間</span>(AM8:00~PM9:00)
                </p>
            </div>
            <div className="mobile__box3">
                <p>永豐金證券股份有限公司</p>
                <p>台北市重慶南路一段二號7、18、20樓</p>
                <p>107年金管證總字第0006號</p>
                <p>109年金管期總字第008號(委任期貨商永豐期貨)</p>
            </div>
            <div className="footer__middle">
                <div className="middle__box">
                    {footerData.map((item, index) => (
                        <div className="middle--card" key={index}>
                            <h3>{item.title}</h3>
                            {item.children != null
                                ? item.children.map((link, index2) => (
                                      <p key={index2}>
                                          <a target="_blank" href={link.link}>
                                              {link.title}
                                          </a>
                                      </p>
                                  ))
                                : null}
                        </div>
                    ))}
                    <div className="middle--card">
                        <h3>iLeader App下載</h3>
                        <div className="card--QR">iOS / Android App</div>
                    </div>
                </div>
            </div>
            <div className="footer__down">
                <div className="down__box">
                    <ul className="block1">
                        <li>永豐金證券股份有限公司</li>
                        <li>台北市重慶南路一段二號7、18、20樓</li>
                        <li>107年金管證總字第0006號</li>
                        <li>109年金管期總字第008號(委任期貨商永豐期貨)</li>
                    </ul>
                    <ul>
                        <li>
                            <a href="https://www.taiwanresearch.com/index.asp" target="_blank">
                                Taiwan Research
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www.sinopac.com/footer/20170512111026126000000000000863.html"
                                target="_blank"
                            >
                                客戶資料保密措施
                            </a>
                        </li>
                        <li>
                            <a href={process.env.NEXT_PUBLIC_SUBPATH + 'index_privacy'} target="_blank">
                                隱私權保護聲明
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://securities.sinopac.com/footer/list15d1c4072970000085d381a2b549a2dc.html"
                                target="_blank"
                            >
                                共同行銷商品契約
                            </a>
                        </li>
                        <li>
                            <a href={process.env.NEXT_PUBLIC_SUBPATH + 'index_disclaimer'} target="_blank">
                                網站免責聲明
                            </a>
                        </li>
                    </ul>
                    <div className="down__social">
                        <a href="https://www.youtube.com/user/SinoEC" target="_blank" className="btn__youtube">
                            Youtube
                        </a>
                        <a href="https://www.facebook.com/SinoPacSecurities/" target="_blank" className="btn__fb">
                            Facebook
                        </a>
                        <a href="https://line.me/R/ti/p/@dhq6620j" target="_blank" className="btn__line">
                            Line
                        </a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .footer {
                    background-color: #172439;
                    font-family: ${theme.fontFamily};
                }
                .footer .mobile__box2 {
                    display: none;
                }
                @media (max-width: 800px), print {
                    .footer .mobile__box2 {
                        display: block;
                    }
                }
                @media (max-width: 800px), print {
                    .box2__title {
                        font-size: 2rem;
                        color: #dedede;
                        text-align: center;
                        margin: 0.5rem;
                        margin-top: 2rem;
                    }
                    .box2__val {
                        color: #dedede;
                        text-align: center;
                        font-size: 1.4rem;
                        margin-top: 0;
                        margin-bottom: 2rem;
                    }
                    .box2__val span {
                        padding-right: 0.8rem;
                    }
                }
                .footer .mobile__box3 {
                    display: none;
                }
                @media (max-width: 800px) {
                    .footer .mobile__box3 {
                        display: block;
                        color: #f7f7f7;
                        text-align: center;
                        background: #0d1623;
                        padding: 2rem;
                        font-size: 1.5rem;
                        line-height: 2.3rem;
                        color: #c0c0c0;
                        border-bottom: 1px solid #172439;
                    }
                    .footer .mobile__box3 p {
                        margin: 0;
                    }
                }
                .footer__up {
                    background-color: #172439;
                    margin: 0 auto;
                    width: ${theme.contentWidth.pc};
                    height: 7rem;
                    /* position: relative; */

                    padding: 0 1.5rem;
                }
                @media (max-width: 1250px), print {
                    .footer__up {
                        width: 90%;
                    }
                }
                @media (max-width: 1024px), print {
                    .footer__up {
                        width: 100%;
                        height: 7rem;
                        padding: 0 3rem;
                    }
                }
                @media (max-width: 800px), print {
                    .footer__up {
                        height: 6.5rem;
                        padding: 0;
                    }
                }
                .footer__up ul {
                    list-style: none;
                    line-height: 7rem;
                    padding-left: 0;
                    display: inline-block;
                    /* position: absolute;
                    top: 50%;
                    transform: translateY(-50%); */
                }
                @media (max-width: 1024px), print {
                    .footer__up ul {
                        line-height: 7rem;
                        display: inline-block;
                    }
                }
                @media (max-width: 800px), print {
                    .footer__up ul {
                        display: none;
                    }
                }
                .footer__up li {
                    display: inline-block;
                    color: #f7f7f7;
                    font-size: 2.2rem;
                    line-height: 1.5rem;
                    padding: 0 1rem 0 0;
                    margin: 0 1rem 0 0;
                    border-right: 0.1rem solid #f7f7f7;
                }
                @media (max-width: 1024px), print {
                    .footer__up li {
                        font-size: 1.8rem;
                    }
                }
                .footer__up li:last-child {
                    border: none;
                }
                .footer__up .footer__up--signup {
                    /* position: absolute;
                    right: 0;
                    top: 0; */
                    width: 19.7rem;
                    height: 7rem;
                    color: #f7f7f7;
                    font-size: 2.2rem;
                    text-align: center;
                    line-height: 7rem;
                    transition: background 0.2s linear;
                    background: #c43826;
                    float: right;
                }
                @media (max-width: 1024px), print {
                    .footer__up .footer__up--signup {
                        font-size: 2rem;
                        height: 7rem;
                        line-height: 7rem;
                        right: 3rem;
                        width: 15rem;
                    }
                }
                @media (max-width: 800px), print {
                    .footer__up .footer__up--signup {
                        font-size: 2.3rem;
                        height: 6.5rem;
                        line-height: 6.5rem;
                        right: 0;
                        width: 100%;
                    }
                }
                .footer__up .footer__up--signup:hover {
                    background: #9d1200;
                }
                .footer__up a {
                    display: block;
                    text-decoration: none;
                }

                .footer__middle {
                    background: #0d1623;
                    font-size: 0;
                }
                .footer__middle .middle__box {
                    width: ${theme.contentWidth.pc};
                    margin: 0 auto;
                    padding: 4.5rem 1.5rem 4.5rem 1.5rem;
                    position: relative;
                    border-bottom: 0.1rem solid #172439;

                    /* display: flex; */
                    /* flex-direction: row; */
                }
                @media (max-width: 1250px), print {
                    .footer__middle .middle__box {
                        width: 90%;
                    }
                }
                @media (max-width: 1024px), print {
                    .footer__middle .middle__box {
                        width: 100%;
                        padding: 3rem 3rem 3rem 3rem;
                        white-space: nowrap;
                    }
                }
                @media (max-width: 800px) {
                    .footer__middle .middle__box {
                        display: none;
                    }
                }
                .middle--card {
                    display: inline-block;
                    margin: 0 15rem 0 0;
                    vertical-align: top;

                    /* flex: 0.25; */
                }
                @media (max-width: 1024px), print {
                    .middle--card {
                        margin: 0;
                        width: calc((100% - 160px) / 3);
                    }
                }
                .middle--card:last-child {
                    position: absolute;
                    top: 4.5rem;
                    right: 3.3rem;
                    margin: 0;
                    text-align: center;
                    color: #c0c0c0;
                    font-size: 1.4rem;
                }
                @media (max-width: 1024px), print {
                    .middle--card:last-child {
                        top: 3rem;
                        right: 3rem;
                        width: auto;
                    }
                }
                .middle--card h3 {
                    margin: 0 0 2rem 0;
                    text-align: left;
                    font-size: 1.8rem;
                    color: #fff;
                    font-weight: bold;
                }
                .middle--card a {
                    display: inline-block;
                    text-align: left;
                    line-height: 2.4rem;
                    font-size: 1.6rem;
                    border: none;

                    padding: 0 0 0.1rem 0;
                    color: #c7c7c7;
                    transition: border 0.1s linear;
                    border-bottom: 0.1rem solid rgba(0, 0, 0, 0);
                    margin-bottom: 0.7rem;
                }
                .middle--card a:hover {
                    border-bottom: 0.1rem solid #c7c7c7;
                }
                .card--QR::before {
                    display: block;
                    width: 14.5rem;
                    height: 14.5rem;
                    margin: 0 0 2rem 0;
                    content: '';
                    background: url(${qrCode}) no-repeat center center;
                    background-size: 100% auto;
                }
                .footer__down {
                    background: #0d1623;
                }
                .down__box {
                    width: ${theme.contentWidth.pc};
                    margin: 0 auto;
                    position: relative;
                    padding: 2.5rem 0;
                }
                .down__box block1 {
                    width: 65%;
                }
                @media (max-width: 1600px), print {
                    .down__box block1 {
                        width: 65%;
                        margin-left: 18rem;
                    }
                }
                @media (max-width: 1250px), print {
                    .down__box {
                        width: 90%;
                    }
                    .down__box block1 {
                        width: 65%;
                        margin-left: 18rem;
                    }
                }
                /* @media (max-width: 1500px), print {
                    .down__box {
                        width: 80%;
                        padding: 1.5rem 0;
                    }
                } */
                @media (max-width: 1024px), print {
                    .down__box {
                        width: 100%;
                        padding: 1.5rem 0;
                    }
                }
                .down__box::before {
                    position: absolute;
                    left: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    display: block;
                    content: '';
                    width: 15.6rem;
                    height: 3.6rem;
                    vertical-align: middle;
                    background: url(${logo}) no-repeat center center;
                    background-size: 100% auto;
                }
                @media (max-width: 1024px), print {
                    .down__box::before {
                        width: 13rem;
                    }
                }
                @media (max-width: 800px) {
                    .down__box::before {
                        display: none;
                        position: static;
                    }
                }
                .down__box ul {
                    list-style: none;
                    display: block;
                    text-align: left;
                    margin-left: 18rem;
                    margin-bottom: 0.2rem;
                    width: 65%;
                }
                @media (max-width: 1100px), print {
                    .down__box ul {
                        text-align: center;
                        margin-left: 18rem;
                    }
                }
                @media (max-width: 1024px), print {
                    .down__box ul {
                        width: 66%;
                        margin: 0 auto;
                        padding: 0;
                    }
                }
                @media (max-width: 800px), print {
                    .down__box ul {
                        display: none;
                    }
                }
                .down__box ul:first-child {
                    margin-top: 0.8rem;
                }
                .down__box li {
                    display: inline-block;
                    border-right: 0.1rem solid #c0c0c0;
                    padding: 0 1rem 0 0;
                    margin: 0 1rem 0.7rem 0;
                    line-height: 15px;
                    color: #c0c0c0;
                    font-size: 1.4rem;
                }
                @media (max-width: 1024px), print {
                    .down__box li {
                        padding: 0 0.5rem 0 0;
                        margin: 0 0.5rem 0.7rem 0;
                        font-size: 1.2rem;
                    }
                }
                .down__box li a {
                    color: #c0c0c0;
                    font-size: 1.4rem;
                }
                .down__box li:last-child {
                    border: none;
                }
                .down__social {
                    position: absolute;
                    right: 3.3rem;
                    top: 50%;
                    transform: translateY(-50%);
                }
                @media (max-width: 1024px), print {
                    .down__social {
                        right: 3rem;
                    }
                }
                @media (max-width: 800px), print {
                    .down__social {
                        text-align: center;
                        position: static;
                        transform: translateY(0);
                    }
                }
                .down__social .btn__youtube {
                    background-image: url(${youtube});
                }
                .down__social .btn__fb {
                    background-image: url(${fb});
                }
                .down__social .btn__line {
                    background-image: url(${line});
                }
                .down__social a {
                    display: inline-block;
                    width: 3.5rem;
                    height: 3.5rem;
                    margin: 0 0.6rem 0 0;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: auto 100%;
                    text-indent: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
});
export default Footer;
