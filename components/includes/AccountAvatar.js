import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Avatar } from 'antd';

import theme from '../../resources/styles/theme';

export const AccountAvatar = ({ children, style }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const getStyle = () => {
        if (style == null) {
            return {
                fontSize: `${isMobile ? '1.5rem' : '2rem'}`,
                fontWeight: '600',
            };
        } else {
            return style;
        }
    };
    return (
        <>
            <Avatar style={getStyle()} size={isMobile ? 28 : 40}>
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
