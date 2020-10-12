import PropTypes from 'prop-types';

import theme from '../../../resources/styles/theme';
import reloadImg from '../../../resources/images/components/header/ic_reload.png';

export const LastUpdatedTime = ({ time }) => {
    return (
        <div className="lastUpdatedTime__container">
            <span>
                {'更新時間'} {time}
            </span>
            <div className="button__reload">
                <img src={reloadImg} alt="reload"></img>
            </div>
            <style jsx>{`
                .lastUpdatedTime__container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 0;
                    font-size: 1.2rem;
                    color: #0d1623;
                }
                .button__reload {
                    cursor: pointer;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .lastUpdatedTime__container {
                        padding: 8px 20px;
                        font-size: 1.4rem;
                        color: #a9b6cb;
                        border-bottom: solid 1px #17273d;
                    }
                }
            `}</style>
        </div>
    );
};

LastUpdatedTime.propTypes = {
    time: PropTypes.string.isRequired,
};
