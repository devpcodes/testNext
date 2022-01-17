import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';

const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const isMobile = useCheckMobile();

    return (
        <div className="container">
            <h1 className="container__title">密碼修改</h1>
            <Form
                form={form}
                name="chPasswordForm"
                // onFieldsChange={fieldsChange}
                // onFinish={finishHandler}
                // initialValues={{ remember: false }}
            >
                <div className="oldPassword__inp inp">
                    <Form.Item
                        hasFeedback
                        name="oldPassword"
                        label="舊密碼"
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: '請輸入舊密碼',
                            },
                            {
                                validator: (rule, value) => {
                                    const patt = /^[a-zA-Z0-9]{0,}$/;
                                    if (patt.test(value)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('含錯誤字元');
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            style={{
                                transition: 'none',
                                height: '35px',
                                border: 'solid 1px #e6ebf5',
                                // fontSize: accountFontSize,
                            }}
                            // placeholder="請輸入身份證字號"
                            // onBlur={blurHandler}
                            // ref={accountInput}
                        />
                    </Form.Item>
                </div>
                <div className="newPassword__inp inp">
                    <Form.Item
                        hasFeedback
                        name="newPassword"
                        label="新密碼"
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: '請輸入舊密碼',
                            },
                            {
                                validator: (rule, value) => {
                                    const patt = /^[a-zA-Z0-9]{0,}$/;
                                    if (patt.test(value)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('含錯誤字元');
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            style={{
                                transition: 'none',
                                height: '35px',
                                border: 'solid 1px #e6ebf5',
                                // fontSize: accountFontSize,
                            }}
                            // placeholder="請輸入身份證字號"
                            // onBlur={blurHandler}
                            // ref={accountInput}
                        />
                    </Form.Item>
                </div>
                <div className="newPassword__confirm inp">
                    <Form.Item
                        hasFeedback
                        name="confirmPassword"
                        label="再次輸入新密碼"
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: '請輸入舊密碼',
                            },
                            {
                                validator: (rule, value) => {
                                    const patt = /^[a-zA-Z0-9]{0,}$/;
                                    if (patt.test(value)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('含錯誤字元');
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            style={{
                                transition: 'none',
                                height: '35px',
                                border: 'solid 1px #e6ebf5',
                                // fontSize: accountFontSize,
                            }}
                            // placeholder="請輸入身份證字號"
                            // onBlur={blurHandler}
                            // ref={accountInput}
                        />
                    </Form.Item>
                </div>
            </Form>
            <p className="msg">
                為了保障您的密碼與帳戶的安全，建議您網路交易密碼長度介於 7~12
                字元，且同時具有數字與英文字母，帳戶密碼應每三個月至少變更一次。
            </p>
            <Button className="confirm__btn">確認修改</Button>
            <style jsx>{`
                .container {
                    text-align: center;
                    padding-top: 30px;
                }
                .container__title {
                    font-weight: 800;
                    font-size: 25px;
                }
                .inp {
                    width: ${isMobile ? '90%' : '30%'};
                    margin: 0 auto;
                    min-width: ${isMobile ? 'unset' : '400px'};
                }
                .msg {
                    width: ${isMobile ? '90%' : '30%'};
                    text-align: left;
                    font-size: 16px;
                    margin: 0 auto;
                    min-width: ${isMobile ? 'unset' : '400px'};
                    padding-left: ${isMobile ? '0px' : '15px'};
                }
            `}</style>
            <style jsx global>{`
                .container .ant-form-item-label > label {
                    font-size: 16px;
                }
                .container .ant-col {
                    width: 35%;
                }
                .confirm__btn {
                    margin-top: 20px;
                    width: 150px;
                    font-size: 16px;
                    height: 40px;
                    margin-top: 20px;
                    margin-bottom: 30px;
                }
                .container .ant-btn:hover {
                    border: 1px solid #666666;
                    color: rgb(0 0 0);
                }
            `}</style>
        </div>
    );
};
export default ChangePasswordPage;
