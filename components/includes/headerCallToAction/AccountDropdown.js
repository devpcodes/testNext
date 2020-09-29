import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { accountGroupByType } from '../../../services/components/layouts/accountGroupByType';
import { setCurrentAccount } from '../../../actions/user/action';

import theme from '../../../resources/styles/theme';

export const AccountDropdown = () => {
    const { Option, OptGroup } = Select;
    const dispatch = useDispatch();
    const accounts = useSelector((store) => store.user.accounts);
    const currentAccount = useSelector((store) => store.user.currentAccount);

    const groupedAccount = accountGroupByType(accounts);
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
                return '其他';
        }
    };

    const handleChange = (value) => {
        const selectedAccount = accounts.find((account) => `${account.broker_id}-${account.account}` === value);
        console.log(`selectedAccount: ${selectedAccount}`);
        dispatch(setCurrentAccount(selectedAccount));
    };

    if (!accounts.length || (groupedAccountTypes.length === 0 && groupedAccount.constructor === Object)) return null;

    return (
        <div className="account__container">
            <Select
                className="account__select"
                defaultValue={`${currentAccount.broker_id}-${currentAccount.account}`}
                style={{ width: 243 }}
                onChange={handleChange}
            >
                {groupedAccountTypes.map((accType, index) => {
                    const accText = getAccountText(accType);
                    const accountsPerGroup = groupedAccount[accType];

                    return (
                        accountsPerGroup.length && (
                            <OptGroup label={<span className="optGroup__accType">{accText}</span>} key={index}>
                                {accountsPerGroup.map((account) => (
                                    <Option
                                        value={`${account.broker_id}-${account.account}`}
                                        key={`${account.broker_id}-${account.account}`}
                                    >
                                        <span className="option__accType">{accText} | </span>
                                        <span className="option__account">{`${account.broker_id}-${account.account}`}</span>
                                        <span className="option__username">經紀部 {account.username}</span>
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
                    font-size: 1.6rem;
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
                .option__account {
                    display: none;
                }
                .optGroup__accType,
                .option__accType,
                .option__account,
                .option__username {
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
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
                .ant-select-item-option-content .option__accType {
                    display: none;
                }
                .ant-select-item-option-content .option__account {
                    display: block;
                }
                .ant-select-item.ant-select-item-group .optGroup__accType {
                    color: ${theme.colors.secondary};
                }
                .ant-select-item.ant-select-item-group,
                .ant-select-item.ant-select-item-option.ant-select-item-option-grouped {
                    padding-left: 20px;
                }
                ant-select-dropdown ant-select-dropdown-placement-bottomLeft  slide-up-leave slide-up-leave-active slide-up ant-select-dropdown-hidden
            `}</style>
        </div>
    );
};
