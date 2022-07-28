import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckSubscriptionAcc } from '../../../../hooks/useCheckSubscriptionAcc';
import { useUser } from '../../../../hooks/useUser';
import { setModal } from '../../../../store/components/layouts/action';
import { setCurrentAccount } from '../../../../store/user/action';

const SubscriptionAccErrModal = ({ onClick }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    const [applyStatus, signAcc, accountInfo] = useCheckSubscriptionAcc();
    const { isLogin, accounts } = useUser();
    useEffect(() => {
        if (applyStatus && accountInfo.applyStatus != null) {
            checkAccSelectErr();
        }
    }, [applyStatus, accountInfo]);
    const checkAccSelectErr = () => {
        console.log('account', currentAccount.account, accountInfo.account);
        if (currentAccount.account !== accountInfo.account) {
            dispatch(
                setModal({
                    visible: true,
                    okText: '切換帳號',
                    type: 'info',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    onOk: () => {
                        setAccHandler(accounts, accountInfo.account);
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                    },
                }),
            );
        }
    };

    const setAccHandler = (accounts, subAccount) => {
        accounts.map(item => {
            if (item.account === subAccount) {
                dispatch(setCurrentAccount(item));
            }
        });
    };

    return <></>;
};

export default SubscriptionAccErrModal;
