import React from 'react';
import YellowRedLine from './YellowRedLine';
import PropTypes from 'prop-types';
import ForthSectionCard from '../element/ForthSectionCard';
import { RightOutlined } from '@ant-design/icons';

const ForthSection = ({ data }) => {
    const toMore = () => {
        window.open(`${data.readMorePath}`);
    };

    return (
        <div className="forth-section-container">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
            <YellowRedLine />
            <div className="forth-section-card-wrap">
                {data.cardsData.map((item, idx) => (
                    <ForthSectionCard key={idx} data={item} />
                ))}
            </div>
            <div className="forth-more-wrap" onClick={toMore}>
                <p>{data.readMoreTitle}</p>
                <RightOutlined style={{ fontSize: '13px', color: '#3f5372', marginTop: '5px' }} />
            </div>
            <p></p>
            <style jsx>{`
                .forth-section-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 3% 10%;
                    width: 100%;
                    background-color: #f9fbff;
                }

                .forth-section-container > h2 {
                    margin-bottom: 5px;
                    font-size: 36px;
                    font-weight: 600;
                    letter-spacing: 0.9px;
                    text-align: center;
                    color: #0d1623;
                }

                .forth-section-container > p {
                    margin: 0 0 24px 0;
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #0d1623;
                }

                .forth-section-card-wrap {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 32px;
                }

                .forth-more-wrap {
                    display: flex;
                    width: 100%;
                    max-width: 1163px;
                    justify-content: flex-end;
                    margin-top: 16px;
                    cursor: pointer;
                }

                .forth-more-wrap > p {
                    margin: 0 8px 0 0;
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }

                @media screen and (max-width: 1050px) {
                    .forth-section-container {
                        padding: 56px 1% 30px 1%;
                    }

                    .forth-section-card-wrap {
                        flex-wrap: wrap;
                    }

                    .forth-more-wrap {
                        width: 90%;
                    }
                }

                @media screen and (max-width: 450px) {
                    .forth-section-container {
                        padding: 24px 1% 24px 1%;
                    }

                    .forth-section-container > h2 {
                        font-size: 20px;
                    }

                    .forth-section-container > p {
                        margin-bottom: 2px;
                        font-size: 16px;
                    }

                    .forth-section-card-wrap {
                        margin-top: 5px;
                    }

                    .forth-more-wrap {
                        justify-content: center;
                    }
                }
            `}</style>
            <style jsx global>
                {`
                    @media screen and (max-width: 1050px) {
                        .forth-section-card-wrap .forth-cards-card-wrap {
                            width: 47%;
                            max-height: unset;
                            margin: 10px;
                        }
                    }

                    @media screen and (max-width: 700px) {
                        .forth-section-card-wrap .forth-cards-card-wrap {
                            width: 45%;
                            max-height: unset;
                            margin: 10px;
                            padding: 3%;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .forth-section-card-wrap .forth-cards-card-wrap {
                            width: 93%;
                            max-height: unset;
                            margin: 8px auto;
                            padding: 24px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ForthSection;

ForthSection.propTypes = {
    data: PropTypes.object,
};
