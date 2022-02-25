import React from 'react';
import { Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

// import '../../styles/layouts/ColumnSearchForm.css';

const ColumnSearchProps = (dataIndex, searchInput, searchText, setSearchText, searchedColumn, setSearchedColumn) => {
    const handleSearch = (selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, setSearchText) => {
        clearFilters();
        setSearchText('');
    };

    const filterSettings = {
        filterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
            return (
                <div>
                    <Input
                        ref={node => {
                            searchInput = node;
                        }}
                        className="search-input"
                        placeholder="請輸入關鍵字"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    />
                    <Space className="search-group">
                        <Button
                            onClick={() => handleReset(clearFilters, setSearchText, setSearchText, setSearchedColumn)}
                        >
                            重置
                        </Button>
                        <Button
                            color="red"
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)
                            }
                            icon={<SearchOutlined />}
                        >
                            查詢
                        </Button>
                    </Space>
                </div>
            );
        },
        // Icon
        filterIcon(filtered) {
            return <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />;
        },
        // onfiler event
        onFilter(value, record) {
            if (record[dataIndex]) {
                return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
            } else {
                return '';
            }
        },
        // onFilterDropdownVisibleChange
        onFilterDropdownVisibleChange(visible) {
            if (visible) {
                setTimeout(() => {
                    searchInput.select();
                }, 100);
            }
        },
        // Render
        render(text) {
            return searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            );
        },
    };

    return filterSettings;
};

export default ColumnSearchProps;
