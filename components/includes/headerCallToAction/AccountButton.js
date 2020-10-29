import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Popover } from 'antd';
import { PersonalArea } from '../personalArea/PersonalArea';
import { HeaderBtn } from '../HeaderBtn';
import { AccountAvatar } from '../AccountAvatar';
import { setMaskVisible } from '../../../store/components/layouts/action';

import theme from '../../../resources/styles/theme';

export const AccountButton = () => {
    const dispatch = useDispatch();
    const isMobile = useSelector(store => store.layout.isMobile);
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

        // Popover 的 visible 為 true，然後顯示 mask。
        // 但注意 mask 的隱藏不由這裡控制，而是由 mask 本身的 click 事件控制，否則會遇到 click 事件也傳遞到頁面裡的 iframe
        if (visible) {
            dispatch(setMaskVisible(visible));
        }
    };

    return (
        <>
            <Popover
                placement="bottomRight"
                content={accountPopoverContent}
                trigger={isMobile ? 'click' : 'hover'}
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
