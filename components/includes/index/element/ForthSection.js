import React from 'react';
import YellowRedLine from './YellowRedLine';
import PropTypes from 'prop-types';
import ForthSectionCard from '../element/ForthSectionCard';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const ForthSection = ({ data }) => {
    const router = useRouter();
    const toMore = () => {
        window.open(`${data.readMorePath}`);
    };

    const cardClickHandler = id => {
        router.push({
            pathname: `/RichClub_News_Article/`,
            query: { newsId: id },
        });
    };

    return (
        <div className="forth-section-container">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
            <YellowRedLine />
            <div className="forth-section-card-wrap">
                {data.cardsData.map((item, idx) => (
                    <ForthSectionCard key={idx} data={item} onClick={cardClickHandler.bind(null, item?._id)} />
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
                    padding: 3% 1.5rem;
                    width: 80%;
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                    background-color: #f9fbff;
                    margin: 0 auto;
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
                    width: calc(100% + 0.625vw * 2);
                    display: flex;
                    justify-content: center;
                    margin-top: 32px;
                }

                .forth-more-wrap {
                    display: flex;
                    width: 100%;
                    // max-width: 1163px;
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

                @media screen and (max-width: 1250px) {
                    .forth-section-container {
                        width: 90%;
                    }
                }

                @media screen and (max-width: 1050px) {
                    .forth-section-card-wrap {
                        width: calc(100% + 8px * 2);
                        flex-wrap: wrap;
                    }

                    .forth-more-wrap {
                        margin-top: 0;
                        width: calc(100% - 0.625vw * 2);
                    }
                }

                @media screen and (max-width: 1024px) {
                    .forth-section-container {
                        width: 100%;
                        padding: 56px 3rem 30px;
                    }
                }

                @media screen and (max-width: 768px) {
                    .forth-section-card-wrap {
                        width: calc(100% + 10px * 2);
                    }
                }

                @media screen and (max-width: 450px) {
                    .forth-section-container {
                        width: 100%;
                        padding: 24px 16px 24px;
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
                            width: calc(50% - 8px * 2);
                            margin-bottom: 16px;
                            margin-left: 8px;
                            margin-right: 8px;
                            padding: 24px;
                            // max-width: 344px;
                            // max-height: 313px;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .forth-section-card-wrap .forth-cards-card-wrap {
                            width: calc(50% - 8px * 2);
                            max-height: unset;
                            margin: 8px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .forth-section-card-wrap .forth-cards-card-wrap {
                            width: 93%;
                            max-height: unset;
                            margin: 8px 0;
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
