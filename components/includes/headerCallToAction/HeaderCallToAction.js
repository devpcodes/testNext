import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { HeaderBtn } from '../HeaderBtn';
import { AccountButton } from './AccountButton';

import { setCurrentPath } from '../../../store/general/action';

export const HeaderCallToAction = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isLogin = useSelector(store => store.user.isLogin);
    const isMobile = useSelector(store => store.layout.isMobile);

    const goSignUp = () => {
        return window.open(
            'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=未登入選單開戶按鈕',
        );
    };
    const goOrder = () => {
        const iHeight = 700;
        const iWidth = 440;
        const iTop = (window.screen.availHeight - 30 - iHeight) / 2; //視窗的垂直位置;
        const iLeft = window.screen.availLeft + (window.screen.availWidth - 10 - iWidth) / 2; //視窗的水平位置;
        return window.open(
            `${process.env.NEXT_PUBLIC_SUBPATH}goOrder?nav=0`,
            'goOrder',
            `height=${iHeight},innerHeight=${iHeight},width=${iWidth},innerWidth=${iWidth},top=${iTop},left=${iLeft}`,
        );
    };
    const goLogIn = () => {
        if (router.pathname !== '/errPage') {
            dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
        }
        router.push('/SinoTrade_login');
    };

    const loginBtn = <HeaderBtn content={isMobile ? '登入' : '客戶登入'} type={'primary'} clickHandler={goLogIn} />;

    return (
        <div className="callToAction__container">
            {isMobile ? null : (
                <HeaderBtn
                    content={isLogin ? '快速下單' : '快速開戶'}
                    type={'secondary'}
                    clickHandler={isLogin ? goOrder : goSignUp}
                />
            )}
            {isLogin ? <AccountButton /> : loginBtn}
            <style jsx>{`
                .callToAction__container {
                    display: flex;
                    position: relative;
                }
            `}</style>
        </div>
    );
};
