import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';
import ReactDragListView from 'react-drag-listview';

import pen from '../../../resources/images/components/goOrder/edit-edit.svg';
import hamburger from '../../../resources/images/components/goOrder/menu-hamburger.svg';
const SelectGroupList = () => {
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
    const token = isSocalLogin ? getSocalToken() : getToken();

    const [selfSelectGroup, setselfSelectGroup] = useState([]);

    const { data: fetchSelectGroupData } = useSWR([isSocalLogin, token], fetchQuerySelectGroup, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    useEffect(() => {
        setselfSelectGroup(fetchSelectGroupData);
    }, [fetchSelectGroupData]);

    const dragProps = {
        async onDragEnd(fromIndex, toIndex) {
            const data = JSON.parse(JSON.stringify(selfSelectGroup));
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            console.log(data);
            setselfSelectGroup(data);
        },
        nodeSelector: '.group_list_item',
        handleSelector: '.sort__icon',
    };

    return (
        <>
            <ul className="group_ul">
                <ReactDragListView {...dragProps}>
                    {!!selfSelectGroup &&
                        selfSelectGroup.map((val, key) => {
                            return (
                                <li className="group_list_item" key={key}>
                                    <span className="edit__icon">
                                        <img src={pen} alt="編輯名稱"></img>
                                    </span>
                                    <span className="group__name">{val.selectName}</span>
                                    <span className="sort__icon">
                                        <img src={hamburger} alt="排序"></img>
                                    </span>
                                </li>
                            );
                        })}
                </ReactDragListView>
            </ul>

            <style jsx>{`
                .group_ul {
                    padding: 12px 22px;
                    margin: 0;
                }

                .group_list_item {
                    list-style: none;
                    padding: 11px 0;
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
