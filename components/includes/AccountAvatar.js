import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'

import { Avatar } from 'antd';

import theme from '../../resources/styles/theme';

export const AccountAvatar = ({children}) => {
    const isMobile = useSelector((store) => store.layout.isMobile);

    return (
        <>
            <Avatar
                style={{
                    fontSize: `${isMobile ? '1.5rem' : '2rem'}`,
                    fontWeight: '600',
                }}
                size={isMobile ? 28 : 40}
            >
                {children}
            </Avatar>
            <style jsx global>{`
                .ant-avatar-circle,
                .ant-avatar-string {
                    transition: ${theme.button.transition};
                    user-select: none;
                }
                .ant-avatar-circle {
                    background-color: ${theme.colors.primary};
                }
            `}</style>
        </>
    );
};

AccountAvatar.propTypes = {
    children: PropTypes.node,
};
