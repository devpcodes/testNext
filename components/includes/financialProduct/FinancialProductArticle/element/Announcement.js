import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Announcement = ({ data }) => {
    // console.log('dd', data);
    return (
        <>
            <div className="announcement_section">
                {data &&
                    data.map(item => {
                        return (
                            <div key={item.articleGUID} className="announcement_block">
                                <Link href={`/AnnouncementPage/?GUID=${item.articleGUID}`}>
                                    <a>{item.title}</a>
                                </Link>
                                <p className="announcement-date">{item.postTime}</p>
                            </div>
                        );
                    })}
            </div>
            <style jsx>{`
                .announcement_section {
                    padding: 32px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    margin-bottom: 16px;
                }
            `}</style>

            <style jsx global>{`
                .announcement_block {
                    width: 100%;
                    padding-bottom: 15px;
                    font-family: PingFangTC;
                    font-size: 16px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    cursor: pointer;
                }

                .announcement_block > a {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .announcement_block a:hover {
                    color: #daa360;
                }

                .announcement_block:nth-child(2) {
                    padding: 15px 0 15px;
                    border-top: solid 1px #d7e0ef;
                    border-bottom: solid 1px #d7e0ef;
                }

                .announcement_block:nth-child(3) {
                    padding-top: 15px;
                    padding-bottom: 0;
                }

                .announcement-date {
                    margin-bottom: 0;
                    font-size: 14px;
                    color: #3f5372;
                }
            `}</style>
        </>
    );
};

export default Announcement;

Announcement.propTypes = {
    data: PropTypes.array,
};
