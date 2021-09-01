import { useState, useEffect, useCallback } from 'react';
import ReactDragListView from 'react-drag-listview';
import SymbolItem from './SymbolItem';
const listData = [
    {
        title: 'AAPL',
        description: 'Apple',
    },
    {
        title: '00003',
        description: '香港中華煤氣',
    },
    {
        title: 'GOOGL',
        description: 'Alphabet - Class A',
    },
    {
        title: '9003',
        description: 'Sotetsu Holdings,Inc.',
    },
    {
        title: 'MIG',
        description: 'Meadowbrook Insurance Group Inc.',
    },
];
const SymbolList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const newData = listData.map((item, i) => {
            item.id = i;
            return item;
        });
        setData(newData);
    }, []);

    const delHandler = useCallback(id => {
        const newData = data.filter(item => {
            if (item.id === id) {
                return false;
            }
            return true;
        });
        setData(newData);
    });

    const dragProps = {
        async onDragEnd(fromIndex, toIndex) {
            const newData = [...data];
            const item = newData.splice(fromIndex, 1)[0];
            newData.splice(toIndex, 0, item);
            setData(newData);
        },
        nodeSelector: '.container',
        handleSelector: '.drag',
    };

    return (
        <div className="symbolList__container">
            <ReactDragListView {...dragProps}>
                {data.map(item => {
                    return (
                        <SymbolItem
                            title={item.title}
                            description={item.description}
                            delHandler={delHandler}
                            id={item.id}
                            key={item.id}
                        />
                    );
                })}
            </ReactDragListView>
        </div>
    );
};

export default SymbolList;
