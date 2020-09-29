import { Select } from 'antd';
import { useSelector } from 'react-redux';

import theme from '../../../resources/styles/theme';

export const AccountDropdown = () => {
    const { Option, OptGroup } = Select;
    const accounts = useSelector((store) => store.user.accounts);

    const accountGroupBy = (objectArray, property) => {
        return objectArray.reduce(
            function (acc, obj) {
                let key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            },
            { S: [], H: [], F: [] }
        );
    };

    const groupedAccount = accountGroupBy(accounts, 'accttype');

    const groupedAccountTypes = Object.keys(groupedAccount);

    const getAccountText = (accType) => {
        switch (accType) {
            case 'S':
                return '國內證券';
            case 'H':
                return '國外證券';
            case 'F':
                return '期權';
            default:
                return '';
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    if (!accounts.length || (groupedAccountTypes.length === 0 && groupedAccount.constructor === Object)) return null;

    return (
        <div className="account__container">
            <Select
                className="account__select"
                defaultValue={accounts[0].datacount.toString()}
                style={{ width: 243 }}
                onChange={handleChange}
            >
                {groupedAccountTypes.map((accType, index) => {
                    const accText = getAccountText(accType);
                    const accountsPerGroup = groupedAccount[accType];

                    return (
                        accountsPerGroup.length && (
                            <OptGroup label={accText} key={index}>
                                {accountsPerGroup.map((account) => (
                                    <Option value={account.datacount.toString()} key={account.datacount.toString()}>
                                        <span className="option__accType">{accText} | </span>
                                        <span className="option__account">{account.username}</span>
                                    </Option>
                                ))}
                            </OptGroup>
                        )
                    );
                })}
            </Select>
            <style jsx>{`
                .account__container {
                    position: relative;
                }
                .account__container :global(.ant-select-selector) {
                    border: 0;
                    border-bottom: solid 1px #e6ebf5;
                    height: 36px;
                    padding: 0 11px 0 0;
                    font-size: 16px;
                    font-weight: 600;
                }
                .account__container :global(.ant-select-arrow) {
                    display: none;
                }
                .account__select:after {
                    content: '123';
                    width: 9px;
                    height: 6.4px;
                    transform: rotate(-180deg);
                    background-color: #c43826;
                }
                .option__accType {
                    color: ${theme.colors.secondary};
                }
            `}</style>
            <style jsx global>{`
                .account__container .account__select:after {
                    content: '';
                    position: absolute;
                    top: 9px;
                    right: 12px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 7px 4.5px 0 4.5px;
                    border-color: #c43826 transparent transparent transparent;
                }
                .account__container .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
                    border-color: transparent;
                }
                .account__container .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border-bottom: 1px solid #e6ebf5;
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
};
