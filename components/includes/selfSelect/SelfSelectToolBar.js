import { useCallback, useState, memo } from 'react';
import { Button } from 'antd';
import EditSelectGroup from './EditSelectGroup';
import AddSelfSelect from './AddSelfSelect';
import AddSelectGroup from './AddSelectGroup';
import refresh from '../../../resources/images/pages/Self_select/basic-refresh-02.png';
import pen from '../../../resources/images/pages/Self_select/edit-edit.svg';
import add from '../../../resources/images/pages/Self_select/edit-plus.svg';

const SelfSelectToolBar = memo(({ count, tabkey, reloadTabkey, isSocalLogin, reload, reloadSelectReloadTime }) => {
    const [isEditSelectGroupVisitable, setEditSelectGroupVisitable] = useState(false);
    const [isAddSelectGroupVisitable, setAddSelectGroupVisitable] = useState(false);

    const closeEditSelfGroup = useCallback(() => {
        setEditSelectGroupVisitable(false);
    }, []);

    const openEditSelfGroup = useCallback(() => {
        setEditSelectGroupVisitable(true);
    }, []);

    const closeAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(false);
    }, []);

    const openAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(true);
    }, []);

    return (
        <>
            <div className="select__toolbar">
                <div className="select__toolbar__left">
                    <h2>我的自選</h2>
                    <AddSelfSelect tabkey={tabkey} reloadSelectReloadTime={reloadSelectReloadTime} />
                </div>
                <div className="select__toolbar__right">
                    <span className="count">
                        共 {count}/50 檔{tabkey === '0' ? '庫存股' : '自選股'}
                    </span>

                    <Button className="refresh__btn">
                        <img src={refresh} onClick={reload} />
                    </Button>
                    {!isSocalLogin && (
                        <Button className="add__group__btn" onClick={openAddSelfGroup}>
                            <img src={add} />
                            <span className="add__group__btn__text">新增組合</span>
                        </Button>
                    )}
                    <Button className="edit__group__btn" onClick={openEditSelfGroup}>
                        <img src={pen} />
                        <span className="edit__group__btn__text">編輯組合</span>
                    </Button>
                </div>
            </div>

            <EditSelectGroup
                isEditSelectGroupVisitable={isEditSelectGroupVisitable}
                handleClose={closeEditSelfGroup}
                callBack={reload}
                tabkey={tabkey}
                reloadTabkey={reloadTabkey}
            />

            <AddSelectGroup
                isAddSelectGroupVisitable={isAddSelectGroupVisitable}
                handleClose={closeAddSelfGroup}
                callBack={reload}
                reloadTabkey={reloadTabkey}
            />
            <style jsx>{`
                .select__toolbar {
                    display: flex;
                    justify-content: space-between;
                }

                .select__toolbar__left {
                    display: flex;
                }
                .select__toolbar__left > h2 {
                    display: inline-block;
                    font-size: 2.6rem;
                    font-weight: bold;
                    margin: 0 28px 0 0;
                    padding: 0;
                }
                .select__toolbar__right > span {
                    font-size: 1.4rem;
                    color: #3f5372;
                    margin-right: 16px;
                }
                @media (max-width: 900px) {
                    .select__toolbar {
                        flex-direction: column;
                    }
                    .select__toolbar__right {
                        margin-top: 13px;
                    }
                }
                @media (max-width: 475px) {
                    .select__toolbar__left {
                        flex-direction: column;
                    }
                    .add__group__btn__text,
                    .edit__group__btn__text {
                        display: none;
                    }
                }
            `}</style>
            <style jsx global>{`
                .select__toolbar__right .refresh__btn {
                    padding: 0px 0px;
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                }

                .select__toolbar__right .edit__group__btn,
                .select__toolbar__right .add__group__btn {
                    padding: 0px 0px;
                    width: 120px;
                    height: 40px;
                    font-size: 1.6rem;
                }
                .edit__group__btn > span,
                .add__group__btn > span {
                    vertical-align: middle;
                }
                .edit__group__btn > img,
                .add__group__btn > img {
                    margin-right: 7px;
                }
                .add__group__btn {
                    margin-right: 10px;
                }
                .ant-btn:hover {
                    background-color: #f3f6fe;
                    border: solid 1px #d7e0ef;
                    color: rgba(0, 0, 0, 0.65);
                }
                .select__toolbar__left .add__stock__btn {
                    font-size: 1.4rem;
                }

                @media (max-width: 475px) {
                    .select__toolbar__right .edit__group__btn,
                    .select__toolbar__right .add__group__btn {
                        width: 40px;
                    }
                    .select__toolbar__right .edit__group__btn > img,
                    .select__toolbar__right .add__group__btn > img {
                        margin: 0;
                    }
                }
            `}</style>
        </>
    );
});

export default SelfSelectToolBar;
