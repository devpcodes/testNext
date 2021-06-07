import { Button } from 'antd';
const OAuthCancelMain = () => {
    return (
        <>
            <div className="content_box">
            <div className="oac_title">第三方授權設定</div>
                <div className="sub_text">這些是你使用永豐金證券帳號登入過的應用程式或網站，你可以自由地解除與他們之間的授權。</div>
            <ul className="item_list">
                <li>
<div className="list_img"></div>
<div className="text_area">
    <div className="t1">大戶 DAWHO </div>
    <div className="t2">2022年4月5日新增</div>
</div>
<div className="btn_box"><a className="btn_r">解除<span>授權</span></a></div>
                </li>

            </ul>
            </div>
            <style jsx>{`
            .content_box{max-width:776px;margin: 0px auto; padding-top:100px;}
            .list_img{width:68px;height:68px;flex-shrink: 0;margin:0 20px 0 0;  border-radius: 2px; 
                border: solid 1px #d7e0ef;}
            .text_area{  width: 100%;display: flex;  flex-wrap: wrap;  align-items: center;}
            .btn_box{margin:0 0 0 20px;flex-shrink: 0;display: flex; align-items: center;}
            .t1{width: 100%;
                font-family: Roboto;font-size: 16px;font-weight: 500;
                line-height: 1.5;letter-spacing: -0.2px;color: #0d1623;}
            .t2{width: 100%;
                font-family: PingFang TC/Arial; font-size: 16px; line-height: 1.5;
                letter-spacing: 0.4px;color: #6c7b94;}
            .btn_r {
                padding: 0 0.5em;line-height: 2.2;font-size:14px;text-align: center;
                margin: 0 auto;word-break: keep-all;color:white;
                border-radius: 2px;border: solid 1px rgba(37, 74, 145, 0);
                background-color: #c43826;
              }
            .oac_title{ margin: 0 578px 12px 1px;
                font-family: PingFang TC; font-size: 28px;
                font-weight: 700; color: #0d1623;}
            .sub_text{ width: 774px;  height: 22px;
                margin: 12px 0 28px 2px;
                font-family: PingFang TC;
                font-size: 16px; font-weight: 700; font-stretch: normal;
                font-style: normal;  line-height: normal; letter-spacing: 0.4px;color: #6c7b94
                }
            .item_list{ width:776px;   margin: 28px 0 0;
                padding:0; list-style:none; border-radius: 2px;
                border: solid 1px #d7e0ef; background-color: #ffffff;
            }
            .item_list li{  width: 100%;
                padding: 20px; border-bottom: solid 1px #d7e0ef; display:flex
            }
            .item_list li:last-child{ border-bottom: none; }
            @media(max-width:768px){
                .content_box{width:100%;padding:0}
                .content_box{}
                .list_img{width:52px;height:52px;}
                .text_area{ width: calc(100% - 105px);}
                .btn_box{margin-left:16px;}
                .oac_title{font-size:20px; margin: 0;padding: 20px 16px;}
                .sub_text{display:none}
                .item_list {width:100%;margin:0;border-width:1px 0;border-radius:0;}
                .item_list li{padding:16px}
                .btn_r span{display:none}
            }
            `}</style>
              <style jsx global>{`
                body{background-color: #f9fbff;}
            `}</style>
        </>
    );
};

export default OAuthCancelMain;