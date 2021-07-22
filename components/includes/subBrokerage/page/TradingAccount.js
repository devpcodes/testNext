import { useEffect, useState, useCallback ,useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import { Modal } from 'antd';
import { Input, Space  } from 'antd';
import TabBar  from '../elements/TabBar';
//import { GetArticleData } from '../../../../services/components/announcement/announceList';

const TradingAccount = () => {
const [data, setData] = useState({}); 
const [current, setCurrent] = useState([]); 
const [refRows, setRefRows] = useState([]); 
const [refresh, setRefresh] = useState(''); 
const keyWord  = useSelector(state => state.keyWord);
const dispatch = useDispatch();
const menuList = [
    {title:'庫存', key:'inventory'},
    {title:'帳戶餘額', key:'balance'},
    {title:'未實現損益', key:'unrealized'}
]
// useEffect(() =>{ 
//     const GetNewData = async()=>{
//         try {
//             let id = getParamFromQueryString('GUID'); //GUID
//             let count =  '3'; //相關公告筆數
//             getData(id, count)
//             .then(res=>{
//                 setData(res)  
//                 setTag(res.keyWord)
//                 setRefRows(res.refRows)
//             })
//             } catch(error) {
//             console.log('[error]',error)
//             }
//         }  
//     GetNewData()  
// },[refresh])

// const getData = async (id, count) => {
//     try{
//         const result = await GetArticleData(id, count)
//         return result 
//     } catch(err) {
//         console.log('[ERROR]',err)
//         Modal.error({
//             title: '伺服器錯誤',
//         });
//     }
// }
const addKw = (e,x) => {
    dispatch({
        type: "CHANGE_ITEM",
        payload: {itemNew:x}
    }); 
}
const onClick = (x) =>{
 console.log(x)
}
    return (
        <div className="content_box subBrokerage">
            <TabBar
            onClick={onClick}
            current = { current }
            menuList = {menuList}
            ></TabBar>
        <div className="content_box_inner">

        </div>
            <style jsx>
                {`
                .page_inner.subBrokerage .content_area{max-width:1240px;width:90%;margin:0 auto;background:#cecece}
                `}
            </style>
            <style jsx global>
                {`

                `}
            </style>

        </div>
    );
};

export default TradingAccount;
