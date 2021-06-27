import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Space } from 'antd';
import useSWR from 'swr';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';
import { fetchDeletSelectGroup } from '../../../services/selfSelect/deleteSelectGroup';
import ReactDragListView from 'react-drag-listview';

import EditGroupName from './EditGroupName';

import pen from '../../../resources/images/components/goOrder/edit-edit.svg';
import hamburger from '../../../resources/images/components/goOrder/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';

const SelectGroupList = ({ callBack }) => {
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
    const token = isSocalLogin ? getSocalToken() : getToken();

    const [selfSelectGroup, setSelfSelectGroup] = useState([]);
    const [isVisibleEditGroupName, setIsVisibleEditGroupName] = useState(true);

    const { data: fetchSelectGroupData } = useSWR([isSocalLogin, token], fetchQuerySelectGroup, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    useEffect(() => {
        setSelfSelectGroup(fetchSelectGroupData);
    }, [fetchSelectGroupData]);

    const dragProps = {
        async onDragEnd(fromIndex, toIndex) {
            const data = JSON.parse(JSON.stringify(selfSelectGroup));
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            console.log(data);
            setSelfSelectGroup(data);
        },
        nodeSelector: '.group_list_item',
        handleSelector: '.sort__icon',
    };

    const delGroup = (selectId, selectName) => {
        Modal.confirm({
            title: '提醒',
            content: `你確定要刪除自選組合「${selectName}」?`,
            okText: '確定',
            cancelText: '取消',
            onOk: () => {
                const data = JSON.parse(JSON.stringify(selfSelectGroup));
                data.map(async (val, idx) => {
                    if (selectId === val.selectId) {
                        data.splice(idx, 1);
                        setSelfSelectGroup(data);

                        const res = await fetchDeletSelectGroup(val.selectId, getToken());
                        console.log(res);
                        if (typeof callBack === 'function') {
                            callBack();
                        }
                    }
                });
            },
        });
    };

    const openEditGroupName = () => {};

    return (
        <>
            <ul className="group_ul">
                <ReactDragListView {...dragProps}>
                    {!!selfSelectGroup &&
                        selfSelectGroup.map((val, key) => {
                            return (
                                <li className="group_list_item" key={key}>
                                    <span
                                        className="edit__icon"
                                        onClick={() => openEditGroupName(val.selectId, val.selectName)}
                                    >
                                        <img src={pen} alt="編輯名稱"></img>
                                    </span>
                                    <span className="group__name">{val.selectName}</span>
                                    <span className="del__icon" onClick={() => delGroup(val.selectId, val.selectName)}>
                                        <img src={cancel} alt="刪除"></img>
                                    </span>

                                    <span className="sort__icon">
                                        <img src={hamburger} alt="排序"></img>
                                    </span>
                                </li>
                            );
                        })}
                </ReactDragListView>
            </ul>
            <EditGroupName isVisible={isVisibleEditGroupName} />
            <style jsx>{`
                .group_ul {
                    padding: 12px 0;
                    margin: 0;
                }

                .group_list_item {
                    list-style: none;
                    padding: 11px 24px;
                    font-size: 1.6rem;
                    z-index: 17000;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                }
                .group_list_item .group__name {
                    align-self: flex-end;
                    flex: auto;
                    padding: 0 8px;
                }
                .group_list_item .edit__icon {
                    cursor: pointer;
                }
                .sort__icon {
                    cursor: move;
                    vertical-align: bottom;
                    float: right;
                }
                .del__icon {
                    cursor: pointer;
                    vertical-align: bottom;
                    float: right;
                    margin-right: 15px;
                }
            `}</style>
            <style jsx global>{`
                .ant-modal-body {
                    padding: 0;
                }
            `}</style>
        </>
    );
};

export default SelectGroupList;

// import React, { memo, useState, useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
// import arrayMove from 'array-move';
// import EditSelectStock from '../selfSelectStock/EditSelectStock';

// import pen from '../../../../resources/images/components/goOrder/edit-edit.svg';
// import hamburger from '../../../../resources/images/components/goOrder/menu-hamburger.svg';

// const sortableList = memo(({ handleCheckedSort }) => {
//     const selectInfo = useSelector(store => store.goOrder.selectInfo);
//     const [listContent, setListContent] = useState(selectInfo.data);
//     const [isEditSelfSelectNameVisitable, setIsEditSelfSelectNameVisitable] = useState(false);
//     const [editGroupData, setEditGroupData] = useState({});

//     useEffect(() => {
//         setListContent(selectInfo.data);
//     }, [selectInfo]);

//     const updateSortList = data => {
//         listContent.forEach(element => {
//             if (element.selectId === data.selectId) {
//                 element.selectName = data.selectName;
//             }
//         });
//     };

//     const editGroupName = value => {
//         setEditGroupData(value);
//         setIsEditSelfSelectNameVisitable(true);
//     };

//     const handleEditSelfSelectName = useCallback(isOpen => {
//         setIsEditSelfSelectNameVisitable(isOpen);
//     }, []);

//     const DragHandle = sortableHandle(() => (
//         <span className="sort__icon">
//             <img src={hamburger} alt="sort"></img>
//         </span>
//     ));

//     const SortableItem = sortableElement(({ value }) => (
//         <li className="sortable__list__item">
//             <span className="edit__icon" onClick={() => editGroupName(value)}>
//                 <img src={pen} alt="pen"></img>
//             </span>
//             <span className="self__select__name">{value.selectName}</span>
//             <DragHandle />
//         </li>
//     ));

//     const SortableContainer = sortableContainer(({ children }) => {
//         return <ul className="sortable__list">{children}</ul>;
//     });

//     const onSortEnd = ({ oldIndex, newIndex }) => {
//         setListContent(arrayMove(listContent, oldIndex, newIndex));
//         handleCheckedSort(arrayMove(listContent, oldIndex, newIndex));
//     };

//     return (
//         <>
//             <SortableContainer onSortEnd={onSortEnd} useDragHandle>
//                 {listContent.map((value, index) => (
//                     <SortableItem key={`item-${value.selectId}`} index={index} value={value} />
//                 ))}
//             </SortableContainer>
//             <EditSelectStock
//                 isVisible={isEditSelfSelectNameVisitable}
//                 editData={editGroupData}
//                 handler={handleEditSelfSelectName}
//                 reloadSelect={updateSortList}
//             />

//             <style jsx global>{`
//                 .sortable__list {
//                     list-style: none;
//                     padding: 0;
//                     margin: 0;
//                 }
//                 .sortable__list__item {
//                     list-style: none;
//                     padding: 11px 0;
//                     font-size: 1.6rem;
//                     z-index: 17000;
//                     background: #fff;
//                     display: flex;
//                     justify-content: space-between;
//                 }
//                 .sortable__list__item .self__select__name {
//                     align-self: flex-end;
//                     flex: auto;
//                     padding: 0 8px;
//                 }
//                 .sortable__list__item .edit__icon {
//                     cursor: pointer;
//                 }
//                 .sort__icon {
//                     cursor: move;
//                     vertical-align: bottom;
//                     float: right;
//                 }
//             `}</style>
//         </>
//     );
// });

// export default sortableList;
