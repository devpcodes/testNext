import React, { memo, useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import pen from '../../../../resources/images/components/goOrder/edit-edit.svg';
import hamburger from '../../../../resources/images/components/goOrder/menu-hamburger.svg';

const sortableList = memo(() => {
    const [listContent, setListContent] = useState([
        '自選股 1 ',
        '自選股 2',
        '自選股 3',
        '自選股 4',
        '自選股 5',
        '自選股 6',
    ]);
    const DragHandle = sortableHandle(() => (
        <span class="sort__icon">
            <img src={hamburger} alt="sort"></img>
        </span>
    ));
    const SortableItem = sortableElement(({ value }) => (
        <li className="sortable__list__item">
            <span className="edit__icon">
                <img src={pen} alt="pen"></img>
            </span>
            <span className="self__select__name">{value}</span>
            <DragHandle />
        </li>
    ));

    const SortableContainer = sortableContainer(({ children }) => {
        return <ul className="sortable__list">{children}</ul>;
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setListContent(arrayMove(listContent, oldIndex, newIndex));
    };

    return (
        <>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {listContent.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </SortableContainer>
            <style jsx global>{`
                .sortable__list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .sortable__list__item {
                    list-style: none;
                    padding: 11px 0;
                    font-size: 1.6rem;
                    z-index: 17000;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                }
                .sortable__list__item .self__select__name {
                    align-self: flex-end;
                    flex: auto;
                    padding: 0 8px;
                }
                .sortable__list__item .edit__icon {
                    cursor: pointer;
                }
                .sort__icon {
                    cursor: move;
                    vertical-align: bottom;
                    float: right;
                }
            `}</style>
        </>
    );
});

export default sortableList;
