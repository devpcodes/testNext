import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

const SearchInput = ({ className, placeholder, enterButton, onSearch, size, ...props }) => {
    return (
        <>
            <Search
                className={`input_search ${className || ''}`}
                placeholder={placeholder}
                allowClear
                enterButton={enterButton}
                size={size || 'large'}
                onSearch={onSearch}
                {...props}
            />
            <style jsx global>
                {`
                    .input_search {
                        width: 100%;
                    }

                    .input_search > .ant-input {
                        // font-family: PingFangSC;
                        font-size: 16px !important;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #3f5372 !important;
                    }

                    .ant-input-affix-wrapper-focused,
                    .ant-input-affix-wrapper:focus,
                    .ant-input-affix-wrapper:hover {
                        border-color: none;
                        box-shadow: none;
                    }

                    @media screen and (max-width: 450px) {
                        .input_search {
                            width: inherit !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

SearchInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    enterButton: PropTypes.string,
    size: PropTypes.string,
};

export default SearchInput;
