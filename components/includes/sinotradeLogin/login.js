import React, {  useRef, useState } from 'react';
import logo from '../../../resorces/images/components/login/logo.png';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = function() {
    const [form] = Form.useForm();
    const accountInput = useRef(null);
    let account;

    const [encryptAccount, setEncryptAccount] = useState('');
    const [accountColor, setAccountColor] = useState('#737373');

    const fieldsChange = function(changedFields, allFields) {
        if(changedFields.length !== 0){
            if(changedFields[0].name[0] === 'account'){
                // encryptionHandler(changedFields[0].value)
                account = changedFields[0].value;
            }
        }
    }

    const encryptionHandler = function(str){
        if(str.length > 3){
            const firstStr = str.substr(0, 3);
            const lastStr = str.substr(7,9);
            let star = '';
            for (let index = 0; index < str.length - 3 ; index++) {
                if(index >= 4){
                    break;
                }
                star += '*';
            }
            str = firstStr + star + lastStr;
        }
        return str;
    }

    const blurHandler = function(){
        if(account){
            const encryptStr = encryptionHandler(account)
            setEncryptAccount(encryptStr)
            setAccountColor('white')
        }
    }

    const accClickHandler = function(){
        form.setFieldsValue({
            account: ''
        })
        setEncryptAccount('');
        setAccountColor('#737373');
        accountInput.current.focus();
    }

    const finishHandler = function(values){
        var errors = form.getFieldsError();
        errors = errors.filter((val) => {
            return val.errors.length !== 0;
        })
        if(errors.length === 0){
            alert('ajax')
        }
        // console.log('success', form.getFieldValue('remember'), values);
    }

    return (
        <div className="login__container">
            
            <div className="login__logo"></div>
            <p>歡迎來到永豐金證券</p>
            <Form form={form} name="complex-form" 
                onFieldsChange={fieldsChange} 
                onFinish={finishHandler} 
                initialValues={{remember: false}}
            >
                <div className="account__box">
                    <Form.Item 
                        hasFeedback
                        name="account" 
                        label=""
                        validateFirst
                        rules={[
                            {
                                required: true, message: '請輸入身份證字號' 
                            },
                            {
                                validator: (rule, value) => {
                                    const patt = /^[a-zA-Z0-9]{0,}$/
                                    if(patt.test(value)){
                                        return Promise.resolve()
                                    }else{
                                        return Promise.reject('含錯誤字元');
                                    }
                                }
                            }
                        ]}
                    >
                        <Input 
                            style={{ width: '100%', height: '54px', border: 'solid 1px #e6ebf5', fontSize: '1.8rem', color: accountColor}} 
                            placeholder="請輸入身份證字號" 
                            onBlur={blurHandler}
                            ref={accountInput}
                        />
                    </Form.Item>
                    <span style={{display: encryptAccount ? 'block' : 'none', color: '#737373', width: '100%'}} onClick={accClickHandler}>{encryptAccount}</span>
                </div>

                <Form.Item
                    hasFeedback
                    name="password"
                    label=""
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: '必填欄位',
                        },
                        {
                            validator: (rule, value) => {
                                if(value.length >= 7 && value.length <= 12){
                                    return Promise.resolve()
                                }else{
                                    return Promise.reject('輸入字數錯誤')
                                }
                            }
                        }
                    ]}
                >
                    <Input.Password placeholder="密碼(7-12位元)"  style={{ width: '100%', height: '54px', border: 'solid 1px #e6ebf5', fontSize: '1.8rem'}}/>
                </Form.Item>
                <div className='remember__box'>
                    <Form.Item
                        name='remember'
                        rules={[]}
                        noStyle
                        valuePropName= 'checked'
                    >
                        <Checkbox style={{fontSize: '1.8rem', color: '#0d1623'}}>
                            記住我的身份證字號
                        </Checkbox>
                    </Form.Item>
                    <span className="a__link forgetPassword">忘記密碼</span>
                </div>

                <Form.Item label="">
                    <Button type="primary" htmlType="submit" style={{marginTop: '20px'}}>
                        登入
                    </Button>
                </Form.Item>
            </Form>
            <p className="a__box"><a className="a__link">還不是永豐金證券客戶</a></p>
            <style jsx>{`
                .login__container {
                    padding: 0 20px;
                }
                .login__logo {
                    width: 8.7rem;
                    height: 9rem;
                    background: url(${logo}) no-repeat center center;
                    margin: 0 auto;
                    margin-top: 55px;
                }
                .input::placeholder{
                    font-size: 1.8rem;
                }
                .forgetPassword {
                    float: right;
                }
                .a__link {
                    font-size: 1.8rem;
                    color: #c43826;
                }
                p{
                    text-align: center;
                    font-size: 2.4rem;
                    font-weight: bold;
                    color: #0d1623;
                    margin-top: 20px;
                }
                .a__box {
                    margin-top: -10px;
                }
                .account__box{
                    position: relative;
                }
                .account__box span{
                    position: absolute;
                    top: 14px;
                    font-size: 1.8rem;
                    padding-left: 12px;
                }
            `}</style>
        </div>
    )
}

export default Login;