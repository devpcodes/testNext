import React, { memo } from 'react';
import { Modal, Input } from 'antd';

const BirthdayChecker = function () {
    const { Search } = Input;
    const modal = Modal.confirm();
    const content = (
        <React.Fragment>
            <p>為保障您的電子交易安全，請輸入西元出生年月日共8碼進行驗證</p>
            <p>
                <Search
                    placeholder="請輸入西元出生年月日"
                    enterButton="驗證"
                    size="middle"
                    onSearch={value => check(value, modal)}
                    maxLength="8"
                />
                <br />
                (EX: 2001年2月3日，請輸入20010203，法人戶請輸入營利事業登記證登記日)
            </p>
        </React.Fragment>
    );
    modal.update({
        title: '憑證系統',
        content: content,
        cancelText: '取消',
        okButtonProps: { style: { display: 'none' } },
        onCancel() {
            localStorage.setItem('INCB', true);
            modal.destroy();
        },
    });
};

const check = function (value, modal) {
    localStorage.setItem('INCB', false);
    modal.destroy();
};

export default BirthdayChecker;
