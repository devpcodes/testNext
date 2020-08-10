export const add = () => async (dispatch, getState) => {
    // console.log('state', getState());
    await delay(1000);
    dispatch({ type: 'add' })
}

const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};