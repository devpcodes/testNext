import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import EditSelectStock from '../selfSelectStock/EditSelectStock';

import pen from '../../../../resources/images/components/goOrder/edit-edit.svg';
import hamburger from '../../../../resources/images/components/goOrder/menu-hamburger.svg';

const sortableList = memo(handleComplete => {
    const selectInfo = useSelector(store => store.goOrder.selectInfo);
    const [listContent, setListContent] = useState(selectInfo.data);
    const [isEditSelfSelectNameVisitable, setIsEditSelfSelectNameVisitable] = useState(false);
    const [editGroupData, setEditGroupData] = useState({});

    useEffect(() => {
        setListContent(selectInfo.data);
    }, [selectInfo]);

    const editGroupName = value => {
        setEditGroupData(value);
        setIsEditSelfSelectNameVisitable(true);
    };

    const handleEditSelfSelectName = useCallback(isOpen => {
        setIsEditSelfSelectNameVisitable(isOpen);
    }, []);

    const DragHandle = sortableHandle(() => (
        <span className="sort__icon">
            <img src={hamburger} alt="sort"></img>
        </span>
    ));

    const SortableItem = sortableElement(({ value }) => (
        <li className="sortable__list__item">
            <span className="edit__icon" onClick={() => editGroupName(value)}>
                <img src={pen} alt="pen"></img>
            </span>
            <span className="self__select__name">{value.selectName}</span>
            <DragHandle />
        </li>
    ));

    const SortableContainer = sortableContainer(({ children }) => {
        return <ul className="sortable__list">{children}</ul>;
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setListContent(arrayMove(listContent, oldIndex, newIndex));
    };

    const save = () => {
        console.log(listContent);
    };

    return (
        <>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {listContent.map((value, index) => (
                    <SortableItem key={`item-${value.selectId}`} index={index} value={value} />
                ))}
            </SortableContainer>
            <EditSelectStock
                isVisible={isEditSelfSelectNameVisitable}
                editData={editGroupData}
                handler={handleEditSelfSelectName}
                handleComplete={handleComplete}
            />

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
