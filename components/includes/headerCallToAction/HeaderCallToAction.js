import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Avatar, Popover } from 'antd';
import { AccountQuickView } from './AccountQuickView';
import { HeaderBtn } from '../HeaderBtn';

import theme from '../../../resources/styles/theme';

export const HeaderCallToAction = () => {
    const router = useRouter();
    const isLogin = useSelector((store) => store.layout.isLogin);

    const goSignUp = () => {
        router.push('/OpenAccount');
    };
    const goOrder = () => {
        router.push('/goOrder');
    };
    const goLogIn = () => {
        router.push('/SinoTrade_login');
    };

    const loginBtn = <HeaderBtn content={'客戶登入'} type={'primary'} clickHandler={goLogIn} />;
    const accountElement = (
        <Avatar
            style={{
                fontSize: '20px',
                fontWeight: '600',
            }}
            size="large"
        >
            江
        </Avatar>
    );
    const accountPopoverContent = (
        <div>
            <AccountQuickView />
        </div>
    );
    const accountBtn = (
        <Popover placement="bottomRight" content={accountPopoverContent} trigger="click">
            <div>
                <HeaderBtn content={accountElement} type={'primary'} />
            </div>
        </Popover>
    );

    return (
        <div className="callToAction__container">
            <HeaderBtn
                content={isLogin ? '快速下單' : '快速開戶'}
                type={'secondary'}
                clickHandler={isLogin ? goOrder : goSignUp}
            />
            {isLogin ? accountBtn : loginBtn}
            <style jsx>{`
                .callToAction__container {
                    display: flex;
                    position: relative;
                }
            `}</style>
            <style jsx global>{`
                .callToAction__container .ant-avatar-circle,
                .callToAction__container .ant-avatar-string {
                    transition: ${theme.button.transition};
                }
                .callToAction__container .ant-avatar-circle {
                    background-color: ${theme.colors.primary};
                }
                .callToAction__container .header__btn:hover .ant-avatar-circle,
                .callToAction__container .header__btn:focus .ant-avatar-circle,
                .callToAction__container .header__btn:active .ant-avatar-circle {
                    background-color: #ffffff;
                }
                .callToAction__container .header__btn:hover .ant-avatar-string,
                .callToAction__container .header__btn:focus .ant-avatar-string,
                .callToAction__container .header__btn:active .ant-avatar-string {
                    color: ${theme.colors.primary};
                }
            `}</style>
        </div>
    );
};
