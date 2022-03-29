import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const FastLinks = ({ data }) => {
    const router = useRouter();

    const toLink = (site, target, link) => {
        if (site === 'outer') {
            window.open(link, target);
        } else if (site === 'inner') {
            router.push(`${link}`);
        }
    };

    return (
        <>
            <div className="fast-link-container">
                {data &&
                    data.map((item, idx) => (
                        <div className="fast-link-item" key={idx}>
                            <div
                                className="fast-link-main"
                                onClick={() => {
                                    toLink(item.site, item.target, item.link);
                                }}
                            >
                                <div className="fast-link-icon" style={{ backgroundImage: `url(${item.icon})` }} />
                                <div className="fast-link-texts">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <div className="short-grey-line" />
                        </div>
                    ))}
            </div>
            <style jsx>
                {`
                    .fast-link-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        min-height: 120px;
                        background-color: white;
                    }

                    .fast-link-icon {
                        width: 68px;
                        height: 68px;
                        margin-right: 12px;
                        background-size: cover;
                        background-position: center;
                    }

                    .fast-link-main {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 20vw;
                        padding-left: 10%;
                        // max-width: 320px;
                        height: auto;
                        min-height: 56px;
                        margin-left: 7%;
                        cursor: pointer;
                        border-right: 0.5px solid #e6ebf5;
                    }

                    .fast-link-texts {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 80%;
                    }

                    h3 {
                        margin: 0;
                        font-size: 20px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        color: #0d1623;
                        white-space: nowrap;
                    }

                    p {
                        margin: 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    .fast-link-item:last-of-type .short-grey-line {
                        display: none;
                    }

                    @media screen and (max-width: 840px) {
                        .fast-link-item {
                            display: flex;
                            align-items: center;
                        }

                        .fast-link-main {
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            padding-left: 0;
                            height: 207px;
                            border-right: none;
                        }

                        h3 {
                            text-align: center;
                        }

                        p {
                            text-align: center;
                        }

                        .short-grey-line {
                            display: inline;
                            width: 1px;
                            border: 0.5px solid #e6ebf5;
                            height: 56px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .fast-link-container {
                            overflow-x: scroll;
                            justify-content: flex-start;
                        }

                        .fast-link-main {
                            width: auto;
                            min-width: 20vw;
                            height: 134px;
                            padding: 24px 27px;
                            margin: 0;
                        }

                        .fast-link-icon {
                            margin: 0 auto;
                        }

                        h3 {
                            font-size: 16px;
                        }

                        p {
                            display: none;
                        }

                        .fast-link-item > .short-grey-line {
                            padding: 0;
                            height: 56px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default FastLinks;

FastLinks.propTypes = {
    data: PropTypes.array,
};
