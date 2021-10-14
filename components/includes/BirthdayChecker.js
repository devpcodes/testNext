import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { checkBirthday } from '../../services/checkBirthday';
import { getToken } from '../../services/user/accessToken';

const BirthdayChecker = (setss, getss) => {
    const { Search } = Input;
    const modal = Modal.confirm();
    let errorTimes = 0;
    const content = (
        <React.Fragment>
            <p>為保障您的電子交易安全，請輸入西元出生年月日共8碼進行驗證</p>
            <div>
                <Search
                    placeholder="請輸入西元出生年月日"
                    enterButton="驗證"
                    size="middle"
                    onSearch={value => check(value, modal)}
                    maxLength="8"
                />
                <p id="tttttt">123123123123123123123</p>
                (EX: 2001年2月3日，請輸入20010203，法人戶請輸入營利事業登記證登記日)
            </div>
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

    const check = async function (value, modal) {
        let res = await checkBirthday(getToken(), value);
        if (res.success === 'True') {
            localStorage.setItem('INCB', false);
            modal.destroy();
        } else {
            errorTimes = errorTimes + 1;
            console.log(errorTimes);
        }
    };
};

export default BirthdayChecker;
