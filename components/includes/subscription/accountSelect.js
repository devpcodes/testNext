import { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { useSelector } from 'react-redux';
//  value=
const AccountSelect = ({ accounts, value }) => {
    return (
        <Select style={{ width: 400 }} value={value}>
            {!!accounts &&
                accounts.map((accountData, accountIndex) => {
                    return (
                        <Option
                            key={accountData.datacount}
                            value={`${accountData.broker_id}-${accountData.account}`}
                        >{`${accountData.broker_id}-${accountData.account}`}</Option>
                    );
                })}
        </Select>
    );
};

export default React.memo(AccountSelect);
