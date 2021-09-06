import { useCallback, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview';
import { useDispatch, useSelector } from 'react-redux';
import { setSymbolList } from '../../../../store/subBrokerage/action';
import Empty from './Empty';
import SymbolItem from './SymbolItem';

const SymbolList = ({ style }) => {
    const dispatch = useDispatch();
    const symbolList = useSelector(store => store.subBrokerage.symbolList);

    useEffect(() => {
        if (localStorage.getItem('subBrokerage_symbolList')) {
            const oldSymbolList = JSON.parse(localStorage.getItem('subBrokerage_symbolList'));
            dispatch(setSymbolList(oldSymbolList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('subBrokerage_symbolList', JSON.stringify(symbolList));
    }, [symbolList]);

    const delHandler = useCallback(id => {
        const newData = symbolList.filter(item => {
            if (item.id === id) {
                return false;
            }
            return true;
        });
        dispatch(setSymbolList(newData));
    });

    const dragProps = {
        async onDragEnd(fromIndex, toIndex) {
            const newData = [...symbolList];
            const item = newData.splice(fromIndex, 1)[0];
            newData.splice(toIndex, 0, item);
            dispatch(setSymbolList(newData));
        },
        nodeSelector: '.container',
        handleSelector: '.drag',
    };
    return (
        <div className="symbolList__container" style={style}>
            {symbolList.length === 0 && (
                <Empty style={{ marginTop: '46px' }} text="目前還沒加入個股請使用上方搜尋列新增個股" />
            )}
            <ReactDragListView {...dragProps}>
                {symbolList.map(item => {
                    return (
                        <SymbolItem
                            title={item.symbol}
                            description={item.name}
                            delHandler={delHandler}
                            id={item.id}
                            key={item.id}
                        />
                    );
                })}
            </ReactDragListView>
            <style jsx>{`
                .symbolList__container {
                    height: 500px;
                    overflow: auto;
                }
            `}</style>
        </div>
    );
};

export default SymbolList;
