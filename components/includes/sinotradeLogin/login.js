import React, {  useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import logo from '../../../resorces/images/components/login/logo.png';
import check from '../../../resorces/images/components/login/ic-check.png';
import close from '../../../resorces/images/components/login/ic-closemenu.png';

const Login = function({isPC, onClose}) {
    const [form] = Form.useForm();
    const accountInput = useRef(null);
    let account;

    const [encryptAccount, setEncryptAccount] = useState('');
    const [accountFontSize, setAccountFontSize] = useState('1.8rem');

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
            setAccountFontSize('0rem');
        }
    }

    const accClickHandler = function(){
        form.setFieldsValue({
            account: ''
        })
        setEncryptAccount('');
        setAccountFontSize('1.8rem');
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
            <div className="login__box">
                {isPC ? 
                    <div className="close" onClick={onClose}>
                        <span className="close__img"></span>
                    </div> : null
                }
                {isPC ? null : <div className="login__logo"></div>}
                <p className="login__title">歡迎來到永豐金證券</p>
                {isPC ? 
                    <div className="loginService__box">
                        <span className="service__title">登入後享受更多服務</span>
                        <div className="service__infoBox">
                            <span className="service__item">下單交易</span>
                            <span className="service__item">帳務損益</span>
                            <span className="service__item">更多個人化服務</span>
                        </div>
                    </div>: 
                    null
                }
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
                                style={{transition: 'none', width: '100%', height: '54px', border: 'solid 1px #e6ebf5', fontSize: accountFontSize}} 
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
                                    if(value.length >= 4 && value.length <= 12){
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
            </div>
            <div className="overLay" onClick={onClose}></div>
            <style jsx>{`
                .login__container {
                    position: relative;
                    
                }
                .close {
                    width: 52px;
                    height: 52px;
                    background-color: #0d1623;
                    position: absolute;
                    top: -52px;
                    right: 0;
                    cursor: pointer;
                }
                .close__img {
                    background: url(${close}) no-repeat center center;
                    width: 32px;
                    height: 33px;
                    margin-top: 10px;
                    margin-left: 10px;
                    display: inline-block;
                    transition: all .1s;
                }
                .close__img:hover {
                    transform: scale(0.9, 0.9) translateZ(0);
                }
                .login__box {
                    position: absolute;
                    width: ${isPC ? '512px' : '100%'};
                    height: 548px;
                    z-index: 9999;
                    top: ${isPC ? 'calc((100vh - 548px)/2)' : '0'};
                    left: 50%;
                    transform: translate(-50%, 0);
                    padding: ${isPC ? '0 41px' : '0 20px'};
                    background-color: #f9fbff;
                }
                .overLay {
                    position: fixed;
                    display: ${isPC ? 'block' : 'none'};
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 2;
                    cursor: pointer;
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
                .login__title {
                    font-size: ${isPC ? '3.6rem' : '2.4rem'};
                    text-align: ${isPC ? 'left' : 'center'};
                    margin-top: ${isPC ? '42px' : '20px'};
                    margin-bottom: ${isPC ? '6px' : '20px'};
                }
                .service__title {
                    display: block;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-top: -5px;
                }
                .service__item {
                    display: inline-block;
                    width: calc(100% / 3);
                    color: #7086b1;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin: 17px 0;
                    position: relative;
                }
                .service__item::before {
                    content: url(${check});
                    position: absolute;
                    top: 3px;
                    left: -25px;
                }
                .service__infoBox {
                    padding-left: 25px;
                    margin-bottom: 10px;
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

Login.propTypes = {
    isPC: PropTypes.bool,
    onClose: PropTypes.func
}

export default Login;