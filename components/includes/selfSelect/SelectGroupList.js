import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Space } from 'antd';
import useSWR from 'swr';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';
import { fetchDeletSelectGroup } from '../../../services/selfSelect/deleteSelectGroup';
import { fetchUpdateSelectGroup } from '../../../services/selfSelect/updateSelectGroup';

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
    const [isVisibleEditGroupName, setIsVisibleEditGroupName] = useState(false);
    const [selectGroupName, setSelectGroupName] = useState('');
    const [selectGroupID, setSelectGroupID] = useState(null);
    const [reloadtime, setreloadTime] = useState('');

    const { data: fetchSelectGroupData } = useSWR([isSocalLogin, token, reloadtime], fetchQuerySelectGroup, {
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
            const res = await fetchUpdateSelectGroup(data, isSocalLogin, token);
            if (res.success === true && res.message === 'OK') {
                setSelfSelectGroup(data);
                if (typeof callBack === 'function') {
                    callBack();
                }
            }
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

    const openEditGroupName = (selectId, selectName) => {
        setSelectGroupName(selectName);
        setSelectGroupID(selectId);
        setIsVisibleEditGroupName(true);
    };

    const closeEditGroupName = useCallback(() => {
        setIsVisibleEditGroupName(false);
        if (typeof callBack === 'function') {
            callBack();
        }
        setreloadTime(new Date().getTime());
    });

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
            <EditGroupName
                isVisible={isVisibleEditGroupName}
                selectGroupName={selectGroupName}
                selectGroupID={selectGroupID}
                closeHandler={closeEditGroupName}
            />
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
