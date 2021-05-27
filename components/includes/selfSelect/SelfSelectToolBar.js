import { Button } from 'antd';
import AddSelfSelect from '../selfSelect/AddSelfSelect';
import refresh from '../../../resources/images/pages/Self_select/basic-refresh-02.png';
import pen from '../../../resources/images/pages/Self_select/edit-edit.svg';

const SelfSelectToolBar = () => {
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
            `}</style>
        </>
    );
};

export default SelfSelectToolBar;
