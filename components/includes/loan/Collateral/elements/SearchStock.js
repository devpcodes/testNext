import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchAutoComplete from '../../../tradingAccount/vipInventory/SearchAutoComplete';
import SinoBtn from './SinoBtn';
const SearchStock = ({ btnName }) => {
    const [selected, setSelected] = useState('');
    const [width, setWidth] = useState('237px');
    const winWidth = useSelector(store => store.layout.winWidth);
    useEffect(() => {
        if (winWidth > 920) {
            setWidth('237px');
        }
        if (winWidth <= 920) {
            setWidth('204px');
        }
        if (winWidth <= 570) {
            setWidth('170px');
        }
        if (winWidth <= 530) {
            setWidth('100%');
        }
    }, [winWidth]);
    const selectedHandler = bool => {
        if (!bool) {
            setSelected(bool);
        }
    };
    const onChangeHandler = searVal => {
        // setVal(searVal);
    };
    const selectHandler = (val, options) => {
        console.log('val', val);
        setSelected(val !== '');
    };
    return (
        <div className="search__container">
            <SearchAutoComplete
                width={width}
                height="40px"
                selectedHandler={selectedHandler}
                onChange={onChangeHandler}
                selectHandler={selectHandler}
            />
            <SinoBtn
                parentClass={'search__container'}
                disabled={!selected}
                text={btnName}
                style={{
                    border: 'none',
                    outline: 'none',
                    width: '122px',
                    height: '40px',
                    fontSize: '16px',
                    padding: winWidth <= 920 ? 0 : '9px 19px 9px 20px',
                    borderRadius: '0 2px 2px 0px',
                    backgroundColor: !selected ? 'rgb(230, 235, 245)' : '#c43826',
                    color: !selected ? 'color: rgb(169, 182, 203)' : 'white',
                    verticalAlign: 'top',
                }}
            />
            <style jsx>{`
                .search__container {
                    display: inline-block;
                }
                button {
                    margin: 0;
                    padding: 0;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    width: 122px;
                    height: 40px;
                    font-size: 16px;
                    padding: 9px 19px 9px 20px;
                    border-radius: 0 2px 2px 0px;
                    background-color: #c43826;
                    color: white;
                    vertical-align: top;
                }
                @media (max-width: 920px) {
                    .search__container {
                        display: flex;
                        padding-left: 16px;
                        padding-right: 0;
                    }
                }
                @media (max-width: 530px) {
                    .search__container {
                        padding-right: 16px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .autoComplete__container {
                    display: inline-block;
                }
                .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: 41px;
                    color: #3f5372;
                    font-size: 16px;
                    opacity: 1;
                }
                .search__container .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: 41px;
                    color: #3f5372;
                }
                .autoComplete__container .ant-select-selector {
                    height: 40px !important;
                    line-height: 40px !important;
                }

                .buyBtn.ant-btn[disabled],
                .ant-btn[disabled]:active,
                .ant-btn[disabled]:focus,
                .ant-btn[disabled]:hover {
                    background: #b7b7b7 !important;
                }
                @media (max-width: 450px) {
                    .autoComplete__container {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchStock;
