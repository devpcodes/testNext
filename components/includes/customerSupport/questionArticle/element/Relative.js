import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Relative = ({ data }) => {
    return (
        <>
            <div className="relative_section">
                {data &&
                    data.map(item => {
                        return (
                            <div key={item.uuid} className="relative_block">
                                <Link href={`/customer-support/question/${item.uuid}`}>
                                    <a>{item.title}</a>
                                </Link>
                            </div>
                        );
                    })}
            </div>
            <style jsx>{`
                .relative_section {
                    padding: 32px 31px 34px 32px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    margin-bottom: 16px;
                }
            `}</style>

            <style jsx global>{`
                .relative_block {
                    width: 100%;
                    padding-bottom: 15px;
                    // font-family: PingFangTC;
                    font-size: 16px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    cursor: pointer;
                }

                .relative_block > a {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    font-size: 16px;
                    font-weight: 500;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    color: #0d1623;
                }

                .relative_block a:hover {
                    color: #daa360;
                }

                .relative_block:nth-child(2) {
                    padding: 15px 0 15px;
                    border-top: solid 1px #d7e0ef;
                    border-bottom: solid 1px #d7e0ef;
                }

                .relative_block:nth-child(3) {
                    padding-top: 15px;
                    padding-bottom: 0;
                }
            `}</style>
        </>
    );
};

export default Relative;

Relative.propTypes = {
    data: PropTypes.array,
};
