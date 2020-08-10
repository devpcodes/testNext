const initialState = {
    qqq: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'qqq':
            return {
                qqq: state.qqq + 1,
            }
        default:
            return state
    }
}

export default reducer;