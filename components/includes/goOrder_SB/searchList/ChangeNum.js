import { Input, Button } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { themeColor } from '../panel/PanelTabs';
import infoIcon from '../../../../resources/images/components/goOrder/attention-info-circle.svg';
const ChangeNum = ({
    title,
    val,
    plusClickHandler,
    minusClickHandler,
    changeHandler,
    disabledPlus,
    inputWidth,
    color,
    fontSize,
    conditionText,
    textAlign,
    style,
    showIcon,
    iconClickHandler,
}) => {
    const valChangeHandler = e => {
        console.log(e.target.value);
        changeHandler(e.target.value);
    };
    return (
        <div className="price_control" style={style}>
            <div className="select__box">
                <div className="select__label">
                    {title}
                    {showIcon && <img className="info__icon" src={infoIcon} onClick={iconClickHandler} />}
                </div>
            </div>
            <div className="input__box">
                <Input
                    value={val}
                    onChange={valChangeHandler}
                    // onFocus={focusHandler}
                />
                {conditionText && <span className="condition__text">{conditionText}</span>}
            </div>
            <div className="btn__box-modal">
                <Button onClick={minusClickHandler}>-</Button>
                <Button onClick={plusClickHandler} style={{ marginLeft: '8px' }} disabled={disabledPlus}>
                    +
                </Button>
            </div>
            <style jsx>{``}</style>
            <style global jsx>{`
                .select__label {
                    width: ${showIcon ? '70px' : '62px'};
                    font-size: 1.6rem;
                    color: #0d1623;
                    margin-top: 4px;
                }
                .price_control {
                    margin-top: 8px;
                    height: 46px;
                }
                .select__box {
                    display: inline-block;
                    height: 46px;
                    vertical-align: top;
                    padding-top: 7px;
                }
                .input__box {
                    display: inline-block;
                    width: ${inputWidth == null ? 'calc(100vw - 32px - 100px - 54px - 8px)' : inputWidth};
                    position: relative;
                    /* width: calc(100vw - 160px); */
                }
                .condition__text {
                    position: absolute;
                    left: 7px;
                    font-size: 21px;
                    font-weight: bold;
                    top: 6px;
                }
                .btn__box-modal {
                    width: 100px;
                    text-align: right;
                    vertical-align: top;
                }
                .price_control .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    /* width: calc((100vw - 100px) / 4); */
                    height: 40px;
                    background: white;
                    border: none;
                    padding: 0;
                }
                .price_control .ant-select {
                    margin-right: 8px;
                    width: 54px;
                }
                .price_control .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .price_control
                    .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector {
                    box-shadow: none;
                }
                .price_control .ant-input:placeholder-shown {
                    height: 45px;
                    /* width: 80%; */
                }
                .price_control .ant-select-arrow {
                    top: 24%;
                    right: 7px;
                }
                .price_control .ant-btn {
                    display: inline-block;
                    height: 46px;
                    border: none;
                    background: ${color == null ? '#254a91' : color};
                    color: white;
                    width: 46px;
                    font-size: 3.6rem;
                    line-height: 0;
                }
                .btn__box-modal {
                    display: inline-block;
                }
                .btn__box-modal .ant-btn {
                    display: inline-block;
                }
                .price_control .ant-btn > span {
                    margin-left: -2px;
                }
                .price_control .ant-input-focused,
                .ant-input:focus {
                    box-shadow: none;
                }
                .price_control .ant-input {
                    height: 46px;
                    font-size: ${fontSize == null ? '2.6rem' : fontSize};
                    color: black;
                    text-align: ${textAlign || 'left'};
                }
                .price_control .ant-input:hover {
                    border-color: #dedede;
                }

                .price_control .ant-btn[disabled] {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
                .price_control .ant-btn[disabled],
                .ant-btn[disabled]:active {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
                .price_control .ant-btn[disabled],
                .ant-btn[disabled]:active,
                .ant-btn[disabled]:focus,
                .ant-btn[disabled]:hover {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
                .info__icon {
                    margin-top: -3px;
                    margin-left: 2px;
                }
            `}</style>
        </div>
    );
};

export default ChangeNum;
