import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { accountGroupByType } from '../services/user/accountGroupByType';
import { setModal } from '../store/components/layouts/action';
import { setCurrentAccount } from '../store/user/action';

/**
 *
 * @param {type} 市場別 value: 'S' 'F' 'H'
 */
// type S 不做操作，個人化設定會自動選擇
export const useAutoSelectAccount = type => {
    const accounts = useSelector(store => store.user.accounts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (accounts?.length > 0) {
            setTimeout(() => {
                const groupedAccount = accountGroupByType(accounts);

                if (groupedAccount[type] != null && groupedAccount[type]?.length > 0 && type !== 'S') {
                    dispatch(setCurrentAccount(groupedAccount[type][0]));
                } else {
                    dispatch(setModal({ visible: true, type: 'confirm', content: '無可交易帳號', title: '系統訊息' }));
                }
            }, 500);
        }
    }, [accounts]);
};
