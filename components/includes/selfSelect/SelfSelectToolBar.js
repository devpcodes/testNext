import { Button } from 'antd';
import AddSelfSelect from '../selfSelect/AddSelfSelect';

const SelfSelectToolBar = () => {
    return (
        <>
            <div className="select__toolbar">
                <div className="select__toolbar__left">
                    <h2>我的自選</h2>
                    <AddSelfSelect />
                </div>
                <div className="select__toolbar__left">
                    <span>共 12/50 檔自選股</span>
                    <Button type="primary" loading>
                        reload
                    </Button>
                    <Button type="primary" loading>
                        編輯組合
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SelfSelectToolBar;
