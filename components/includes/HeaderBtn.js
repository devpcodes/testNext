import PropTypes from 'prop-types';

import theme from '../../resources/styles/theme';

export const HeaderBtn = ({ content, type, clickHandler }) => {
    const handleClick = (e) => {
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
                    width: 105px;
                    min-width: 105px;
                    height: 100%;
                    background-color: ${theme.colors.darkBg};
                    color: ${theme.colors.text};
                    text-align: center;
                    position: relative;
                    font-size: 18px;
                    font-weight: 600;
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
                    transition: all 0.3s ease-out;
                }
                .header__btn:hover:after {
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
