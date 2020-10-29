export const add = () => async dispatch => {
    await delay(1000);
    dispatch({ type: 'add' });
};

const delay = interval => {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    });
};
