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
                <div className="select__toolbar__right">
                    <span>共 12/50 檔自選股</span>

                    <Button type="primary" loading></Button>
                    <Button type="primary" loading>
                        {' '}
                        編輯組合{' '}
                    </Button>
                </div>
            </div>

            {/* icon={<DownloadOutlined />} */}

            <style jsx>{`
                .select__toolbar {
                    display: flex;
                }
                .select__toolbar__left {
                    display: flex;
                }
                .select__toolbar__left > h2 {
                    font-size: 2.8rem;
                    font-weight: bold;
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </>
    );
};

export default SelfSelectToolBar;
