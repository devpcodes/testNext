import { useEffect, useState, useCallback } from 'react';
import { Input, Space  } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import AccountCard from './AccountCard';
import DropfilterCheckBox from '../../tradingAccount/vipInventory/DropfilterCheckBox';
import TopTagBar  from './TopTagBar';
import DropFilterCheckBoxM  from './DropFilterCheckBoxM';
import Modal from 'antd/lib/modal/Modal';
import { GetArticleData } from '../../../../services/components/announcement/announceList';
import topTag from '../../../../resources/images/components/announcement/top-tag.svg';
const AnnounceTable = ({ listData, getList, getData }) => {
    const keyWord  = useSelector(store => store.announcement.keyWord);
    const [columns, setColumns] = useState([]);
    const [State, setState] = useState('');
    const [list, setList] = useState(listData);
    const [list_main, setListMain] = useState([]);
    const [list_sub, setListSub] = useState([]);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [dataType, setDataType] = useState('');
    const [searchColumn, setSearchColumn] = useState([]);
    const [searchColumn2, setSearchColumn2] = useState([]);
    const [searchWords, setSearchWords] = useState('');
    const [filterColumns, setFilterColumns] = useState([]); 
    const [outerLinkPop, setOuterLinkPop] = useState(false); 
    const [indexGUID, setIndexGUID] = useState(''); 
    const isMobile = useSelector(store => store.layout.isMobile);
    const [dimensions, setDimensions] = useState({ 
        height: 720,
        width: 1220
      })
    const { Search } = Input;
    const onSearch = value => {
        setSearchWords([value]);
        setCurrentPage(1);
    };

useEffect(() => {  //選單初始值
        getList().then(res=>{ 
           // console.log(res)
                setList(res) 
                setListMain(res.category1List)
                setListSub(res.category2List)
                newColumsUpdate(res.category1List,res.category2List)
            if(keyWord.length>0){
                setSearchColumn(keyWord)
            } 
            }) 

},[State])
 
useEffect(() => { //子選單變更
    if(searchColumn.length>0){
    let arr = []
    let list_ = []
    searchColumn.map(x=>{
      //  console.log('x',x)
        arr = arr.concat(list.List_lib[x])
    })
    let arr_ = arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
    arr_.map((x,i)=>{
        list_.push({text:x,value:x,key:'C2'+i})
    })
    setListSub(list_)
    } else {
    setListSub(list.category2List)
    }
},[searchColumn])

useEffect(() => {
    newColumsUpdate(list_main,list_sub)
},[list_sub])

useEffect(() => {  
        const GetNewData = async()=>{
            try {
              //  console.log(searchColumn)
                getData(currentPage, pageSize, dataType , searchColumn, searchColumn2, searchWords)
                .then(res=>{
                   // console.log(res.rows)
                    if(res.rows.length>0){
                    let keyMatch = res.rows.map(x=>{
                        x.key=x.articleGUID
                        return x
                    })
                    setRows(keyMatch)  
                    setTotal(res.dataCount) 
                    setCurrentPage(res.pageIdx) 
                    setPageSize(res.pageSize)                         
                    }else{
                    setRows([])  
                    setTotal(0) 
                    setCurrentPage(1) 
                    }
                })
                } catch(error) {
                console.log('[error]',error)
                }
            }  
        GetNewData()  
},[currentPage,searchColumn,searchColumn2,dataType,searchWords]) 

useEffect(() => { 
    window.addEventListener('resize', handleResize)
    function handleResize  (){
    setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
    })
    }
})

useEffect(() => {  //filter icon color
    if(searchColumn.length>0 && searchColumn2.length>0 ){
        setFilterColumns(['category1','category2'])
    }else if(searchColumn.length>0){
        setFilterColumns(['category1'])
    }else if(searchColumn2.length>0){
        setFilterColumns(['category2'])
    }else{
        setFilterColumns([])
    }
  },[searchColumn,searchColumn2]) 

const newColumsUpdate = (d1, d2)=>{
    const newColumns = [
        {
            title: '項目',
            dataIndex: 'seq',
            key: 'seq',
            width:'5%',
        },
        {
            title: '商品類別',
            dataIndex: 'category1',
            key: 'category1',
            width:'11%',
            ...getColumnSearchProps(d1,1)
        },
        {
            title: '子類別',
            dataIndex: 'category2',
            key: 'category2',
            width:'11%',
            ...getColumnSearchProps(d2,2)
        },
        {
            title: '標題',
            dataIndex: 'title',
            key: 'title',
            width:'55%',
            render: (x,i) => {
                
                let tag = (i.isTop==1)?(<img className="topTag" src={topTag}></img>):''

                if(i.outLinkVal==="0"){
                    if(i.articleType==="0"){
                        return <a className="title_a aa" href={process.env.NEXT_PUBLIC_SUBPATH+'/AnnouncementPage?GUID='+i.articleGUID}>{tag}{x}</a>
                    }else{
                        return <a className="title_a bb" onClick={e=>showOuterLinkPop(e,false,i.articleGUID)}>{tag}{x}</a>
                    }
                }else{
                        return <a className="title_a cc" onClick={e=>showOuterLinkPop(e,true,i.articleGUID)}>{tag}{x}</a>
                }
            }
        },
        {
            title: '公告類別',
            dataIndex: 'type',
            key: 'type',
            width:'6%',
        },
        {
            title: '發布日期',
            dataIndex: 'postTime',
            key: 'postTime',
            width:'12%',
        },
        ];  
    setColumns(newColumns); 
    }

    const openOuterLink = (id) =>{
        GetArticleData(id,0)
        .then(x=>{
            window.open(x.url)
            return
        })
    }

    const onFdSubmit = useCallback((confirm, val) => { //主類別過濾
        confirm();
        setSearchColumn(val)
        setCurrentPage(1);
    });

    const onFdSubmit2 = useCallback((confirm, val) => { //子類別過濾
        confirm();
        setSearchColumn2(val)
        setCurrentPage(1);
    });

    const onFdReset = useCallback(confirm => {
        confirm();
            setSearchColumn([])
            setCurrentPage(1);
    });

    const onFdReset2 = useCallback(confirm => {
        confirm();
            setSearchColumn2([])
            setCurrentPage(1);
    });

    const filterChangeM = (v) =>{
        setSearchColumn(v)
    }

    const pageChangeHandler = (page, pageSize) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const TopBarChange = (value) =>{
        setDataType(value)
        setCurrentPage(1);
    }

const showOuterLinkPop = (e,type,id) => {
    e.preventDefault();
    if(type==true){
    setIndexGUID(id)
    setOuterLinkPop(true)
    }else{
    openOuterLink(id)
    }
}

const handleCancel = () => {
    setIndexGUID('')
    setOuterLinkPop(false)
    return
}
const handleOk = async() => {
    openOuterLink(indexGUID)
    setIndexGUID('')
    setOuterLinkPop(false)
}
const getColumnSearchProps = (data,idx) => {
        if(idx===1){
        return {
            filterDropdown: ({ confirm }) => (
                <DropfilterCheckBox
                    type={''}
                    onSubmit={onFdSubmit.bind(null, confirm)}
                    onReset={onFdReset.bind(null, confirm)}
                    value = {keyWord.length>0?keyWord:''}
                    data={data}
                />
            ),
            }
        }else{
        return {
            filterDropdown: ({ confirm }) => (
                <DropfilterCheckBox
                    type={''}
                    onSubmit={onFdSubmit2.bind(null, confirm)}
                    onReset={onFdReset2.bind(null, confirm)}
                    value = ''
                    data={data}
                />
            ),
                }           
        }

    };

    return (
        <>
           <div className="search_box">
                    <Space direction="vertical">
                    <Search 
                    placeholder="輸入關鍵字"  
                    allowClear  
                    enterButton="搜尋" 
                    size="large"
                    onSearch={onSearch}
                    />
                    </Space>
                    <DropFilterCheckBoxM 
                    filterChangeM={filterChangeM}
                    list_main={list_main}
                    />
            </div>
            <TopTagBar
                 current = ''
                 onClick = {TopBarChange}
                 mobleType = {dimensions.width>=768?false:true}
              />
            { 
            isMobile?(
                <AccountCard
                dataSource = {rows}
                columns = {columns}
                filterColumns = {filterColumns}
                pagination={{
                    total: total,
                    showTotal: (total, range) => {
                        return `${range[0]}-${range[1]} 則公告 (共${total}則公告)`;
                    },
                    onChange: pageChangeHandler,
                    current: currentPage,
                    pageSize: pageSize,
                }} 
                />  
            ):(
                <AccountTable
                dataSource = {rows}
                columns = {columns}
                filterColumns = {filterColumns}
                pagination={{
                    total: total,
                    showTotal: (total, range) => {
                        return `${range[0]}-${range[1]} 則公告 (共${total}則公告)`;
                    },
                    defaultPageSize: pageSize,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: pageChangeHandler,
                    responsive: true,
                    current: currentPage,
                    pageSize: pageSize,
                }} 
                />  
            )
            }
            <Modal
            className="OuterLinkModal"
            title='提醒'
            visible={outerLinkPop} 
            onCancel={handleCancel} 
            onOk={handleOk} 
            ><p>
                提醒您，您將離開永豐金理財網，前往其他機構提供之資訊網頁，<br></br>
                您若同意繼續進入該網站，請點選「確認」，不同意請點選「取消」，謝謝！</p>
            </Modal>
            <style jsx>{`
                
                .search_box {position:absolute;right:0;top:70px;display:inline-block;}
                @media (max-width: 768px) {
                    .search_box {position:relative;top:0;margin-bottom:16px;padding:0 16px;display:flex; justify-content: space-between;}  
                }
            `}</style>
            <style global jsx>{`
                .announce__container .topTag {width:29px; vertical-align: text-bottom; margin:0 5px 1px 0;}
                .announce__container .search_box .ant-input-search-button { background-color: #c43826; border: #c43826; }
                .announce__container .ant-table-filter-trigger{margin:0}
                .announce__container .ant-input {  border: 1px solid #e6ebf5; }
                .for_m{display:none;}
                .announce__container {padding-bottom:20px;}
                .announce__container .ant-table-container{border:solid 1px #d7e0ef;border-radius:0;}
                .announce__container .ant-tooltip-inner{color:white;box-shadow:0 2px 15px 0 rgba(169,182,203,0.7);padding:16px;line-height:25px;margin-right:-4px;margin-top:-3px;z-index:3;}
                .announce__container .ant-tooltip-arrow{width:25px;height:25px;margin-top:-10px;}
                .announce__container .title_a{display: block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
                .announce__container .title_a:hover{color:#daa360;}
                .announce__container .ant-table-tbody > tr > td:nth-child(4){max-width:0px;}
                @media (max-width: 768px) {
                    .for_pc{display:none;}
                    .for_m{display:block;}
                }
            `}</style>
        </>
    );
   
};

export default AnnounceTable;
