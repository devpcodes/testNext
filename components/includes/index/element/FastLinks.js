import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const FastLinks = ({ data }) => {
    // console.log('data', data);
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
                                onClick={() => {
                                    toLink(item.site, item.target, item.link);
                                }}
                            >
                                <div className="fast-link-icon" style={{ backgroundImage: `url(${item.icon})` }} />
                                <div className="fast-link-texts">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className="short-grey-line" />
                            </div>
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

                    .fast-link-item > div {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        max-width: 320px;
                        min-height: 56px;
                        margin-left: 7%;
                        cursor: pointer;
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
                        font-weight: 500;
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

                    .short-grey-line {
                        width: 1px;
                        border: 0.5px solid #e6ebf5;
                        height: 56px;
                    }

                    .fast-link-item:last-of-type .short-grey-line {
                        display: none;
                    }

                    @media screen and (max-width: 840px) {
                        .fast-link-item > div {
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            height: 207px;
                            // padding: 2% 3%;
                        }

                        .short-grey-line {
                            display: none;
                        }

                        h3 {
                            text-align: center;
                        }

                        p {
                            text-align: center;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .fast-link-container {
                            overflow-x: scroll;
                        }

                        .fast-link-item > div {
                            height: 134px;
                            padding: 24px 27px;
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
                    }
                `}
            </style>
            {/* <style jsx global>
        {`
      
      `}
      </style> */}
        </>
    );
};

export default FastLinks;

FastLinks.propTypes = {
    data: PropTypes.array,
};
