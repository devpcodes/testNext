import { memo } from 'react';
import PropTypes from 'prop-types';

import theme from '../../../../resources/styles/theme';

export const SearchItem = memo(({ item, keyword, selectHandler, isMatched }) => {
    const getMatchStr = (str, replace) => {
        const re = new RegExp(replace, 'i');
        const replacement = match => `<span style="color:#daa360;">${match}</span>`;
        return str.replace(re, replacement);
    };

    return (
        <>
            <div
                className="group__item"
                onClick={() => {
                    selectHandler(item);
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        selectHandler(item);
                    }
                }}
                role="option"
                aria-selected="false"
                tabIndex={0}
            >
                {isMatched ? (
                    <>
                        <div
                            className="item__code"
                            dangerouslySetInnerHTML={{ __html: getMatchStr(item.symbol, keyword) }}
                        ></div>
                        <div
                            className="item__name"
                            dangerouslySetInnerHTML={{
                                __html: getMatchStr(item.name_zh || item.name, keyword),
                            }}
                        ></div>
                    </>
                ) : (
                    <>
                        <div className="item__code">{item.symbol}</div>
                        <div className="item__name">{item.name_zh || item.name}</div>
                    </>
                )}
            </div>
            <style jsx>{`
                .group__item {
                    width: 100%;
                    height: 44px;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    font-size: 1.6rem;
                    font-weight: 500;
                    cursor: pointer;
                }
                .group__item .item__code {
                    width: 25%;
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
    );
});

SearchItem.displayName = 'goOrder-searchItem';

SearchItem.propTypes = {
    item: PropTypes.object.isRequired,
    keyword: PropTypes.string,
    selectHandler: PropTypes.func.isRequired,
    isMatched: PropTypes.bool, // 是否要 highlight 精準符合 keyword 的字串
};

SearchItem.defaultProps = {
    keyword: '',
    isMatched: false,
};
