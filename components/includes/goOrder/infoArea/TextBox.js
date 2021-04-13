import { memo } from 'react';
import PropTypes from 'prop-types';

import theme from '../../../../resources/styles/theme';

export const TextBox = memo(({ color, text }) => {
    return (
        <>
            <div className={`text__box ${color}`}>{text}</div>
            <style jsx>{`
                .text__box {
                    height: 22px;
                    padding: 1px 3.8px;
                    border-radius: 2px;
                    line-height: 20px;
                }
                .text__box ~ .text__box {
                    margin-left: 4px;
                }
                .text__box.dark {
                    color: ${theme.colors.darkBg};
                    background-color: rgba(13, 22, 35, 0.1);
                }
                .text__box.red {
                    color: #c43826;
                    background-color: rgba(196, 56, 38, 0.1);
                }
                .text__box.orange {
                    color: #ff9100;
                    background-color: rgba(255, 210, 152, 0.27);
                }
                .text__box.green {
                    color: #22a16f;
                    background-color: rgba(34, 161, 111, 0.1);
                }
                .text__box.blue {
                    color: #254a91;
                    background-color: rgba(37, 74, 145, 0.1);
                }
                .text__box.brown {
                    color: #daa360;
                    background-color: rgba(218, 163, 96, 0.12);
                }
            `}</style>
        </>
    );
});

TextBox.displayName = 'goOrder-textBox';

TextBox.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
