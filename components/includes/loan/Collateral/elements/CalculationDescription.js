import { useDispatch, useSelector } from 'react-redux';
import icon from '../../../../../resources/images/components/loanZone/basic-help-circle.svg';
import { setModal } from '../../../../../store/components/layouts/action';
import btnIcon from '../../../../../resources/images/components/loanZone/ic-circle.svg';
const CalculationDescription = () => {
    const winWidth = useSelector(store => store.layout.winWidth);
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                type: 'info',
                title: '試算說明',
                content: (
                    <div>
                        <p style={{ marginBottom: 0, color: '#0d1623' }}>1. 本服務已日計息</p>
                        <p style={{ marginBottom: 0, color: '#0d1623' }}>2. 線上動用手續費每筆100 元</p>
                        <p style={{ marginBottom: 0, color: '#0d1623' }}>3. 撥券費以股票張數計算，每張 1 元</p>
                        <p style={{ marginBottom: 0, color: '#0d1623' }}>4. 上述費用於還款時收取</p>
                    </div>
                ),
                okText: '我知道了',
                noCloseIcon: true,
                noTitleIcon: true,
            }),
        );
    };
    return (
        <div className="description__container" onClick={clickHandler}>
            {winWidth <= 530 ? (
                <img className="des__icon" src={btnIcon} />
            ) : (
                <>
                    <img className="des__icon" src={icon} />
                    <span className="description">試算說明</span>
                </>
            )}

            <style jsx>{`
                .description__container {
                    padding: 8px 12px 7px 12px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    height: 40px;
                    cursor: pointer;
                }
                .description {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    white-space: nowrap;
                }
                .des__icon {
                    margin-top: -5px;
                    margin-right: 4px;
                }
                @media (max-width: 1280px) {
                    .description__container {
                        padding: 8px 6px 8px 6px;
                        border-radius: 2px;
                        border: solid 1px #d7e0ef;
                        background-color: #fff;
                        height: 40px;
                        cursor: pointer;
                    }
                    .description {
                        font-size: 14px;
                    }
                }
                @media (max-width: 530px) {
                    .description__container {
                        padding: 0;
                        border: none;
                        display: inline-block;
                        height: 10px;
                        margin-top: 6px;
                        float: right;
                        margin-right: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CalculationDescription;
