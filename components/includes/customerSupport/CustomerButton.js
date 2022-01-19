import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CustomerButton = ({ onClick, children, type, ...props }) => {
    let typeStyle;
    let disabled = false;

    switch (type) {
        case 'default':
            typeStyle = 'default';
            break;
        case 'primary':
            typeStyle = 'primary';
            break;
        case 'disable':
            typeStyle = 'default';
            disabled = true;
            break;
        case 'text':
            typeStyle = 'text';
            break;
        case 'link':
            typeStyle = 'link';
            break;
        default:
            typeStyle = 'default';
    }

    return (
        <>
            <Button onClick={onClick} className={`customer-button ${typeStyle}`} disabled={disabled} {...props}>
                {children}
            </Button>
            <style jsx global>{`
                .customer-button {
                    height: 40px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #0d1623;
                }

                .primary {
                    background-color: #c43826;
                    color: #fff;
                    border-color: #c43826;
                }

                .primary:hover {
                    background-color: #ea6554;
                    color: #fff;
                    border-color: #ea6554;
                }

                .primary:focus {
                    background-color: #c43826;
                    color: #fff;
                    border-color: #c43826;
                }

                .default {
                    background-color: #ffffff;
                    color: #0d1623;
                    border-color: #e6ebf5;
                }

                .default:hover {
                    background-color: #f3f6fe;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                .default:focus {
                    background-color: #d7e0ef;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                .text {
                    background-color: #ffffff;
                    color: #0d1623;
                    border: 0;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }

                .text:hover {
                    background-color: #d7e0ef;
                    color: #0d1623;
                    border-color: #d7e0ef;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }

                .text:focus {
                    background-color: #d7e0ef;
                    color: #0d1623;
                    border-color: #d7e0ef;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }

                .link {
                    background-color: #ffffff;
                    color: #daa360;
                    border: 0;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }

                .link:hover {
                    background-color: #d7e0ef;
                    color: #dfbc91;
                    border-color: #d7e0ef;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }

                .link:focus {
                    background-color: #d7e0ef;
                    color: #dfbc91;
                    border-color: #d7e0ef;
                    box-shadow: 0 0 rgba(0 0 0 0);
                }
            `}</style>
        </>
    );
};

CustomerButton.propTypes = {
    // onClick: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.any,
    // children: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default CustomerButton;
