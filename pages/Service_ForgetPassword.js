import { Popover } from 'antd';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import theme from '../resources/styles/theme';
import info from '../resources/images/pages/Service_ForgetPassword/attention-info-circle.png';
import more from '../resources/images/pages/Service_ForgetPassword/menu-more-horizontal.png';

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
                    <Popover content={<p>1231244</p>} trigger="click">
                        <span className="more">
                            <img src={more} />
                        </span>
                    </Popover>
                </h2>
                <ul className="password__service__container">
                    <li className="password__service__item">
                        <a className="password__service__link">
                            <Popover content={<p>1231244</p>} trigger="click">
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src="https://fakeimg.pl/150x150/" />
                            <div>
                                <h5 className="service__title">線上解鎖</h5>
                                <p className="service__desc">
                                    我記得密碼，我要解鎖
                                    <br />
                                    每日解鎖上線 2 次
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a className="password__service__link">
                            <Popover content={<p>1231244</p>} trigger="click">
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src="https://fakeimg.pl/150x150/" />
                            <div>
                                <h5 className="service__title">密碼補發 - 證券戶</h5>
                                <p className="service__desc">
                                    我已經忘記密碼
                                    <br />
                                    我要線上補發證券帳戶密碼
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a className="password__service__link">
                            <Popover content={<p>1231244</p>} trigger="click">
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src="https://fakeimg.pl/150x150/" />
                            <div>
                                <h5 className="service__title">密碼補發 - 期貨戶</h5>
                                <p className="service__desc">
                                    我已經忘記密碼
                                    <br />
                                    我要補發永豐期貨帳戶密碼
                                </p>
                            </div>
                        </a>
                    </li>
                    <li className="password__service__item">
                        <a className="password__service__link">
                            <Popover content={<p>1231244</p>} trigger="click">
                                <img src={info} className="info" />
                            </Popover>
                            <img className="service__img" src="https://fakeimg.pl/150x150/" />
                            <div>
                                <h5 className="service__title">臨櫃補發密碼</h5>
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
                .password__container {
                    width: 80%;
                    margin: 200px auto 0;
                }
                .title__container {
                    margin: 28px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .more {
                    width: 40px;
                    height: 40px;
                    border-radius: 2px;
                    border: 1px solid #d7e0ef;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
                    border: 1px solid #d7e0ef;
                    height: 320px;
                    width: 23%;
                    min-width: 200px;
                    margin-right: 28px;
                    text-align: center;
                }
                .password__service__item:last-child {
                    margin-right: 0;
                }
                .info {
                    right: 15px;
                    position: absolute;
                    top: 15px;
                }
                .password__service__link {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 20px 0;
                }

                .service__title {
                    font-size: 2rem;
                    margin: 24px 0 8px 0;
                    font-weight: bold;
                }
                .service__desc {
                    font-size: 1.6rem;
                    color: #6c7b94;
                    line-height: 23px;
                }

                @media (max-width: 1113px) {
                    .password__service__container {
                        flex-wrap: wrap;
                    }
                    .password__service__item {
                        width: 46%;
                    }
                    .password__service__item:nth-child(2n) {
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
                        margin: 100px auto 0;
                    }
                    .password__service__link {
                        display: flex;
                        padding: 20px 15px;
                    }
                    .password__service__item {
                        height: auto;
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
