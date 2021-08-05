import { Popover } from 'antd';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import theme from '../resources/styles/theme';
import info from '../resources/images/pages/Service_ForgetPassword/attention-info-circle.svg';
import more from '../resources/images/pages/Service_ForgetPassword/menu-more-horizontal.svg';
import userVoice from '../resources/images/pages/Service_ForgetPassword/ic-support.svg';

import unlock from '../resources/images/pages/Service_ForgetPassword/img-psw-01@2x.png';
import sendpwdS from '../resources/images/pages/Service_ForgetPassword/img-psw-02@2x.png';
import sendpwdF from '../resources/images/pages/Service_ForgetPassword/img-psw-03@2x.png';
import sendpwdL from '../resources/images/pages/Service_ForgetPassword/img-psw-04@2x.png';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Service_ForgetPassword() {
    return (
        <>
            <PageHead title={'密碼專區'} />

            <section className="password__container">
                <h2 className="title__container">
                    <span className="title"> 密碼專區 </span>
                    <Popover
                        title={
                            <h5 className="service__online__title">
                                <img className="service__online__img" src={userVoice} />
                                線上客服
                            </h5>
                        }
                        content={
                            <a
                                className="service__online__link"
                                target="_blank"
                                href="https://chatservice.sinopac.com/index.php/chat/startchat/(department)/5?site=sinotrade"
                            >
                                無法解決問題？試試線上客服 - 智慧小豐
                            </a>
                        }
                        trigger="click"
                        placement="bottomRight"
                    >
                        <span className="more">
                            <img src={more} />
                        </span>
                    </Popover>
                </h2>
                <ul className="password__service__container">
                    <li className="password__service__item">
                        <a
                            className="password__service__link"
                            href={`${process.env.NEXT_PUBLIC_SUBPATH}/Service_ForgetPassword_Self`}
                        >
                            <Popover
                                content={
                                    <p className="tooltips">
                                        須持有有效憑證或開戶時留存之手機號碼進行驗證，即可線上解鎖。每日僅提供兩次線上解鎖，超過申請次數請洽詢所屬營業員或來電客服中心。
                                    </p>
                                }
                                trigger="click"
                                placement="topRight"
                            >
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src={unlock} />
                            <div>
                                <h5 className="service__title one__line">線上解鎖</h5>
                                <p className="service__desc">
                                    我記得密碼，我要解鎖
                                    <br />
                                    每日解鎖上限 2 次
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a
                            className="password__service__link"
                            href={process.env.NEXT_PUBLIC_PASSWORD_SECURITIES}
                            target="_blank"
                        >
                            <img className="service__img" src={sendpwdS} />
                            <div>
                                <h5 className="service__title">
                                    <span className="cbreak">密碼補發</span>
                                    <span className="cdisplay"> - </span>
                                    <span className="cbreak">永豐金證券客戶</span>
                                </h5>
                                <p className="service__desc">
                                    我已經忘記密碼
                                    <br />
                                    我要線上補發證券帳戶密碼
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a
                            className="password__service__link"
                            href={process.env.NEXT_PUBLIC_PASSWORD_FUTURE}
                            target="_blank"
                        >
                            <Popover
                                content={
                                    <p className="tooltips">
                                        在永豐期貨開戶的用戶，只能選擇期貨戶入口進行密碼補發。由永豐金證券開期貨帳戶的用戶，請改由證券戶入口補發。
                                    </p>
                                }
                                trigger="click"
                                placement="topRight"
                            >
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src={sendpwdF} />
                            <div>
                                <h5 className="service__title">
                                    <span className="cbreak">密碼補發</span>
                                    <span className="cdisplay"> - </span>
                                    <span className="cbreak">永豐期貨客戶</span>
                                </h5>
                                <p className="service__desc">
                                    我已經忘記密碼
                                    <br />
                                    我要補發永豐期貨帳戶密碼
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a
                            className="password__service__link"
                            href={process.env.NEXT_PUBLIC_SERVICE_POSITIONS}
                            target="_blank"
                        >
                            <Popover
                                content={
                                    <p className="tooltips">
                                        若前往原開戶分公司臨櫃補發密碼可當日完成。若非原開戶分公司，則須等待1至3個工作天。
                                    </p>
                                }
                                trigger="click"
                                placement="topRight"
                            >
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src={sendpwdL} />
                            <div>
                                <h5 className="service__title">
                                    <span className="cbreak">臨櫃補發</span>
                                    <span className="cdisplay"> - </span>
                                    <span className="cbreak">洽營業員</span>
                                </h5>
                                <p className="service__desc">
                                    需本人持身分證及原留印鑑
                                    <br />
                                    親臨分公司申請密碼補發
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>

            <style jsx>{`
                .service__online__title {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    padding: 10px 0px 0px 0px;
                    color: ${theme.colors.textDark};
                }
                .service__online__link {
                    color: #3f5372;
                }
                .service__online__link:hover {
                    color: ${theme.colors.secondary};
                }
                .tooltips {
                    width: 230px;
                    margin: 0;
                    color: #3f5372;
                }
                .service__img {
                    width: 150px;
                    height: 150px;
                }
                .password__container {
                    width: 80%;
                    margin: 0 auto;
                    padding: 150px 0 180px 0;
                }
                .title__container {
                    margin: 28px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .service__online__img {
                    margin-right: 5px;
                    margin-bottom: 3px;
                }
                .more {
                    background-color: ${theme.colors.lightBg};
                    width: 40px;
                    height: 40px;
                    border-radius: 2px;
                    border: 1px solid #d7e0ef;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .more:hover {
                    background-color: #f3f6fe;
                }
                .more > img {
                    display: block;
                    width: 24px;
                    height: 24px;
                }
                .title {
                    color: ${theme.colors.textDark};
                    font-size: 2.8rem;
                    font-weight: bold;
                }
                .password__service__container {
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                }
                .password__service__item {
                    position: relative;
                    border: 1px solid #d7e0ef;
                    background: ${theme.colors.lightBg};
                    width: 23%;
                    min-width: 200px;
                    margin-right: 28px;
                    text-align: center;
                    border-radius: 2px;
                    top: 0;
                    transition: all 0.2s linear;
                }
                .password__service__item:hover {
                    top: -15px;
                    box-shadow: 1px 1px 15px 0 rgba(169, 182, 203, 0.4);
                }
                .password__service__item:last-child {
                    margin-right: 0;
                }
                .info {
                    right: 15px;
                    position: absolute;
                    top: 15px;
                    cursor: pointer;
                }
                .password__service__link {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 20px 0;
                    background: ${theme.colors.lightBg};
                }

                .service__title {
                    font-size: 2rem;
                    margin: 24px 0 8px 0;
                    font-weight: bold;
                    height: 64px;
                    color: ${theme.colors.textNavyBlue};
                }
                .service__title.one__line {
                    line-height: 64px;
                }

                .service__desc {
                    font-size: 1.6rem;
                    color: #3f5372;
                    line-height: 23px;
                }
                .cbreak {
                    display: block;
                }
                .cdisplay {
                    display: none;
                }
                @media (max-width: 1113px) {
                    .password__container {
                        padding: 50px 0 50px 0;
                    }
                    .password__service__container {
                        flex-wrap: wrap;
                    }
                    .password__service__item {
                        width: 46%;
                    }
                    .password__service__item {
                        margin: 0 0 28px 0;
                    }
                }

                @media (max-width: 550px) {
                    .password__service__item {
                        width: 100%;
                        margin: 0 0 28px 0;
                    }
                }

                @media (max-width: 501px) {
                    .password__container {
                        padding: 10px 0 50px 0;
                    }
                    .password__service__link {
                        display: flex;
                        padding: 20px 15px;
                    }
                    .password__service__item {
                        height: auto;
                    }
                    .password__service__item:hover {
                        top: 0;
                    }
                    .service__img {
                        width: 70px;
                        height: 70px;
                        margin-right: 16px;
                    }
                    .service__title {
                        margin: 0 0 5px 0;
                        font-size: 1.6rem;
                        text-align: left;
                    }
                    .service__desc {
                        margin: 0;
                        font-size: 1.6rem;
                        line-height: 19px;
                        text-align: left;
                    }
                    .title__container {
                        margin: 20px 0;
                        align-items: center;
                    }
                    .title {
                        font-size: 2rem;
                    }
                    .cbreak {
                        display: inline-block;
                    }
                    .cdisplay {
                        display: inline-block;
                        margin: 0 5px;
                    }
                    .service__title.one__line {
                        line-height: inherit;
                    }
                    .service__title {
                        height: auto;
                    }
                }
            `}</style>
            <style jsx global>{`
                .page__container {
                    background: #f9fbff;
                }
                .title__container .more.ant-popover-open {
                    background: #d7e0ef;
                }
            `}</style>
            {/* <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Service_ForgetPassword`}
                    title="永豐金證券"
                    iHeight={800}
                />
            </div> */}
        </>
    );
}

export default Service_ForgetPassword;
