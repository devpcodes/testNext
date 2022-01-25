import React from 'react';
import YellowRedLine from './YellowRedLine';
import phoneService from '../../../../resources/images/pages/homepage/contact_section/img-service-service-phone.svg';
import onlineService from '../../../../resources/images/pages/homepage/contact_section/img-service-service-24-hr.svg';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const ContactSection = () => {
    const router = useRouter();

    const toCustomerSupport = () => {
        router.push('/customer-support');
    };

    return (
        <div className="contact-section-container">
            <h2>聯繫客服</h2>
            <p>交易全程加密，受託金管監理</p>
            <YellowRedLine />

            {/* <div className='contact-section-card-and-more'> */}
            <div className="contact-section-card-wrap">
                <div className="contact-section-card">
                    <img className="contact-section-icon" src={phoneService} alt="phone" />
                    <div className="contact-texts-wrap">
                        <p>客服專線</p>
                        <div className="phone-number">
                            <p>0800-038-123 /</p>
                            <p>02-6630-8899</p>
                        </div>
                        <p>台股營業日 07:30-10:00</p>
                    </div>
                </div>

                <div
                    className="contact-section-card"
                    onClick={() => {
                        window.open('https://chatservice.sinopac.com/Webhook/#department/5?site=sinotrade', '_blank');
                    }}
                >
                    <img className="contact-section-icon" src={onlineService} alt="onlineService" />
                    <div className="contact-texts-wrap">
                        <p>線上客服</p>
                        <p>線上客服-智慧小豐</p>
                        <p>24小時智能客服</p>
                    </div>
                </div>
            </div>
            <div className="contact-more-wrap" onClick={toCustomerSupport}>
                <p>更多常見問題</p>
                <RightOutlined style={{ fontSize: '13px', color: '#3f5372', marginTop: '5px' }} />
            </div>
            {/* </div> */}

            <style jsx>
                {`
                    .contact-section-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background-color: #f9fbff;
                        width: calc(80% + 1vw * 2);
                        padding: 0 1.5rem 56px;
                        margin: 0 auto;
                    }

                    h2 {
                        margin: 0;
                        font-size: 36px;
                        font-weight: 600;
                        letter-spacing: 0.9px;
                        color: #0d1623;
                    }

                    .contact-section-container > p {
                        margin: 7px 0 10px 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        text-align: center;
                        color: #0d1623;
                    }

                    /* .contact-section-card-and-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        } */

                    .contact-section-card-wrap {
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        margin-top: 30px;
                    }

                    .contact-section-card {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        /* width: 45%; */
                        margin: 0 1vw;
                        // width: 568px;
                        min-height: 153px;
                        padding: 32px;
                        border: solid 1px #d7e0ef;
                        background-color: white;
                        width: 50%;
                    }

                    .contact-section-icon {
                        width: 80px;
                        height: 80px;
                        margin-right: 32px;
                    }

                    .contact-texts-wrap {
                        width: 85%;
                    }

                    .contact-texts-wrap > p:first-of-type {
                        margin: 0;
                        font-size: 20px;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        color: #0d1623;
                    }

                    .contact-texts-wrap > p:nth-of-type(2) {
                        margin: 4px 0 4px 0;
                        /* font-family: Barlow; */
                        font-size: 24px;
                        line-height: 1.33;
                        letter-spacing: 0.6px;
                        color: #0d1623;
                    }

                    .contact-texts-wrap > p:last-of-type {
                        margin: 0;
                        /* font-family: Barlow; */
                        font-size: 16px;
                        line-height: 1.5;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    .contact-more-wrap {
                        display: flex;
                        width: calc(100% - 1vw * 2);
                        // max-width: 1169px;
                        justify-content: flex-end;
                        margin-top: 16px;
                        cursor: pointer;
                    }

                    .contact-more-wrap > p {
                        margin: 0 8px 0 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    .phone-number {
                        display: flex;
                    }

                    .phone-number > p {
                        margin: 0;
                        /* font-family: Barlow; */
                        font-size: 24px;
                        line-height: 1.33;
                        letter-spacing: 0.6px;
                        color: #0d1623;
                    }

                    .phone-number > p:first-of-type {
                        padding-right: 8px;
                    }

                    @media screen and (max-width: 1338px) {
                        .phone-number {
                            flex-direction: column;
                        }
                    }

                    @media screen and (max-width: 1250px) {
                        .contact-section-container {
                            width: calc(90% + 1vw * 2);
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        .contact-section-container {
                            width: 100%;
                            padding: 32px;
                        }

                        .contact-section-card-wrap {
                            width: 100%;
                            flex-wrap: wrap;
                            margin-top: 15px;
                        }

                        .contact-section-card {
                            width: 100%;
                            max-width: unset;
                            margin: 12px 0;
                        }

                        .phone-number {
                            flex-direction: row;
                        }

                        .contact-more-wrap {
                            width: 100%;
                            margin-top: 0;
                        }
                    }

                    @media screen and (max-width: 523px) {
                        .phone-number {
                            flex-direction: column;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .contact-section-container {
                            padding: 510px 16px 24px 16px;
                        }

                        h2 {
                            font-size: 20px;
                        }

                        .contact-section-icon {
                            width: 60px;
                            height: 60px;
                            margin-bottom: 50px;
                        }

                        .contact-section-card-wrap {
                            margin-top: 0;
                        }

                        .contact-more-wrap {
                            justify-content: center;
                        }

                        @media screen and (max-width: 365px) {
                            .contact-section-container {
                                padding: 520px 24px 24px;
                            }
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ContactSection;
