import { useEffect, useState, useCallback } from 'react';
import { Modal } from 'antd';
import AnnounceTable from './AnnounceTable';
import { CategoryList, GetAllListData } from '../../../../services/components/announcement/announceList';
import _ from 'lodash';

const AnnounceComp = () => {
    // const [data, setData] = useState({});
    // const [reload, setReload] = useState(1);

    const getData = async (idx, size, type, sc1, sc2, kw) => {
        try {
            const result = await GetAllListData(idx, size, type, sc1, sc2, kw);
            return result;
        } catch (err) {
            console.log('[ERROR]', err);
            Modal.error({
                title: '伺服器錯誤',
            });
        }
    };

    const getList = async () => {
        try {
            const result = await CategoryList();
            return listMap(result);
        } catch (err) {
            console.log('[ERROR]', err);
            Modal.error({
                title: '伺服器錯誤2',
            });
        }
    };

    const listMap = l => {
        let list = { category1List: [], category2List: [], List_lib: l.category2List };
        l.category1List.map((x, i) => {
            list.category1List.push({ text: x, value: x, key: 'C1' + i });
        });
        let a = [];
        l.category1List.map((x, i) => {
            a = a.concat(l.category2List[x]);
        });
        let arr_ = a.filter((item, index, arr) => {
            return arr.indexOf(item) === index;
        });
        arr_.map((x, i) => {
            list.category2List.push({ text: x, value: x, key: 'C2' + i });
        });
        return list;
    };

    // const reFreshHandler = () => {
    //     setReload(count => {
    //         return (count += 1);
    //     });
    // };
    const getKeyWord = () => {
        try {
            let kw = keyWord.slice();
            dispatch({
                type: 'CLEAN_ITEM',
            });
            return kw;
        } catch (error) {
            console.log('無關鍵字');
        }
    };

    return (
        <div className="announce__container">
            <div className="control__container">
                <div className="topLink">
                    <a href="/newweb">首頁 / </a>最新公告
                </div>
                <h2 className="title">最新公告</h2>
            </div>
            <AnnounceTable
                listData={getList().then(res => {
                    return res;
                })}
                getList={getList}
                getData={getData}
            />
            <style jsx>
                {`
               .announce__container .topLink{font-size:14px;color:#3f5372;margin-bottom:10px;}
               .announce__container .topLink a{color:#a9b6cb;}
               .announce__container  h2.title{position:relative;}
               .announce__container{position:relative;width:80%;margin:0 auto;padding-top:50px;}
               @media (max-width:1250px){
                 .announce__container{width:90%;}
               }
               @media (max-width:1111px){
                 .announce__container{width:calc(100%-40px)}
               }
               .announce__container .title{font-size:2.8rem;color:#0d1623;margin-top:0px;margin-bottom:20px;}
               .announce__container .control__container{position:relative;}
                @media (max-width: 768px) {
                 .announce__container{width:100%;padding-left:0;padding-right:0;margin 30px auto 0;}
                 .announce__container .topLink{display:none;}
                 .announce__container h2.title{font-size:20px;margin-bottom:5px;}
                 .announce__container .control__container{padding-left:20px;padding-right:20px;}
                 .announce__container .title{font-size:2rem;font-weight:bold;margin-top:-36px;margin-bottom:10px;}
                }
                `}
            </style>
        </div>
    );
};

export default AnnounceComp;
