import { useCallback, useState, useEffect, memo } from 'react';
import { Button, Select } from 'antd';
import { useSelector } from 'react-redux';
import info from '../../../resources/images/pages/subscription/ic-info.svg';
import Link from 'next/link';
import AccountSelect from './AccountSelect';

const SubscriptionHeader = memo(({ onSelect }) => {
    console.log(onSelect);
    const { Option } = Select;
    const accounts = useSelector(store => store.user.accounts);
    const idno = useSelector(store => store.user.currentAccount.idno);
    const [activeAccount, setActiveAccount] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    let subscriptionAccount = [];
    let value = '';

    if (accounts) {
        let isFirstOptions = true;
        accounts.map((accountData, accountIndex) => {
            if (accountData.accttype === 'S' && accountData.idno === idno) {
                subscriptionAccount.push(accountData);
                console.log(accountData);
                if (isFirstOptions) {
                    value = `${accountData.broker_id}-${accountData.account}`;
                }
                isFirstOptions = false;
            }
        });
    }

    useEffect(() => {
        selectHandler(value);
        onSelect(value);
    }, [value]);

    const selectHandler = val => {
        setSelectedValue(val);
        onSelect(val);
    };

    return (
        <>
            <div className="subscription__header">
                <div className="subscription__title">
                    <h2>申購專區</h2>
                </div>
                <div>
                    <div className="subscription__toolbar">
                        <div className="subscription__toolbar__left">
                            <Link href={'/'}>
                                <a className="nav__items">新股申購</a>
                            </Link>
                        </div>
                        <div className="subscription__toolbar__right">
                            <Select style={{ width: 300 }} value={selectedValue} onSelect={selectHandler}>
                                {!!subscriptionAccount &&
                                    subscriptionAccount.map((accountData, accountIndex) => {
                                        return (
                                            <Option
                                                key={accountData.datacount}
                                                value={`${accountData.broker_id}-${accountData.account}`}
                                            >{`${accountData.broker_id}-${accountData.account}`}</Option>
                                        );
                                    })}
                            </Select>

                            <Button className="subscription__description__btn">
                                <img src={info} /> 申購說明
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .subscription__title > h2 {
                    display: inline-block;
                    font-size: 2.6rem;
                    font-weight: bold;
                    margin: 0 28px 0 0;
                    padding: 0;
                }
                .subscription__toolbar {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .subscription__toolbar__left {
                    display: flex;
                }
                .nav__items {
                    width: 116px;
                    height: 40px;
                    background-color: #d7e0ef;
                    color: #3f5372;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.6rem;
                    border-radius: 20px;
                }
                .nav__items .active {
                    background-color: #0d1623;
                    color: #fff;
                }
            `}</style>
            <style jsx global>{`
                .subscription__description__btn {
                    border: solid 1px #d7e0ef;
                    width: 121px;
                    height: 40px;
                    color: #0d1623;
                    font-size: 16px;
                }
                .subscription__description__btn:hover,
                .subscription__description__btn:focus {
                    border: solid 1px #d7e0ef;
                    color: #0d1623;
                }
            `}</style>
        </>
    );
});

export default SubscriptionHeader;
