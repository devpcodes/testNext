import React from 'react';
import YellowRedLine from './YellowRedLine';
import PropTypes from 'prop-types';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const ThirdSection = ({ data }) => {
    const router = useRouter();

    const toMore = () => {
        router.push(`${data.readMorePath}`);
    };

    return (
        <div className="third-section-container">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
            <YellowRedLine />
            <div className="third-section-card-wrap">
                {data.cardsData.map((item, idx) => (
                    <div className="third-section-card" key={idx}>
                        <div className="third-section-card-icon" style={{ backgroundImage: `url(${item.icon})` }} />
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="third-more-wrap" onClick={toMore}>
                <p>{data.readMoreTitle}</p>
                <RightOutlined style={{ fontSize: '13px', color: '#3f5372', marginTop: '5px' }} />
            </div>
            <p></p>
            <style jsx>
                {`
                    .third-section-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 3% 10%;
                        width: 100%;
                        background-color: #f9fbff;
                    }

                    .third-section-container > h2 {
                        margin-bottom: 5px;
                        font-size: 36px;
                        font-weight: 600;
                        letter-spacing: 0.9px;
                        text-align: center;
                        color: #0d1623;
                    }

                    .third-section-container > p {
                        margin: 0 0 24px 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        text-align: center;
                        color: #0d1623;
                    }

                    .third-section-card-wrap {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }

                    .third-section-card {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 16%;
                        max-width: 180px;
                        min-height: 220px;
                        margin: 6px;
                        border: solid 1px #e6ebf5;
                        background-color: white;
                        cursor: pointer;
                    }

                    .third-section-card-icon {
                        width: 80px;
                        height: 80px;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .third-section-card > h4 {
                        margin: 10px 0 8.4px;
                        font-size: 20px;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        text-align: center;
                        white-space: nowrap;
                        color: #0d1623;
                    }

                    .third-section-card > p {
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        text-align: center;
                        color: #3f5372;
                    }

                    .third-more-wrap {
                        display: flex;
                        width: 100%;
                        max-width: 1145px;
                        justify-content: flex-end;
                        margin-top: 16px;
                        cursor: pointer;
                    }

                    .third-more-wrap > p {
                        margin: 0 8px 0 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    @media screen and (max-width: 1050px) {
                        .third-section-container {
                            padding-top: 56px;
                        }

                        .third-section-card-wrap {
                            flex-wrap: wrap;
                        }

                        .third-section-card {
                            width: 31%;
                            padding: 24px;
                            max-width: unset;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .third-section-container {
                            padding: 56px 10px 30px 10px;
                        }

                        .third-section-card {
                            width: 30%;
                            padding: 24px;
                            max-width: 224px;
                        }

                        .third-more-wrap {
                            width: 95%;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .third-section-container {
                            padding: 24px 16px 24px 16px;
                        }

                        .third-section-container > h2 {
                            font-size: 20px;
                        }

                        .third-section-container > p {
                            margin-bottom: 2px;
                            font-size: 16px;
                        }

                        .third-section-card > h4 {
                            font-size: 16px;
                            margin: 4px 0 0 0;
                        }

                        .third-section-card > p {
                            display: none;
                        }

                        .third-section-card {
                            width: 45%;
                            padding: 0;
                            max-width: unset;
                            min-height: 118px;
                        }

                        .third-section-card-icon {
                            width: 60px;
                            height: 60px;
                        }

                        .third-more-wrap {
                            justify-content: center;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .third-section-container .yellow-red-line-container {
                        margin-bottom: 32px;
                    }

                    @media screen and (max-width: 1050px) {
                        .third-section-container .yellow-red-line-container {
                            margin-bottom: 32px;
                    }

                    @media screen and (max-width: 450px) {
                        .third-section-container .yellow-red-line-container {
                            margin-bottom: 10px;
                    }
                }
            `}
            </style>
        </div>
    );
};

export default ThirdSection;

ThirdSection.propTypes = {
    data: PropTypes.object,
};
