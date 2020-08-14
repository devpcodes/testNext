import React from 'react';
import qrCode from '../../resorces/images/footer/img_ileaderapp.png';
import logo from '../../resorces/images/footer/logo_footer.png';
import fb from '../../resorces/images/footer/btn_fb.png';
import youtube from '../../resorces/images/footer/btn_youtube.png';
import line from '../../resorces/images/footer/btn_line.png';
const footerData = [
    {
        title: '關於永豐金證券',
        children: [
            {
                title: '關於永豐金',
                link: ''
            },
            {
                title: '投資人訊息',
                link: ''
            },
            {
                title: '金融友善服務準則',
                link: ''
            },
            {
                title: '服務據點',
                link: ''
            },
            {
                title: '人力招募',
                link: ''
            }
        ]
    },
    {
        title: '數位服務',
        children: [
            {
                title: '新理財網下單',
                link: ''
            },
            {
                title: 'iLeader App下單',
                link: ''
            },
            {
                title: 'eLeader AP下單',
                link: ''
            },
            {
                title: '好神通 AP下單',
                link: ''
            },
            {
                title: '豐管家服務App',
                link: ''
            }
        ]
    },
    {
        title: '企業團網站',
        children: [
            {
                title: '永豐金控',
                link: ''
            },
            {
                title: '永豐金證券(亞洲)',
                link: ''
            },
            {
                title: '永豐期貨',
                link: ''
            },
            {
                title: '永豐投信',
                link: ''
            },
            {
                title: '永豐MMA交易網',
                link: ''
            },
            {
                title: '永豐信用卡服務網',
                link: ''
            }
        ]
    }
]
const contentWidth = '102.4rem';
const Footer = React.memo((props) => {
    return ( 
        <div className="footer">
            <div className="footer__up">
                <ul>
                    <li><span>客服專線</span> 0800-038-123</li>
                    <li> 02-6630-8899</li>
                    <li><span>服務時間</span> (AM7:30~PM10:00)</li>
                </ul>
                <a href="https://sinourl.tw/ozBFJI" target="_blank" className="footer__up--signup">快速開戶</a>
            </div>
            <div className="mobile__box2">
                <p className="box2__title">撥打客服專線</p>
                <p  className="box2__val"><span>服務時間</span>(AM7:30~PM10:00)</p>
            </div>
            <div className="mobile__box3">
                <p>永豐金證券股份有限公司</p>
                <p>台北市重慶南路一段二號7、18、20樓</p>
                <p>107年金管證總字第0006號</p>
            </div>
            <div className="footer__middle">
                <div className="middle__box">
                    {footerData.map((item, index) => (
                        <div className="middle--card" key={index}>
                            <h3>{item.title}</h3>
                            {item.children != null ? item.children.map((link, index2) => (
                                <p key={index2}><a>{link.title}</a></p>
                            )): null}
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
                    <ul>
                        <li>永豐金證券股份有限公司</li>
                        <li>台北市重慶南路一段二號7、18、20樓</li>
                        <li>107年金管證總字第0006號</li>
                    </ul>
                    <ul>
                        <li><a href="https://www.taiwanresearch.com/index.asp" target="_blank">Taiwan Research</a></li>
                        <li><a href="http://www.sinopac.com/footer/20170512111026126000000000000863.html" target="_blank">客戶資料保密措施</a></li>
                        <li><a href="https://www.sinotrade.com.tw/newweb/index_privacy" target="_blank">隱私權保護聲明</a></li>
                        <li><a href="https://securities.sinopac.com/footer/list15d1c4072970000085d381a2b549a2dc.html" target="_blank">共同行銷商品契約</a></li>
                        <li><a href="https://www.sinotrade.com.tw/newweb/index_disclaimer" target="_blank">網站免責聲明</a></li>
                    </ul>
                    <div className="down__social">
                        <a href="https://www.youtube.com/user/SinoEC" target="_blank" className="btn__youtube">Youtube</a>
                        <a href="https://www.facebook.com/SinoPacSecurities/" target="_blank" className="btn__fb">Facebook</a>
                        <a href="https://line.me/R/ti/p/@dhq6620j" target="_blank" className="btn__line">Line</a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .footer {
                    background-color: #172439;
                    font-family: Microsoft JhengHei,Calibri,serif;
                }
                .footer .mobile__box2{
                    display: none;
                }
                @media (max-width:800px), print{
                    .footer .mobile__box2{
                        display: block;
                    }
                }
                @media (max-width:800px), print{
                    .box2__title {
                        font-size: 2rem;
                        color: #dedede;
                        text-align: center;
                        margin: .5rem;
                        margin-top: 2rem;
                    }
                    .box2__val {
                        color: #dedede;
                        text-align: center;
                        font-size: 1.4rem;
                        margin-top: 0;
                        margin-bottom: 2rem;
                    }
                    .box2__val span{
                        padding-right: .8rem;
                    }
                }
                .footer .mobile__box3 {
                    display: none;
                }
                @media (max-width:800px){
                    .footer .mobile__box3{
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
                    .footer .mobile__box3 p{
                        margin: 0;
                    }
                }
				.footer__up {
                    background-color: #172439;
                    margin: 0 auto;
                    width: ${contentWidth};
                    height: 9rem;
                    position: relative;
                    padding: 0 1.5rem;
                }
                @media (max-width:1024px), print{
                    .footer__up{
                        width: 100%;
                        height: 7rem;
                        padding: 0 3rem;
                    }
                }
                @media (max-width:800px), print{
                    .footer__up{
                        height: 6.5rem;
                    }
                }
                .footer__up ul {
                    list-style: none;
                    padding-left: 0;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .footer__up li {
                    display: inline-block;
                    color: #f7f7f7;
                    font-size: 2.2rem;
                    line-height: 1.5rem;
                    padding: 0 1rem 0 0;
                    margin: 0 1rem 0 0;
                    border-right: 0.1rem solid #f7f7f7
                }
                @media (max-width:1024px), print{
                    .footer__up li{
                        font-size: 1.8rem;
                    }
                }
                .footer__up li:last-child{
                    border: none;
                }
                .footer__up .footer__up--signup{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 19rem;
                    height: 9rem;
                    color: #f7f7f7;
                    font-size: 2.2rem;
                    text-align: center;
                    line-height: 9rem;
                    transition: background .2s linear;
                    background: #c43826;
                }
                @media (max-width:1024px), print{
                    .footer__up .footer__up--signup{
                        font-size: 2rem;
                        height: 7rem;
                        line-height: 7rem;
                        right: 3rem;
                        width: 15rem;
                    }
                }
                @media (max-width:800px), print{
                    .footer__up .footer__up--signup{
                        font-size: 2.3rem;
                        height: 6.5rem;
                        line-height: 6.5rem;
                        right: 0;
                        width: 100%;
                    }
                }
                .footer__up .footer__up--signup:hover{
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
                    width: ${contentWidth};
                    margin: 0 auto;
                    padding: 4.5rem 1.5rem 4.5rem 1.5rem;
                    position: relative;
                    border-bottom: 0.1rem solid #172439;

                    /* display: flex; */
                    /* flex-direction: row; */
                }
                @media (max-width:1024px), print{
                    .footer__middle .middle__box {
                        width: 100%;
                        padding: 3rem 3rem 3rem 3rem;
                        white-space: nowrap;
                    }
                }
                @media (max-width:800px) {
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
                @media (max-width:1024px), print{
                    .middle--card {
                        margin: 0;
                        width: calc((100% - 160px) / 3);
                    }
                }
                .middle--card:last-child {
                    position: absolute;
                    top: 4.5rem;
                    right: 1.5rem;
                    margin: 0;
                    text-align: center;
                    color: #c0c0c0;
                    font-size: 1.4rem;
                }
                @media (max-width:1024px), print{
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
                    font-size: 1.4rem;
                    border: none;

                    padding: 0 0 0.1rem 0;
                    color: #c7c7c7;
                    transition: border .1s linear;
                    border-bottom: 0.1rem solid rgba(0,0,0,0);
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
                    content: "";
                    background: url(${qrCode}) no-repeat center center;
                    background-size: 100% auto;
                }
                .footer__down {
                    background: #0d1623;
                }
                .down__box {
                    width: ${contentWidth};
                    margin: 0 auto;
                    position: relative;
                    padding: 2.5rem 0;
                }
                @media (max-width:1024px), print{
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
                    content: "";
                    width: 15.6rem;
                    height: 3.6rem;
                    vertical-align: middle;
                    background: url(${logo}) no-repeat center center;
                    background-size: 100% auto;
                }
                @media (max-width:1024px), print{
                    .down__box::before {
                        width: 13rem;
                    }
                }
                @media (max-width:800px){
                    .down__box::before {
                        display: none;
                        position: static;
                    }
                }
                .down__box ul {
                    list-style: none;
                    display: block;
                    text-align: center;
                    margin-bottom: 0.2rem;
                }
                @media (max-width:1024px), print{
                    .down__box ul {
                        width: 66%;
                        margin: 0 auto;
                        padding: 0;
                    }
                }
                @media (max-width:800px), print{
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
                @media (max-width:1024px), print{
                    .down__box li {
                        padding: 0 .5rem 0 0;
                        margin: 0 .5rem 0.7rem 0;
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
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                }
                @media (max-width:1024px), print{
                    .down__social {
                        right: 3rem;
                    }
                }
                @media (max-width:800px), print{
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
})
export default Footer;