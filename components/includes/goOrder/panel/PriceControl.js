import { Select, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import selectIcon from '../../../../resources/images/components/goOrder/arrow-chevron-down_black.png';
import { themeColor } from './PanelTabs';

const { Option } = Select;
const PriceControl = ({ title }) => {
    const bs = useSelector(store => store.goOrder.bs);
    return (
        <div className="price_control">
            <div className="select__box">
                {title === '限價' ? (
                    <Select value=" " suffixIcon={<img src={selectIcon} />}>
                        <Option value=" ">限價</Option>
                        <Option value="4">市價</Option>
                        <Option value="2">漲停</Option>
                        <Option value="3">跌停</Option>
                        <Option value="1">平盤</Option>
                    </Select>
                ) : (
                    <div className="select__label">{title}</div>
                )}
            </div>
            <div className="input__box">
                <Input />
            </div>
            <div className="btn__box">
                <Button>-</Button>
                <Button style={{ marginLeft: '8px' }}>+</Button>
            </div>
            <style jsx>{``}</style>
            <style global jsx>{`
                .select__label {
                    width: 62px;
                    font-size: 1.6rem;
                    color: #0d1623;
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
                    width: calc(100vw - 32px - 100px - 54px - 8px);
                    /* width: calc(100vw - 160px); */
                }
                .btn__box {
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
                    background: ${bs == 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    color: white;
                    width: 46px;
                    font-size: 3.6rem;
                    line-height: 0;
                }
                .btn__box {
                    display: inline-block;
                }
                .btn__box .ant-btn {
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
                    font-size: 2.6rem;
                    color: black;
                }
                .price_control .ant-input:hover {
                    border-color: #dedede;
                }
            `}</style>
        </div>
    );
};

export default PriceControl;
