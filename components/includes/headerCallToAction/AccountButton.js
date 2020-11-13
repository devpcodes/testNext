import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Popover } from 'antd';
import { PersonalArea } from '../personalArea/PersonalArea';
import { HeaderBtn } from '../HeaderBtn';
import { AccountAvatar } from '../AccountAvatar';
import { setMaskVisible, setMenuOpen } from '../../../store/components/layouts/action';

import theme from '../../../resources/styles/theme';

export const AccountButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isMobile = useSelector(store => store.layout.isMobile);
    const currentAccount = useSelector(store => store.user.currentAccount);

    const [personalAreaVisible, setPersonalAreaVisible] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);

    const accountElement = <AccountAvatar>{currentAccount.username && currentAccount.username[0]}</AccountAvatar>;
    const accountPopoverContent = (
        <div>
            <PersonalArea personalAreaVisible={personalAreaVisible} />
        </div>
    );

    const handlePersonalAreaVisible = visible => {
        setPopoverVisible(visible);
        setPersonalAreaVisible(visible);
        dispatch(setMaskVisible(visible));
        if (visible) {
            dispatch(setMenuOpen(false));
        }
    };

    useEffect(() => {
        setPopoverVisible(false);
        dispatch(setMaskVisible(false));
    }, [router.asPath]);

    return (
        <>
            <Popover
                placement="bottomRight"
                content={accountPopoverContent}
                visible={popoverVisible}
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
