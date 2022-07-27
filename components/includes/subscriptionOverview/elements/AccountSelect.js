import { Select } from 'antd';
import icon from '../../../../resources/images/components/subscriptionOverview/arrow-chevron-down-copy (2).svg';

const AccountSelect = ({ data, accText, onClick, ...props }) => {
    const { Option, OptGroup } = Select;
    return (
        <div className="sino__select" onClick={onClick}>
            <Select suffixIcon={<img className="select__icon" src={icon} />} {...props}>
                {data?.map(item => {
                    return (
                        <Option value={item} key={`${item}`}>
                            <span className="option__accType">{accText} | </span>
                            <span className="option__account">{item}</span>
                        </Option>
                    );
                })}
            </Select>
            <style jsx>{`
                .sino__select {
                    width: 100%;
                }
                .sino__select .option__accType {
                    color: #daa360;
                }
                .sino__select .option__account {
                    color: #0d1623;
                }
                .sino__select .select__icon {
                    display: inline-block;
                    margin-top: -3px;
                }
            `}</style>
            <style global jsx>{`
                .sino__select .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    height: 40px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .sino__select .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                    line-height: 40px;
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
};

export default AccountSelect;
