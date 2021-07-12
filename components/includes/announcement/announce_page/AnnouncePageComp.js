import { useEffect, useState, useCallback } from 'react';
import { Modal } from 'antd';
import { Input, Space  } from 'antd';

const { Search } = Input;
const onSearch = value => console.log(value);
const AnnouncePageComp = () => {
const [data, setData] = useState({}); 

// const getData = async (idx, size, type, sc1, sc2) => {
//     try{
//         const result = await GetAllListData(idx, size, type, sc1, sc2)
//         return result 
//     } catch(err) {
//         console.log('[ERROR]',err)
//         Modal.error({
//             title: '伺服器錯誤',
//         });
//     }
// }

    return (
        <div className="announce__container">
            <div className="content_area">
                <div className="content_box">
                <div className="title">
                <h2><span>最新公告</span></h2>
                <button href="#" className="btn_back">返回列表</button>
                </div>
                <div className="content_box_inside">
                    <div className="content_title">本公司各分公司營運正常，但自5月17日起，暫時關閉營業大廳電視牆之看盤服務</div>
                    <div className="content_class">
                        <div className="class_tag">發布日期<span>2021.05.24</span></div>
                        <div className="class_tag">商品類別<span className="orange">國內商品 台股</span></div>
                        <div className="class_tag">公告類別<span className="orange">全部</span></div>
                    </div>
                    <div className="content_detail">為因應疫情擴大，遵守中央指揮中心防疫升級政策減少人員群聚，及保護投資人的身體健康，
                    本公司各分公司營運正常，但自5月17日起，暫時關閉營業大廳電視牆之看盤服務。<br></br><br></br>
                    建議您可使用電子交易平台，進行股市行情查詢、下單交易、申請開戶及文件簽署等。如確有需要至分公司現場辦理，敬請配合本公
                    司實聯制及人流管制措施。<br></br><br></br>
                    再次提醒您防疫期間，需戴口罩勤洗手保持社交距離。</div>                    
                </div>
                </div>
                <div className="link_box">
                <div className="search_box">
                    <Space direction="vertical">
                    <Search 
                    placeholder="輸入關鍵字"  
                    allowClear  
                    enterButton="搜尋"
                    size="large" 
                    onSearch={onSearch}
                    />
                    </Space></div>                        
                    <div className="link_tag">相關公告</div>
                    <div className="link_list">
                        <div>本公司各分公司營運正常，但自5月17日起，暫時關閉電視牆之看盤服務
                            <div className="announce_date">2021.05.24</div>
                        </div>
                        <div>本公司各分公司營運正常，但自5月17日起，暫時關閉電視牆之看盤服務
                            <div className="announce_date">2021.05.24</div>
                        </div>
                        <div>本公司各分公司營運正常，但自5月17日起，暫時關閉電視牆之看盤服務
                            <div className="announce_date">2021.05.24</div>
                        </div>
                    </div>
                    <div className="ad_box">你被葉配了B-)</div>
                    <div className="link_tag">相關標籤</div>
                    <div className="tag_box">
                        <a href="#">美股</a>
                        <a href="#">台股</a>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .search_box {text-align:right;margin-bottom:29px;}
                
                    .announce__container {padding-left: 10%; padding-right: 10%;padding-top: 30px; }
                    @media (max-width: 1250px) {
                        .announce__container { padding-left: 5%;padding-right: 5%;}
                    }
                    @media (max-width: 1111px) {
                        .announce__container { padding-left: 20px;padding-right: 20px;}
                    }
                    .title { display: flex; justify-content: space-between;align-items: center;margin-bottom:20px; }
                    .title h2{ font-size: 2.8rem;color: #0d1623; margin-bottom: 0px; }
                    .btn_back{padding:0px 18px;border: solid 1px #e6ebf5;background-color:#FFF;font:16px PingFangTC;height:40px;}
                    .control__container { position: relative;}
                    .content_area { display: flex;margin-bottom:50px;}
                    .content_area .content_box{width: 100%;margin-right: 47px;}
                    .content_area .content_box .content_box_inside{ background-color: #FFF;padding: 32px; border-radius: 2px;min-height: calc(100% - 64px);
                        border: solid 1px #e6ebf5;}
                    .content_area .content_box .content_title{color: #0d1623;line-height: 1.4;letter-spacing: -0.3px;font:24px bold PingFangTC;
                        font-weight:600}
                    .content_area .content_box .content_class{color: #3f5372;display: flex;font:16px PingFangTC;padding:1em 0;}
                    .content_area .content_box .content_class .class_tag {margin-right:3em;}
                    .content_area .content_box .content_class .class_tag span{margin-left: 0.8em;}
                    .orange{color:#daa360}
                    .content_area .content_box .content_detail{color: #0d1623;line-height: 1.6;letter-spacing: -0.2px;font:16px PingFangTC;
                        padding-top: 1em; border-top: solid 1px #e6ebf5;}
                    .content_area .link_box{min-width: 346px;}
                    .content_area .link_box .ad_box{min-height:108px;line-height:108px;text-align:center;background-color:#CCC;margin-bottom:32px;}
                    .content_area .link_box .link_tag{font:20px PingFangTC;border-left: 4px solid #daa360; padding-left: 12px;line-height: 1;
                        font-weight:600}
                    .content_area .link_box .link_list{margin:23px 0;padding: 19px 32px;font:16px PingFangTC ;font-weight: 600; color:#0d1623;
                        border: solid 1px #e6ebf5; background-color: #FFF;}
                    .content_area .link_box .link_list>div{padding:13px 0;border-top: 1px solid #e6ebf5;}
                    .content_area .link_box .link_list>div:first-child{border-top: none;}
                    .content_area .link_box .link_list .announce_date{font:16px Roboto ;font-weight: normal; color:#a9b6cb;margin-top:8px}
                    .content_area .link_box .tag_box{margin-top:20px ;display:flex;}
                    .content_area .link_box .tag_box > a:not(:first-child) {margin-left:15px;}
                    .content_area .link_box .tag_box > a{padding:0.6em 1.5em;border: solid 1px #e6ebf5;background-color:#FFF;
                        font:16px PingFangTC;letter-spacing:0.4px;}
                    @media (max-width: 768px) {
                        .announce__container { padding-left: 0; padding-right: 0;}
                        .control__container {padding-left: 20px;padding-right: 20px; }
                        .title { font-size: 2rem; font-weight: bold; margin-top: -36px; margin-bottom: 10px; }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    body{background-color:#f9fbff;}
                    .search_box .ant-input-search-button { background-color: #c43826; border: #c43826; }
                    .search_box .ant-space-vertical { width:100%; }
                    `}
            </style>

        </div>
    );
};

export default AnnouncePageComp;
