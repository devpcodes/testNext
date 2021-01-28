import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import MyTransition from '../../myTransition';
import { setCode } from '../../../../store/goOrder/action';

import theme from '../../../../resources/styles/theme';
import searchImg from '../../../../resources/images/components/goOrder/edit-search.svg';
import closeImg from '../../../../resources/images/components/goOrder/menu-close-big.svg';

export const Search = memo(({ isVisible, handleCancel }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const selectHandler = value => {
        // console.log(value);
        dispatch(setCode(value));
    };

    const changeHandler = e => {
        const value = e.target.value;
        // console.log(`e.target.value:`, value);
        setValue(value);
    };

    const clearHandler = () => {
        setValue('');
    };

    return (
        <MyTransition isVisible={isVisible} classNames={'loginMobile'}>
            <>
                <div className="search__container">
                    <div className="topBar__container">
                        <div className="autoComplete__container">
                            <img src={searchImg} alt="search"></img>
                            <input
                                type="text"
                                name="inputOfSearch"
                                placeholder="請輸入股票代碼或名稱"
                                value={value}
                                onChange={changeHandler}
                                className="autoComplete__input"
                            />
                            <button onClick={clearHandler}>
                                <img src={closeImg} alt="search"></img>
                            </button>
                        </div>
                        <button className="cancel__btn" onClick={handleCancel}>
                            取消
                        </button>
                    </div>
                    <section className="dropdown__container">
                        <article className="dropdown__group">
                            <div className="group__title">最近搜尋</div>
                            <div className="group__item">
                                <span className="item__code">6531</span>
                                <span className="item__name">愛普</span>
                            </div>
                            <div className="group__item">
                                <span className="item__code">6531</span>
                                <span className="item__name">愛普</span>
                            </div>
                        </article>
                        <article className="dropdown__group">
                            <div className="group__title">本日熱門搜尋</div>
                            <div className="group__item">
                                <div className="item__code">6531</div>
                                <div className="item__name">愛普</div>
                            </div>
                            <div className="group__item">
                                <div className="item__code">006208</div>
                                <div className="item__name">富邦台灣加權</div>
                            </div>
                        </article>
                    </section>
                </div>
                <style jsx>{`
                    button,
                    input {
                        border: none;
                        padding: 0;
                        background-color: inherit;
                    }
                    .search__container {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: #ffffff;
                        z-index: 10001;
                    }
                    .topBar__container {
                        height: 68px;
                        width: 100%;
                        padding: 12px 16px;
                        background-color: ${theme.colors.darkBg};
                        display: flex;
                        align-items: center;
                    }
                    .topBar__container .cancel__btn {
                        color: ${theme.colors.text};
                        font-size: 1.6rem;
                        font-weight: 500;
                        margin: 0 0 0 16px;
                        width: 36px;
                        height: 22px;
                        line-height: 1.6rem;
                    }
                    .autoComplete__container {
                        width: calc(100% - 52px);
                        height: 44px;
                        padding: 10px 12px;
                        background-color: ${theme.colors.lightBg};
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .autoComplete__container .autoComplete__input {
                        height: 22px;
                        width: calc(100% - 56px);
                        font-size: 1.6rem;
                        color: ${theme.colors.darkBg};
                    }
                    .autoComplete__container .autoComplete__input::placeholder {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */
                        color: #a9b6cb;
                        opacity: 1; /* Firefox */
                    }
                    .autoComplete__container .autoComplete__input::-ms-input-placeholder {
                        /* Internet Explorer 10-11 */
                        color: #a9b6cb;
                    }
                    .autoComplete__container .autoComplete__input::-ms-input-placeholder {
                        /* Microsoft Edge */
                        color: #a9b6cb;
                    }
                    .dropdown__container {
                        width: 100%;
                        border-bottom: solid 1px ${theme.colors.normalBg};
                    }
                    .dropdown__group {
                        width: 100%;
                        color: ${theme.colors.darkBg};
                    }
                    .dropdown__group .group__title {
                        width: 100%;
                        height: 24px;
                        line-height: 24px;
                        padding: 0 16px;
                        background-color: ${theme.colors.normalBg};
                        font-size: 1.2rem;
                    }
                    .dropdown__group .group__item {
                        width: 100%;
                        height: 44px;
                        padding: 0 16px;
                        display: flex;
                        align-items: center;
                        font-size: 1.6rem;
                        font-weight: 500;
                    }
                    .group__item .item__code {
                        width: 65px;
                    }
                    .group__item .item__code,
                    .group__item .item__name {
                        height: 22px;
                        line-height: 22px;
                    }
                    .group__item ~ .group__item {
                        border-top: solid 1px ${theme.colors.normalBg};
                    }
                `}</style>
            </>
        </MyTransition>
    );
});

Search.displayName = 'goOrder-search';

Search.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};
