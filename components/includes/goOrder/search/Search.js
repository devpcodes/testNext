import { memo } from 'react';
import PropTypes from 'prop-types';

import { Modal, AutoComplete } from 'antd';
import { useDispatch } from 'react-redux';
import { setCode } from '../../../../store/goOrder/action';

const options = [{ value: '2330' }, { value: '0050' }, { value: '2345' }, { value: '2890' }];

export const Search = memo(({ isVisible, handleCancel }) => {
    const dispatch = useDispatch();
    const selectHandler = value => {
        console.log(value);
        dispatch(setCode(value));
    };

    return (
        <Modal title="Search" visible={isVisible} onCancel={handleCancel} footer={null}>
            <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="search"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                allowClear={true}
                onSelect={selectHandler}
            />
        </Modal>
    );
});

Search.displayName = 'goOrder-search';

Search.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};
