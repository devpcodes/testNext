import { Input, Space } from 'antd';
const { Search } = Input;

const AddSelfSelect = () => {
    const onSearch = () => {
        alert(123);
    };

    return (
        <>
            <Space direction="vertical">
                <Search
                    placeholder="輸入個股加入自選"
                    allowClear
                    enterButton="新增個股"
                    size="large"
                    onSearch={onSearch}
                />
            </Space>

            <style jsx>{``}</style>
            <style jsx global>{`
                .ant-btn-primary,
                .ant-btn-primary:focus,
                .ant-btn-primary:hover {
                    background: #c43826;
                    border-color: #c43826;
                }
            `}</style>
        </>
    );
};

export default AddSelfSelect;
