import { useContext } from 'react';
import icon from '../../../resources/images/reservation/icon.png';
import mobileIcon from '../../../resources/images/reservation/mobileIcon.png';
import AccountSelect from './AccountSelect';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import { SELECTED } from '../../../store/advanceCollection/actionType';
const Accounts = ({ style }) => {
    const [state, dispatch] = useContext(ReducerContext);
    const { width } = useWindowSize();

    const selectHandler = val => {
        dispatch({ type: SELECTED, payload: val });
    };
    return (
        <div className="account__container" style={style}>
            <div className="label__box">
                <img src={width <= 580 ? mobileIcon : icon} />
                <span className="label">申請帳號</span>
            </div>
            <div className="account__select">
                <AccountSelect
                    onSelect={selectHandler}
                    data={state.accountsReducer.accounts}
                    defaultValue={
                        state.accountsReducer.accounts[0].broker_id + state.accountsReducer.accounts[0].account
                    }
                />
            </div>
            <style jsx>{`
                .account__container {
                    border-bottom: 1px solid #dadada;
                    padding-bottom: 45px;
                }
                .label__box {
                    display: inline-block;
                    width: 25%;
                }
                @media (max-width: 580px) {
                    .label__box {
                        display: block;
                        width: 100%;
                    }
                    .account__container {
                        margin-top: 0 !important;
                    }
                    .account__container {
                        padding-bottom: 30px !important;
                    }
                }
                .account__select {
                    display: inline-block;
                    width: 75%;
                }
                @media (max-width: 580px) {
                    .account__select {
                        display: block;
                        width: 100%;
                    }
                }
                img {
                    margin-top: -9px;
                }
                @media (max-width: 580px) {
                    img {
                        margin-top: -4px;
                    }
                }
                .label {
                    font-weight: bold;
                    font-size: 20px;
                }
                @media (max-width: 580px) {
                    .label {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Accounts;
