import { useEffect, useState, useCallback } from 'react';
import { Modal } from 'antd';
import theme from '../../../../resources/styles/theme';
import Control from './Control';
import AnnounceTable from './AnnounceTable';

import { Input, Space  } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, AudioOutlined } from '@ant-design/icons';
import { CategoryList, GetAllListData } from '../../../../services/components/announcement/announceList';
import _ from 'lodash';

const { Search } = Input;
const onSearch = value => console.log(value);
const AnnounceComp = () => {

const [data, setData] = useState({}); 
const [controlText, setControlText] = useState(''); 
const [reload, setReload] = useState(1);


const getData = async (idx, size, type, sc1, sc2) => {
    try{
        const result = await GetAllListData(idx, size, type, sc1, sc2)
        return result
    } catch(err) {
        console.log('[ERROR]',err)
        Modal.error({
            title: '伺服器錯誤',
        });
    }
}

// const getType = async () => {
//     let value = ''
//     menuList.map( x=>{
//         if (state!=='all'&&state===x.key){
//             value = x.title
//         }
//     })
//     return value
// }



const getList = async () => {
    try{
  const result = await CategoryList()
  return listMap(result)
    } catch(err) {
        console.log('[ERROR]',err)
        Modal.error({
            title: '伺服器錯誤2',
        });
    }
}

const listMap = (l) => {
    let list = {category1List:[],category2List:[],List_lib:l.category2List}
    l.category1List.map((x,i) => {
            list.category1List.push({text:x,value:x,key:'C1'+i})
        })
    let a = []
    l.category1List.map((x,i) => {
            a = a.concat(l.category2List[x])
        })
    let arr_ = a.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
    arr_.map((x,i)=>{
        list.category2List.push({text:x,value:x,key:'C2'+i})
    })
 return list 
}



const getPageTextHandler = useCallback(text => {
    setControlText(text);
});
const reFreshHandler = () => {
    setReload(count => {
        return (count += 1);
    });
};

    return (
        <div className="vipInventory__container">
            <div className="control__container">
                <h2 className="title">最新公告
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
                </h2>
            </div>
              <AnnounceTable
                 listData={getList().then(res=>{return res})}
                 //getType = {getType}
                 getList={getList}
                 getData={getData}
                 getPageInfoText={getPageTextHandler}
                 reload={reload}
            />
            <style jsx>
                {`
                
                h2.title{position:relative;}
                .search_box {position:absolute;right:0;display:inline-block;}
                    .vipInventory__container {
                        padding-left: 10%;
                        padding-right: 10%;
                        padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipInventory__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipInventory__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                    }

                    .title {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                    .control__container {
                        position: relative;
                    }
                    @media (max-width: 768px) {
                        .vipInventory__container {
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .control__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        .title {
                            font-size: 2rem;
                            font-weight: bold;
                            margin-top: -36px;
                            margin-bottom: 10px;
                        }
                    }
                `}
            </style>

        </div>
    );
};

export default AnnounceComp;
