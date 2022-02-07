import React from 'react';
import PropTypes from 'prop-types';

const ForthSectionCard = ({ data }) => {
    return (
        <>
            <div className="forth-cards-card-wrap">
                <div className="forth-card-image" style={{ backgroundImage: `url(${data.image})` }} />
                <h4>{data.title}</h4>
                <div className="yellow-line" />
                <p className="forth-card-info">
                    {data.time} | {data.writer}
                </p>
            </div>
            <style jsx>
                {`
                    .forth-cards-card-wrap {
                        position: relative;
                        // width: 277px;
                        // max-height: 286px;
                        height: fit-content;
                        padding: 2%;
                        margin: 0 0.625vw;
                        border: solid 1px #e6ebf5;
                        background: white;
                        bottom: 0;
                        transition: bottom 0.5s;
                    }

                    .forth-cards-card-wrap:hover {
                        position: relative;
                        bottom: 1rem;
                        cursor: pointer;
                    }

                    .forth-card-image {
                        width: 100%;
                        padding-top: 50%;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }

                    h4 {
                        margin-top: 12px;
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 1.44;
                        color: #0d1623;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    .yellow-line {
                        width: 26px;
                        height: 3px;
                        margin: 16px 38px 10px 0;
                        background-color: #daa360;
                    }

                    .forth-card-info {
                        margin: 10px 6px 0 0;
                        font-size: 12px;
                        font-weight: 500;
                        color: #6c7b94;
                    }

                    @media screen and (max-width: 1050px) {
                        .forth-cards-card-wrap {
                            width: calc(50% - 0.625vw * 2);
                            margin-bottom: 16px;
                            // max-width: 344px;
                            // max-height: 313px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ForthSectionCard;

ForthSectionCard.propTypes = {
    data: PropTypes.object,
};
