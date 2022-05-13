import { Select } from 'antd';
const SinoSelect = ({ data, ...props }) => {
    const { Option } = Select;
    return (
        <>
            <Select {...props} className="sino__select">
                {data.map((item, index) => {
                    return (
                        <Option key={index} value={item.value}>
                            {item.text}
                        </Option>
                    );
                })}
            </Select>
            <style global jsx>{`
                .sino__select .ant-select-arrow {
                    color: rgba(0, 0, 0, 1);
                    margin-top: -8px;
                }
                .sino__select.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border: none;
                }
            `}</style>
        </>
    );
};

export default SinoSelect;
