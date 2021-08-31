import * as actionType from './actionType';

const initialState = {
    orderList: [
        {
            AID: '9A9509802634',
            BS: 'B',
            CID: '11',
            ClientIP: '123.51.219.31',
            Creator: 'MCCAFIGAGI',
            Exchid: 'US',
            OT: '0',
            Price: 148.6,
            PriceType: '0',
            Qty: '1',
            StockID: 'AAPL',
            TT: '2',
            GTCDate: '20220221',
            lotSize: 1,
            priceJumpPoint: 0.01,
            aon: 'ANY',
        },
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_ORDER:
            return {
                ...state,
                orderList: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
