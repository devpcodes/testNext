import { useSelector } from 'react-redux';

import { Avatar, Popover } from 'antd';
import { AccountQuickView } from './AccountQuickView';
import { HeaderBtn } from '../HeaderBtn';

import theme from '../../../resources/styles/theme';

export const AccountButton = () => {
    const isMobile = useSelector((store) => store.layout.isMobile);
    const currentAccount = useSelector((store) => store.user.currentAccount);

    const accountElement = (
        <Avatar
            style={{
                fontSize: `${isMobile ? '1.5rem' : '2rem'}`,
                fontWeight: '600',
            }}
            size={isMobile ? 28 : 40}
        >
            {currentAccount.username && currentAccount.username[0]}
        </Avatar>
    );
    const accountPopoverContent = (
        <div>
            <AccountQuickView />
        </div>
    );

    return (
        <>
            <Popover placement="bottomRight" content={accountPopoverContent} trigger="click">
                <div>
                    <HeaderBtn content={accountElement} type={'primary'} />
                </div>
            </Popover>
            <style jsx global>{`
                .callToAction__container .ant-avatar-circle,
                .callToAction__container .ant-avatar-string {
                    transition: ${theme.button.transition};
                    user-select: none;
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
        </>
    );
};
