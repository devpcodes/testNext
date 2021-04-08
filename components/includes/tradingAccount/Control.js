import PropTypes from 'prop-types';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import { AccountDropdown } from '../personalArea/accountDropdown/AccountDropdown';
import IconBtn from './IconBtn';

const Control = ({ style, text }) => {
    const isMobile = useCheckMobile();
    return (
        <>
            <div className="control__container" style={style}>
                <span className="text">{text}</span>
                <AccountDropdown personalAreaVisible={false} tradingLayout={true} width={isMobile ? '80%' : ''} />
                <IconBtn type={'refresh'} style={{ verticalAlign: 'top', marginRight: isMobile ? 0 : '12px' }} />
                <IconBtn
                    type={'download'}
                    style={{ verticalAlign: 'top', display: isMobile ? 'none' : 'inline-block' }}
                />
            </div>
            <style jsx>{`
                .control__container {
                    margin-bottom: 21px;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                .text {
                    color: #6c7b94;
                    letter-spacing: 0.35px;
                    font-size: 1.4rem;
                    margin-right: 20px;
                }
                @media (max-width: 780px) {
                    .control__container {
                        margin-bottom: 21px;
                        position: static;
                    }
                    .text {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};
Control.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
};
export default Control;
