import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import close from '../../../../resources/images/pages/homepage/QAshortcut/ic-ic-close-big.svg';
import chatBox from '../../../../resources/images/pages/homepage/QAshortcut/edit-comment.svg';
import goTop from '../../../../resources/images/pages/homepage/QAshortcut/basic-download.svg';
import icon1 from '../../../../resources/images/pages/homepage/QAshortcut/ic-ic-image-step.svg';
import icon2 from '../../../../resources/images/pages/homepage/QAshortcut/ic-ic-image-password.svg';
import icon3 from '../../../../resources/images/pages/homepage/QAshortcut/ic-ic-search.svg';
import icon4 from '../../../../resources/images/pages/homepage/QAshortcut/ic-ic-download.svg';

function QAshortcut(props) {
    const [closed, setClosed] = useState(true);
    const router = useRouter();

    const validate = e => {
        setClosed(true);
        router.push({
            pathname: '/customer-support/search-result',
            query: { keyword: e.target.value },
        });
    };

    return (
        <div className="QA-shortcut">
            {!closed && (
                <div className="QA-room">
                    <div className="black">
                        <h2>嗨，想了解什麼?</h2>
                        <Input
                            size="large"
                            placeholder="搜一搜"
                            prefix={<SearchOutlined />}
                            onKeyDown={e => e.key === 'Enter' && validate(e)}
                        />
                    </div>
                    <ul className="white">
                        <li>
                            <a
                                href="https://www.sinotrade.com.tw/openact/progress?strProd=0002&strWeb=0001"
                                target="_blank"
                                style={{ backgroundImage: `url(${icon1})` }}
                            >
                                查開戶進度
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.sinotrade.com.tw/newweb/Service_ForgetPassword/"
                                style={{ backgroundImage: `url(${icon2})` }}
                            >
                                密碼專區
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.sinotrade.com.tw/sinotradeSalesQry/Sales.aspx"
                                target="_blank"
                                style={{ backgroundImage: `url(${icon3})` }}
                            >
                                查詢營業員
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.sinotrade.com.tw/richclub/dawhotou/campaign/app"
                                target="_blank"
                                style={{ backgroundImage: `url(${icon4})` }}
                            >
                                下載大戶投
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            <div
                className="switch"
                style={closed ? { backgroundImage: `url(${chatBox})` } : { backgroundImage: `url(${close})` }}
                onClick={() => {
                    setClosed(!closed);
                }}
            ></div>
            <div className="divide"></div>
            <div
                className="go-top"
                style={{ backgroundImage: `url(${goTop})` }}
                onClick={() => document.documentElement.scrollTo(0, 0)}
            ></div>
            <style jsx>
                {`
                    ul,
                    li {
                        padding: 0;
                        margin: 0;
                        list-style: none;
                    }

                    a {
                        padding: 0;
                        margin: 0;
                    }

                    .QA-shortcut {
                        position: fixed;
                        width: 60px;
                        height: 101px;
                        right: 16px;
                        bottom: 56px;
                        background-color: #c43826;
                        color: #fff;
                        z-index: 11;
                        border-radius: calc(60px / 2);
                    }

                    .QA-shortcut .switch {
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 14px;
                        background-position: center;
                        background-size: contain;
                        background-repeat: no-repeat;
                        cursor: pointer;
                    }

                    .QA-shortcut .divide {
                        position: absolute;
                        width: 30px;
                        height: 2px;
                        background: #eedbdb;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 48px;
                    }

                    .QA-shortcut .go-top {
                        position: absolute;
                        width: 26px;
                        height: 26px;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 17px;
                        background-position: center;
                        background-size: contain;
                        background-repeat: no-repeat;
                        cursor: pointer;
                    }

                    .QA-room {
                        position: absolute;
                        top: -265px;
                        right: 0;
                        width: 308px;
                        height: auto;
                        box-shadow: 1px 1px 15px 0 rgba(169, 182, 203, 0.4);
                    }

                    .QA-room::after {
                        content: '';
                        position: absolute;
                        right: 24px;
                        bottom: -16px;
                        border-color: transparent;
                        border-top-color: #fff;
                        border-width: 8px;
                        border-style: solid;
                        width: 0;
                        height: 0;
                    }

                    .QA-room h2 {
                        margin-bottom: 19.4px;
                        font-size: 20px;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.5px;
                        color: #fff;
                    }

                    .QA-room .black {
                        background-color: #0d1623;
                        padding: 24px;
                        border-top-left-radius: 2px;
                        border-top-right-radius: 2px;
                    }

                    .QA-room .black input::placeholder {
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #3f5372 !important;
                    }

                    .QA-room .white {
                        display: flex;
                        flex-wrap: wrap;
                        background-color: #fff;
                        padding: 24px 24px 0;
                        border-bottom-left-radius: 2px;
                        border-bottom-right-radius: 2px;
                    }

                    .QA-room .white li {
                        width: 50%;
                        margin-bottom: 24px;
                    }

                    .QA-room .white li a {
                        display: block;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #0d1623;
                        padding-left: 30px;
                        background-position: left center;
                        background-size: contain;
                        background-repeat: no-repeat;
                    }

                    @media screen and (max-width: 450px) {
                        .QA-shortcut {
                            display: none;
                        }
                    }
                `}
            </style>
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}

export default QAshortcut;
