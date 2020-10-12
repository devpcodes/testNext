import React, { useState } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router'
// import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin';

const SinoTradeLoginPage = function () {
    // const router = useRouter()
    // const [isVisible, setIsVisible] = useState(true);

    // const closeHandler = function(){
    //     router.back();
    // }
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            {/* <SinoTradeLogin isVisible={isVisible} onClose={closeHandler} successHandler={closeHandler}/> */}
        </>
    );
};

// SinoTradeLoginPage.getLayout = page => (
//     <>
//       <SinoTradeLoginPage>{page}</SinoTradeLoginPage>
//     </>
// )
export default SinoTradeLoginPage;
