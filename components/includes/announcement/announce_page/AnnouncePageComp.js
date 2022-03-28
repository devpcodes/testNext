import { useEffect, useState, useCallback ,useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import { Modal } from 'antd';
import { Input, Space  } from 'antd';
import { GetArticleData } from '../../../../services/components/announcement/announceList';
import { getParamFromQueryString } from '../../../../services/getParamFromQueryString';
import icArrowLeft from '../../../../resources/images/components/announcement/ic-arrow-left.svg';

const { Search } = Input;
const onSearch = value => console.log(value);

const AnnouncePageComp = () => {
const [data, setData] = useState({}); 
const [tag, setTag] = useState([]); 
const [refRows, setRefRows] = useState([]); 
const [refresh, setRefresh] = useState(''); 
const keyWord  = useSelector(store => store.announcement.keyWord);
const dispatch = useDispatch();
useEffect(() =>{ 
    const GetNewData = async()=>{
        try {
            let id = getParamFromQueryString('GUID'); //GUID
            let count =  '3'; //相關公告筆數
            getData(id, count)
            .then(res=>{
                setData(res)  
                setTag(res.keyWord)
                setRefRows(res.refRows)
            })
            } catch(error) {
            console.log('[error]',error)
            }
        }  
    GetNewData()  
},[refresh])

const getData = async (id, count) => {
    try{
        const result = await GetArticleData(id, count)
        return result 
    } catch(err) {
        console.log('[ERROR]',err)
        Modal.error({
            title: '伺服器錯誤',
        });
    }
}
const addKw = (e,x) => {
    //e.preventDefault();
    dispatch({
        type: "CHANGE_ITEM",
        payload: {itemNew:x}
    }); 
}

    return (
        <div className="announce__container">
            <div className="content_area">
                <div className="content_box">
                <div className="title">
                <h2><span>最新公告</span></h2>
                <a href={`${process.env.NEXT_PUBLIC_SUBPATH}/Announcement`} className="btn_back for_pc">返回列表</a>
                </div>
                <div className="search_box for_m">
                    <a href={`${process.env.NEXT_PUBLIC_SUBPATH}/Announcement`} className="btn_back for_m">
                        <img src={icArrowLeft}></img>
                    </a>
                    <Space direction="vertical">
                    <Search 
                    placeholder="輸入關鍵字"  
                    allowClear  
                    enterButton="搜尋"
                    size="large" 
                    onSearch={onSearch}
                    />
                    </Space>
                    </div> 
                <div className="content_box_inside">
                    <div className="content_title">{data.title}</div>
                    <div className="content_class">
                        <div className="class_tag">發布日期<span>2021.05.24</span></div>
                        <div className="class_tag">商品類別<span className="orange">{data.category1+' '+data.category2}</span></div>
                        <div className="class_tag">公告類別<span className="orange">{data.type}</span></div>
                    </div>
                    <div className="content_detail" dangerouslySetInnerHTML={{__html:data.contents}}></div>                    
                </div>
                </div>
                <div className="link_box">
                <div className="search_box for_pc">
                    <Space direction="vertical">
                    <Search 
                    placeholder="輸入關鍵字"  
                    allowClear  
                    enterButton="搜尋"
                    size="large" 
                    onSearch={onSearch}
                    />
                    </Space>
                    </div>                        
                    <div className="link_tag">相關公告</div>
                    <div className="link_list">
                        {
                            refRows.length>0 ? (
                                refRows.map(x => {
                                    let pt = x.postTime.replace(/[/]/g,'.')
                                    return (
                                        <div key={x.articleGUID}><a href={`${process.env.NEXT_PUBLIC_SUBPATH}/AnnouncementPage?GUID=${x.articleGUID}`}>{x.title}</a>
                                        <div className="announce_date">{pt}</div>
                                        </div>
                                        )
                                })
                            ):(
                            <div className="noData">無相關公告</div> 
                            )
                        }
                    </div>
                    {/* <div className="ad_box for_pc">你被葉配了B-)</div> */}
                    <div className="link_tag">相關標籤</div>
                    <div className="tag_box">
                        {
                            tag.map(x => {
                                return <Link href="/Announcement" key={x}><a onClick={e=>addKw(e,x)}>{x}</a></Link>
                            })

                        }
                    </div>
                    {/* <div className="ad_box for_m">你被葉配了B-)</div> */}
                </div>
            </div>
            <style jsx>
                {`
                    .announce__container .search_box {text-align:right;margin-bottom:29px;}
                    .announce__container {padding: 30px 10%;}
                    @media (max-width: 1250px) {
                        .announce__container { padding-left: 5%;padding-right: 5%;}
                    }
                    @media (max-width: 1111px) {
                        .announce__container { padding-left: 20px;padding-right: 20px;}
                    }
                    .announce__container .title { display: flex; justify-content: space-between;align-items: center;margin-bottom:20px; }
                    .announce__container .title h2{ font-size: 2.8rem;color: #0d1623; margin-bottom: 0px; }
                    .announce__container .btn_back{padding:0px 18px;border: solid 1px #e6ebf5;background-color:#FFF;font:16px PingFangTC;height:40px;line-height:40px;}
                    .announce__container .control__container { position: relative;}
                    .announce__container .content_area { display: flex;margin-bottom:50px;}
                    .announce__container .content_area .content_box{width: 100%;margin-right: 47px;min-height:600px;}
                    .announce__container .content_area .content_box .content_box_inside{ background-color: #FFF;padding: 32px; border-radius: 2px;min-height: calc(100% - 64px);
                        border: solid 1px #e6ebf5;}
                    .announce__container .content_area .content_box .content_title{color: #0d1623;line-height: 1.4;letter-spacing: -0.3px;font:24px bold PingFangTC;
                        font-weight:600}
                    .announce__container .content_area .content_box .content_class{color: #3f5372;display: flex;font:16px PingFangTC;padding:1em 0;}
                    .announce__container .content_area .content_box .content_class .class_tag {margin-right:3em;}
                    .announce__container .content_area .content_box .content_class .class_tag span{margin-left: 0.8em;}
                    .announce__container .orange{color:#daa360}
                    .announce__container .content_area .content_box .content_detail{color: #0d1623;line-height: 1.6;letter-spacing: -0.2px;font:16px PingFangTC;
                        padding-top: 1em; border-top: solid 1px #e6ebf5;overflow:hidden;}
                        .announce__container .content_area .link_box{min-width: 346px;width:346px;}
                    .announce__container .content_area .link_box .ad_box{min-height:108px;line-height:108px;text-align:center;background-color:#CCC;margin-bottom:32px;}
                    .announce__container .content_area .link_box .link_tag{font:20px PingFangTC;border-left: 4px solid #daa360; padding-left: 12px;line-height: 1;
                        font-weight:600}
                    .announce__container .content_area .link_box .link_list{margin:23px 0;padding: 19px 32px;font:16px PingFangTC ;font-weight: 600; color:#0d1623;
                        border: solid 1px #e6ebf5; background-color: #FFF;}
                    .announce__container .announce__container  .content_area .link_box .link_list>div{padding:13px 0;border-top: 1px solid #e6ebf5;}
                    .announce__container .content_area .link_box .link_list>div:first-child{border-top: none;}
                    .announce__container .content_area .link_box .link_list .announce_date{font:16px Roboto ;font-weight: normal; color:#a9b6cb;margin-top:8px}
                    .announce__container .content_area .link_box .tag_box{margin-top:20px ;display:flex;}
                    .announce__container .content_area .link_box .tag_box > a:not(:first-child) {margin-left:15px;}
                    .announce__container .content_area .link_box .tag_box > a{padding:0.6em 1.5em;border: solid 1px #e6ebf5;background-color:#FFF;
                        font:16px PingFangTC;letter-spacing:0.4px;}
                        .announce__container .noData{text-align:center;color:#a9b6cb;}
                    @media (max-width: 768px) {
                        .announce__container .title {margin-bottom:0px;}
                        .announce__container .title h2{font-size:20px;margin-bottom:0px;font-weight:900;padding:16px;text-align:justify;}
                        .announce__container { padding: 0;over-flow:hidden;}
                        .announce__container .control__container {padding-left: 20px;padding-right: 20px; }
                        .announce__container .search_box .btn_back{width:40px; height:40px;margin-right:16px; position:relative;}
                        .announce__container .search_box .btn_back > img{position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
                        .announce__container .search_box.for_m{display:flex;padding:0 16px 16px;margin-bottom:0;}
                        .announce__container .content_area{flex-wrap:wrap;margin-bottom:0;}
                        .announce__container .content_area .content_box{flex-wrap:wrap;margin:0 auto 10px;}
                        .announce__container .content_area .content_box .content_class{flex-wrap:wrap;padding:10px 0;}
                        .announce__container .content_area .content_box .content_class .class_tag:first-child{width:100%}
                        .announce__container .content_area .content_box .content_class .class_tag{width:fit-content;margin-right:1em;line-height:1.7;}
                        .announce__container .content_area .content_box .content_box_inside{border-width:1px 0 1px 0;border-radius:0;padding:16px;min-height:0;}
                        .announce__container .content_area .content_box .content_box_inside .content_title{text-align:justify;font-size:20px;}
                        
                        .announce__container .content_area .link_box{width:100%;margin:0 auto;padding:16px 0;min-width:0;}
                        .announce__container .content_area .link_box .tag_box,
                        .announce__container .content_area .link_box .ad_box,
                        .announce__container .content_area .link_box .link_tag{margin 0 auto;width:calc(100% - 32px);}
                        .announce__container .content_area .link_box .tag_box,
                        .announce__container .content_area .link_box .ad_box{margin:20px auto 0;width:calc(100% - 32px);}
                    }
                    .for_m{display:none;}
                    @media (max-width: 768px) {
                        .for_pc{display:none;}
                        .for_m{display:block;}
                    }
                `}
            </style>
            <style jsx global>
                {`
                .announce__container .content_area .content_box .content_box_inside a{color:blue;text-decoration: underline;}
                .announce__container .search_box .ant-input-search-button { background-color: #c43826; border: #c43826; }
                .announce__container .search_box .ant-space-vertical { width:100%; }
                `}
            </style>

        </div>
    );
};

export default AnnouncePageComp;
