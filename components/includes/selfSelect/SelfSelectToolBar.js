import { useCallback, useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import AddSelfSelect from './AddSelfSelect';
import refresh from '../../../resources/images/pages/Self_select/basic-refresh-02.png';
import pen from '../../../resources/images/pages/Self_select/edit-edit.svg';
import AddSelectStock from '../editSelfSelectGroupBox/AddSelectStock';
import { fetchCheckSelfSelect } from '../../../services/selfSelect/checkSelectStatus';

// 換
import { setSelectInfo } from '../../../store/goOrder/action';

const SelfSelectToolBar = () => {
    const [isSelfSelectVisitable, setIsSelfSelectVisitable] = useState(false);
    const closeSelfSelect = useCallback(() => {
        setIsSelfSelectVisitable(false);
    }, []);
    const getSelect = useCallback(async () => {
        let exchange;
        const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
        switch (type) {
            case 'S':
                exchange = 'TAI';
                break;
            default:
                break;
        }
        const reqData = {
            symbol: code,
            exchange: exchange,
            market: type,
            isShowDetail: true,
            isSocalLogin: isSocalLogin,
            token: isSocalLogin ? getSocalToken() : getToken(),
        };
        const res = await fetchCheckSelfSelect(reqData);
        dispatch(setSelectInfo(res));
    });

    return (
        <>
            <div className="select__toolbar">
                <div className="select__toolbar__left">
                    <h2>我的自選</h2>
                    <AddSelfSelect />
                </div>
                <div className="select__toolbar__right">
                    <span>共 12/50 檔自選股</span>

                    <Button className="refresh__btn">
                        <img src={refresh} />
                    </Button>
                    <Button className="edit__group__btn">
                        <img src={pen} />
                        <span>編輯組合</span>
                    </Button>
                </div>
            </div>

            <AddSelectStock
                isVisible={isSelfSelectVisitable}
                handleClose={closeSelfSelect}
                isEdit={false}
                reloadSelect={getSelect}
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
            `}</style>
            <style jsx global>{`
                .select__toolbar__right .refresh__btn {
                    padding: 0px 0px;
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                }

                .select__toolbar__right .edit__group__btn {
                    padding: 0px 0px;
                    width: 120px;
                    height: 40px;
                    font-size: 1.6rem;
                }
                .edit__group__btn > span {
                    vertical-align: middle;
                }
                .edit__group__btn > img {
                    margin-right: 7px;
                }
                .ant-btn:hover {
                    background-color: #f3f6fe;
                    border: solid 1px #d7e0ef;
                    color: rgba(0, 0, 0, 0.65);
                }
            `}</style>
        </>
    );
};

export default SelfSelectToolBar;
