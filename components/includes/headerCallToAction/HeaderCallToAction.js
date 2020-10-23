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
        router.push('/OpenAccount', `${process.env.NEXT_PUBLIC_SUBPATH}OpenAccount`);
    };
    const goOrder = () => {
        router.push('/goOrder', `${process.env.NEXT_PUBLIC_SUBPATH}goOrder`);
    };
    const goLogIn = () => {
        dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
        router.push(router.pathname, `${process.env.NEXT_PUBLIC_SUBPATH}Sinotrade_Login`);
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
