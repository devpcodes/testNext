import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import theme from '../../resources/styles/theme';

export const HeaderBtn = ({ content, type, clickHandler }) => {
    const isMobile = useSelector(store => store.layout.isMobile);

    const handleClick = e => {
        e.preventDefault();
        clickHandler && clickHandler();
    };

    return (
        <>
            <a className="header__btn" onClick={handleClick}>
                <div className="btn__content">{content}</div>
            </a>
            <style jsx>{`
                .header__btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: ${isMobile ? 'auto' : '105px'};
                    padding: 0 15px;
                    height: 100%;
                    background-color: ${theme.colors.darkBg};
                    color: ${theme.colors.text};
                    text-align: center;
                    position: relative;
                    font-size: 1.8rem;
                    font-weight: 600;
                    white-space: nowrap;
                }
                .header__btn:after {
                    content: '';
                    width: 100%;
                    height: 5px;
                    background-color: ${theme.colors[type]};
                    z-index: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: ${theme.button.transition};
                    display: ${isMobile ? 'none' : 'block'};
                }
                .header__btn:hover:after,
                .header__btn:focus:after,
                .header__btn:active:after {
                    height: 100%;
                }
                .btn__content {
                    z-index: 1;
                }
            `}</style>
        </>
    );
};

HeaderBtn.propTypes = {
    content: PropTypes.node,
    type: PropTypes.string,
    clickHandler: PropTypes.func,
};

HeaderBtn.defaultProps = {
    content: 'Button',
    type: 'primary',
};
