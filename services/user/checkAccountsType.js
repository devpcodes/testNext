export const checkAccountsType = (accounts, type) => {
    let accountsType = accounts.filter(acc => {
        if (acc.accttype === type) {
            return true;
        }
    });
    if (accountsType.length === 0) {
        return false;
    }
    return true;
};
