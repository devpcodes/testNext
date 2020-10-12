import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Popover } from 'antd';
import { PersonalArea } from '../personalArea/PersonalArea';
import { HeaderBtn } from '../HeaderBtn';
import { AccountAvatar } from '../AccountAvatar';

import theme from '../../../resources/styles/theme';

export const AccountButton = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [personalAreaVisible, setPersonalAreaVisible] = useState(false);

    const accountElement = <AccountAvatar>{currentAccount.username && currentAccount.username[0]}</AccountAvatar>;
    const accountPopoverContent = (
        <div>
            <PersonalArea personalAreaVisible={personalAreaVisible} />
        </div>
    );

    const handlePersonalAreaVisible = visible => {
        setPersonalAreaVisible(visible);
    };

    return (
        <>
            <Popover
                placement="bottomRight"
                content={accountPopoverContent}
                trigger="click"
                onVisibleChange={handlePersonalAreaVisible}
            >
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
