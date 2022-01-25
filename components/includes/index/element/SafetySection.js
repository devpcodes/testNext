import React from 'react';
import PropTypes from 'prop-types';
import YellowRedLine from './YellowRedLine';

const SafetySection = ({ data }) => {
    return (
        <div className="safety-section-container">
            <div className="safety-dark-bg" />
            <div className="safety-section-info">
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
                <YellowRedLine />
                <div className="safety-section-card-wrap">
                    {data.cardsData.map((item, idx) => (
                        <div className="safety-section-card" key={idx}>
                            <div className="third-section-card-icon" style={{ backgroundImage: `url(${item.icon})` }} />
                            <div className="safety-hr-line" />
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>
                {`
                    .safety-section-container {
                        position: relative;
                        width: 100%;
                        height: 560px;
                        background-color: #f9fbff;
                    }

                    .safety-section-info {
                        position: absolute;
                        top: 0;
                        z-index: 1;
                        width: 100%;
                    }

                    .safety-dark-bg {
                        top: 0;
                        width: 100%;
                        height: 439px;
                        background-color: #0d1623;
                    }

                    h2 {
                        margin: 56px 0 0 8px;
                        font-size: 36px;
                        font-weight: 600;
                        letter-spacing: 0.9px;
                        color: #fff;
                        text-align: center;
                    }

                    .safety-section-info > p {
                        margin: 8px 60px 10px 59px;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #fff;
                        text-align: center;
                    }

                    .safety-section-card-wrap {
                        position: absolute;
                        display: flex;
                        width: calc(80% + 1vw * 2);
                        padding: 0 1.5rem;
                        justify-content: center;
                        top: 200px;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .safety-section-card {
                        // width: 368px;
                        // max-width: 368px;
                        min-height: 292px;
                        margin: 0 1vw;
                        padding: 32px;
                        background-color: #e6ebf5;
                    }

                    .third-section-card-icon {
                        width: 60px;
                        height: 60px;
                    }

                    .safety-hr-line {
                        width: 100%;
                        height: 2px;
                        margin: 32px 0;
                        background-color: #a9b6cb;
                    }

                    .safety-section-card > h4 {
                        margin: 0 0 8px 0;
                        font-size: 20px;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        color: #0d1623;
                    }

                    .safety-section-card > p {
                        margin: 0;
                        font-size: 16px;
                        font-weight: normal;
                        letter-spacing: 0.4px;
                        color: #0d1623;
                    }

                    @media screen and (max-width: 1250px) {
                        .safety-section-card-wrap {
                            width: calc(90% + 1vw * 2);
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        .safety-section-card-wrap {
                            width: calc(100% + 1vw * 2);
                            padding: 0 3rem;
                        }
                    }

                    @media screen and (max-width: 840px) {
                        .safety-dark-bg {
                            height: 80%;
                        }

                        .safety-section-card {
                            padding: 20px;
                        }
                    }

                    @media screen and (max-width: 664px) {
                        .safety-section-card > p {
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 6;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .safety-dark-bg {
                            height: 320px;
                        }

                        h2 {
                            font-size: 20px;
                            margin: 24px 0 8px 0;
                        }

                        .safety-section-card-wrap {
                            flex-wrap: wrap;
                            top: 130px;
                            padding: 0 24px;
                        }

                        .safety-section-card {
                            // width: 90%;
                            max-width: unset;
                            margin: 8px 0;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .safety-section-info > .yellow-red-line-container {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-28px);
                    }
                `}
            </style>
        </div>
    );
};

export default SafetySection;

SafetySection.propTypes = {
    data: PropTypes.object,
};
