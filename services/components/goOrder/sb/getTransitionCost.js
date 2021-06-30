export const getTransactionCost = (qty, price, bs, market) => {
    /**
     * HKD buy = ( qty * price ) + Max( qty * price * 1%, 100) + qty * price * 0.008%
     *           + Max( qty * price * 0.1%, 1 ) + Max( qty * price * 0.002%, 2 )
     *
     * HKD sell = ( qty * price ) - Max( qty * price * 1%, 100) - qty * price * 0.008%
     *            - Max( qty * price * 0.1%, 1 ) - Max( qty * price * 0.002%, 2 )
     *
     * USD buy = ( qty * price ) + Max( qty * price * 1%, 100) + qty * price * 0.0013%
     *           + qty * 0.000119
     *
     * USD sell = ( qty * price ) - Max( qty * price * 1%, 100) - qty * price * 0.0013%
     *            - Range( 5.95, qty * 0.000119, 0.01 )
     */
    switch (market) {
        // case 'US':
        //     if(bs === 'B'){
        //         ( qty * price ) + Math.max( qty * price * 0.01, 100) + qty * price * 0.0013%
        //         *           + qty * 0.000119
        //     }else{

        //     }
        //     break;

        default:
            break;
    }
};
