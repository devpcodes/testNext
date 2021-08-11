import { Select } from 'antd';
import selectIcon from '../../../../../resources/images/components/goOrder/arrow-selectdown.png';
const { Option } = Select;
const OrderSelect = ({ data, width, height, color, style, arrowLeft, ...props }) => {
    return (
        <>
            <div className="select__container" style={style}>
                <Select suffixIcon={<img src={selectIcon} />} {...props}>
                    {data.length >= 0 &&
                        data.map((item, index) => {
                            return (
                                <Option key={index} value={item.val}>
                                    {item.txt}
                                </Option>
                            );
                        })}
                </Select>
            </div>
            <style jsx>{`
                .select__container {
                    display: inline-block;
                }
            `}</style>
            <style global jsx>{`
                .select__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    width: ${width};
                    height: ${height};
                    background: ${color};
                    border: none;
                }

                .select__container .ant-select-single .ant-select-selector .ant-select-selection-item,
                .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: ${height};
                    color: #ffffff;
                    letter-spacing: 1px;
                    font-size: 1.6rem;
                    /* text-align: center; */
                }
                .select__container .ant-select-arrow {
                    top: 38%;
                    right: 11px;
                }
                .select__container .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
                .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
                    padding-right: 0;
                }
                .select__container
                    .ant-select.ant-select-single.ant-select-show-arrow.ant-select-disabled
                    .ant-select-selector {
                    background: #d2d2d2;
                }
                .select__container .ant-select-arrow img {
                    margin-left: ${arrowLeft || 0};
                }
            `}</style>
        </>
    );
};

export default OrderSelect;
