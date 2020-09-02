import React, { useState } from 'react';
import { useRouter } from 'next/router'
import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin';

const SinoTradeLoginPage = function() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(true);

    const closeHandler = function(){
        setIsVisible(false);
        setTimeout(() => {
            router.back();
        }, 300);
    }
    return (
        <>
            <SinoTradeLogin isVisible={isVisible} onClose={closeHandler}/>
        </>
    )
}

export default SinoTradeLoginPage;