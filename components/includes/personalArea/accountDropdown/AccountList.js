import PropTypes from 'prop-types';

import { AccountAvatar } from '../../AccountAvatar';

import theme from '../../../../resources/styles/theme';

export const AccountList = ({ account }) => {
    return (
        <>
            <div className="account__wrapper">
                <AccountAvatar>{account.username && account.username[0]}</AccountAvatar>
                <div className="select__container">
                    <div className="select__account">{`${account.broker_id}-${account.account}`}</div>
                    <div className="select__username">{`${account.bhname || ''} ${account.username}`}</div>
                </div>
            </div>
            <style jsx>{`
                .account__wrapper {
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .account__wrapper {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                    }
                    .select__container {
                        margin-left: 17px;
                    }
                }
            `}</style>
        </>
    );
};

AccountList.propTypes = {
    account: PropTypes.object.isRequired,
};
