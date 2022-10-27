import { Form, Input, Button, Checkbox, Modal } from 'antd';
// import { useRouter } from 'next/router';
import MD5 from 'crypto-js/md5';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { verifyHandler } from '../../../../services/validator';
import { getToken } from '../../../../services/user/accessToken';
import { postPasswordEdit } from '../../../../services/components/changePasswordPage/postPasswordEdit';
import { setModal } from '../../../../store/components/layouts/action';
import { logout } from '../../../../services/user/logoutFetcher';
const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const isMobile = useCheckMobile();
    // const currentAccount = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    // const router = useRouter();

    const finishHandler = async function () {
        var errors = form.getFieldsError();
        errors = errors.filter(val => {
            return val.errors.length !== 0;
        });
        if (errors.length === 0) {
            const newPwd = MD5(form.getFieldValue('newPassword')).toString();
            const oldPwd = MD5(form.getFieldValue('oldPassword')).toString();
            // const user_id = currentAccount.idno;
            const token = getToken();
            let data = jwt_decode(token);
            // console.log('data', data);
            const user_id = data.user_id;
            try {
                const res = await postPasswordEdit(token, user_id, newPwd, oldPwd);
                Modal.success({
                    content: `${res}`,
                    onOk: async () => {
                        await logout();
                        // router.replace(router.pathname, `/SinoTrade_login`, { shallow: true });
                        window.location = `${process.env.NEXT_PUBLIC_SUBPATH}` + '/SinoTrade_login';
                    },
                });
            } catch (error) {
                dispatch(
                    setModal({
                        visible: true,
                        content: `${error}`,
                        type: 'info',
                        icon: false,
                        title: '更改密碼失敗',
                        onOk: async () => {
                            dispatch(setModal({ visible: false }));
                        },
                    }),
                );
            }
        }
    };
    return (
        <div className="container">
            <h1 className="container__title">密碼修改</h1>
            <div className="form__container">
                <Form
                    form={form}
                    name="chPasswordForm"
                    // onFieldsChange={fieldsChange}
                    onFinish={finishHandler}
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
                                        return verifyHandler('oldPasswordCheck', value);
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
                                    min: 8,
                                    message: '密碼長度請輸入8~20位',
                                },
                                {
                                    required: true,
                                    max: 20,
                                    message: '密碼長度請輸入8~20位',
                                },
                                {
                                    validator: (rule, value) => {
                                        // const patt = /^[a-zA-Z0-9]{0,}$/;
                                        // if (patt.test(value)) {
                                        //     return Promise.resolve();
                                        // } else {
                                        //     return Promise.reject('含錯誤字元');
                                        // }
                                        return verifyHandler('passwordCheck', value, form.getFieldValue('oldPassword'));
                                    },
                                },
                                {
                                    validator: (rule, value) => {
                                        return verifyHandler('oldPasswordCheck', value);
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
                                    message: '請再次輸入新密碼',
                                },
                                {
                                    validator: (rule, value) => {
                                        return verifyHandler(
                                            'confirmPassword',
                                            value,
                                            form.getFieldValue('newPassword'),
                                        );
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

                        <div className="list__container">
                            {/* <p className="msg">
                                為了保障您的密碼與帳戶的安全，建議您網路交易密碼長度介於 8~20
                                字元，且四選三以下四種組合， 帳戶密碼應每三個月至少變更一次。
                            </p> */}
                            <p className="list">
                                1. 電子交易密碼長度需為 8~20
                                字元，且至少包含大寫英文、小寫英文、符號(.!@$*~()`-)、數字，其中三種
                            </p>
                            <p className="list">
                                2.
                                請妥善保管，不與他人分享您的帳號密碼，針對重要的金融帳號設定不同的專屬密碼，切勿與網路購物密碼相同，帳戶密碼應每三個月至少變更一次。
                            </p>
                        </div>

                        <Form.Item label="">
                            <Button className="confirm__btn" htmlType="submit">
                                確認修改
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>

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
                    min-width: ${isMobile ? '90%' : '400px'};
                }
                .msg {
                    width: ${isMobile ? '100%' : '30%'};
                    text-align: left;
                    font-size: 16px;
                    /* margin: 0 auto; */
                    min-width: ${isMobile ? 'unset' : '400px'};
                    padding-left: ${isMobile ? '0px' : '15px'};
                    margin-bottom: 0;
                }
                .list {
                    text-align: left;
                    padding-left: 15px;
                    padding-top: 8px;
                    margin-bottom: -3px;
                    padding-left: ${isMobile ? '0px' : '15px'};
                }
                .list__container {
                    // width: ${isMobile ? '100%' : '30%'};
                    margin: 0 auto;
                    text-align: left;
                }
                .form__container {
                    width: ${isMobile ? '100%' : '30%'};
                    margin: 0 auto;
                    min-width: ${isMobile ? 'unset' : '400px'};
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
                .container .ant-form-item-explain {
                    text-align: left;
                }
                .container .ant-btn:active {
                    border: 1px solid #666666;
                    color: rgb(0 0 0);
                }
            `}</style>
        </div>
    );
};
export default ChangePasswordPage;
