import { useState, useRef, useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
let defaultSrc = '/lykan/api/v1/auth/refreshCaptcha';
const SvgCaptcha = ({ style, getValue, refresh }) => {
    const [captchaSrc, setCaptchaSrc] = useState(defaultSrc);
    const [form] = Form.useForm();
    const captchaInput = useRef(null);
    const clickHandler = () => {
        setCaptchaSrc(defaultSrc + `?id=${Math.random().toString(36).substring(7)}`);
    };

    const changeHandler = e => {
        getValue(e.target.value);
    };

    useEffect(() => {
        setCaptchaSrc(defaultSrc + `?id=${Math.random().toString(36).substring(7)}`);
    }, [refresh]);

    return (
        <div className="captchaClass">
            <div style={style} style={{ position: 'relative', display: 'inline-block' }}>
                <div onClick={clickHandler}>
                    <ReloadOutlined
                        style={{
                            position: 'absolute',
                            right: '-10px',
                            top: '20px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
                <img src={captchaSrc} style={{ width: '120px', display: 'inline-block', userSelect: 'none' }} />
            </div>
            <Form.Item
                // style={{display: 'inline-block'}}
                name="captcha"
                label=""
                validateFirst
                rules={[
                    {
                        required: true,
                        message: '請輸入驗證碼',
                    },
                ]}
            >
                <Input
                    style={{
                        transition: 'none',
                        border: 'solid 1px #e6ebf5',
                        fontSize: '1.6rem',
                        height: '36px',
                    }}
                    placeholder="請輸入驗證碼，不區分大小寫"
                    ref={captchaInput}
                    onChange={changeHandler}
                />
            </Form.Item>
            <style jsx>{`
                .captchaClass {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
            <style global jsx>{`
                .captchaClass .ant-row.ant-form-item {
                    /* display: flex;
                    justify-content: space-between; */
                    margin-bottom: 0;
                    /* width: 70%; */
                    margin-top: 10px;
                    width: 100%;
                    margin-right: 1px;
                    margin-left: 20px;
                }
            `}</style>
        </div>
    );
};

export default SvgCaptcha;
