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
                        title: '??????????????????',
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
            <h1 className="container__title">????????????</h1>
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
                            label="?????????"
                            validateFirst
                            rules={[
                                {
                                    required: true,
                                    message: '??????????????????',
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
                                // placeholder="????????????????????????"
                                // onBlur={blurHandler}
                                // ref={accountInput}
                            />
                        </Form.Item>
                    </div>
                    <div className="newPassword__inp inp">
                        <Form.Item
                            hasFeedback
                            name="newPassword"
                            label="?????????"
                            validateFirst
                            rules={[
                                {
                                    required: true,
                                    min: 8,
                                    message: '?????????????????????8~20???',
                                },
                                {
                                    required: true,
                                    max: 20,
                                    message: '?????????????????????8~20???',
                                },
                                {
                                    validator: (rule, value) => {
                                        // const patt = /^[a-zA-Z0-9]{0,}$/;
                                        // if (patt.test(value)) {
                                        //     return Promise.resolve();
                                        // } else {
                                        //     return Promise.reject('???????????????');
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
                                // placeholder="????????????????????????"
                                // onBlur={blurHandler}
                                // ref={accountInput}
                            />
                        </Form.Item>
                    </div>
                    <div className="newPassword__confirm inp">
                        <Form.Item
                            hasFeedback
                            name="confirmPassword"
                            label="?????????????????????"
                            validateFirst
                            rules={[
                                {
                                    required: true,
                                    message: '????????????????????????',
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
                                // placeholder="????????????????????????"
                                // onBlur={blurHandler}
                                // ref={accountInput}
                            />
                        </Form.Item>

                        <div className="list__container">
                            {/* <p className="msg">
                                ???????????????????????????????????????????????????????????????????????????????????? 8~20
                                ?????????????????????????????????????????? ????????????????????????????????????????????????
                            </p> */}
                            <p className="list">
                                1. ?????????????????????????????? 8~20
                                ????????????????????????????????????????????????????????????(.!@$*~()`-)????????????????????????
                            </p>
                            <p className="list">
                                2.
                                ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                            </p>
                        </div>

                        <Form.Item label="">
                            <Button className="confirm__btn" htmlType="submit">
                                ????????????
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
