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
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </Space>
        </>
    );
};

export default AddSelfSelect;
