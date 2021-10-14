import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { checkBirthday } from '../../services/checkBirthday';
import { getToken } from '../../services/user/accessToken';
import { logout } from '../../services/user/logoutFetcher';
import { getCurrentPath } from '../../services/getCurrentPath';
const BirthdayChecker = cb => {
    const { Search } = Input;
    const modal = Modal.confirm();
    let errorTimes = 0;
    const style = {
        display: 'none',
        color: '#c43826',
    };
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
                <p id="birthday__error" style={style}>
                    生日驗證錯誤，請重新輸入。
                </p>
                (EX: 2001年2月3日，請輸入20010203，法人戶請輸入營利事業登記證登記日)
            </div>
        </React.Fragment>
    );
    modal.update({
        title: '憑證系統',
        content: content,
        cancelText: '取消',
        okButtonProps: { style: { display: 'none' } },
        onCancel: async function () {
            await logout();
            window.location = `${process.env.NEXT_PUBLIC_SUBPATH}/SinoTrade_login`;
        },
    });

    const check = async function (value, modal) {
        let res = await checkBirthday(getToken(), value);
        if (res.success === 'True') {
            localStorage.setItem('INCB', false);
            modal.destroy();
            if (typeof cb === 'function') {
                cb();
            }
        } else {
            errorTimes = errorTimes + 1;
            document.getElementById('birthday__error').style.display = 'block';
            if (errorTimes === 3) {
                await logout();
                Modal.error({
                    content: '輸入錯誤出生年月日超過三次，請重新登入。',
                    onOk() {
                        window.location = `${
                            process.env.NEXT_PUBLIC_SUBPATH
                        }/SinoTrade_login?currentPath=${encodeURIComponent(getCurrentPath())}`;
                    },
                });
            }
        }
    };
};

export default BirthdayChecker;
