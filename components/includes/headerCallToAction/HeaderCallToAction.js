import { useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Avatar } from 'antd';
import { AccountQuickView } from './AccountQuickView';
import { HeaderBtn } from '../HeaderBtn';

// import { deleteCookies } from '../../../services/components/layouts/deleteCookies';
import theme from '../../../resources/styles/theme';

export const HeaderCallToAction = () => {
    const router = useRouter();
    const [isQuickViewVisible, setIsQuickViewVisible] = useState(false);

    const isLogin = useSelector((store) => store.layout.isLogin);

    const accountElement = (
        <Avatar style={{ color: theme.colors.text, backgroundColor: theme.colors.primary }} size="large">
            江
        </Avatar>
    );

    const goSignUp = () => {
        console.log('sign up');
        router.push('/OpenAccount');
    };
    const goOrder = () => {
        router.push('/goOrder');
    };
    const goLogIn = () => {
        router.push('/SinoTrade_login');
    };
    // const logOut = () => {
    //     deleteCookies();
    //     console.log('logout');
    //     router.push('/');
    // };
    const quickViewHandler = () => {
        setIsQuickViewVisible(!isQuickViewVisible);
    };

    return (
        <div className="callToAction__container">
            <HeaderBtn
                content={isLogin ? '快速下單' : '快速開戶'}
                type={'secondary'}
                clickHandler={isLogin ? goOrder : goSignUp}
            />
            <HeaderBtn
                content={isLogin ? accountElement : '客戶登入'}
                type={'primary'}
                clickHandler={isLogin ? quickViewHandler : goLogIn}
            />
            <AccountQuickView isVisible={isQuickViewVisible} />
            <style jsx>{`
                .callToAction__container {
                    display: flex;
                    position: relative;
                }
            `}</style>
        </div>
    );
};

// HeaderCallToAction.propTypes = {};
