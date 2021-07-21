import { useEffect, useState, useCallback } from 'react';
import { Input, Space  } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import AccountTable from './AccountTable';
import AccountCard from './AccountCard';
import DropfilterCheckBox from './DropfilterCheckBox';
import TopTagBar  from './TopTagBar';
import DropFilterCheckBoxM  from './DropFilterCheckBoxM';

const AnnounceTable = ({ listData, getList, getData }) => {
    const keyWord  = useSelector(state => state.keyWord);
    const dispatch = useDispatch();
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
    const [searchWords, setSearchWords] = useState(keyWord);
    const [current, setCurrent] = useState(''); 
    const [filterColumns, setFilterColumns] = useState([]); 

    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })
    const { Search } = Input;
    const onSearch = value => {
        setSearchWords([value]);
        setCurrentPage(1);
    };

useEffect(() => {  //選單初始值
        getList().then(res=>{ 
                setList(res) 
                setListMain(res.category1List)
                setListSub(res.category2List)
                newColumsUpdate(res.category1List,res.category2List)
            })  
},[State])
 
useEffect(() => { //子選單變更
    if(searchColumn.length>0){
    let arr = []
    let list_ = []
    searchColumn.map(x=>{
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
                getData(currentPage, pageSize, dataType , searchColumn, searchColumn2, searchWords)
                .then(res=>{
                    // console.log('[RES]',res)
                    let keyMatch = res.rows.map(x=>{
                        x.key=x.articleGUID
                        return x
                    })
                    setRows(keyMatch)  
                    setTotal(res.dataCount) 
                    setCurrentPage(res.pageIdx) 
                    setPageSize(res.pageSize) 
                })
                } catch(error) {
                console.log('[error]',error)
                }
            }  
        GetNewData()  
},[currentPage,searchColumn,searchColumn2,dataType,searchWords]) 

useEffect(() => { 
    function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
  }
  window.addEventListener('resize', handleResize)
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
        },
        {
            title: '商品類別',
            dataIndex: 'category1',
            key: 'category1',
            ...getColumnSearchProps(d1,1)
        },
        {
            title: '子類別',
            dataIndex: 'category2',
            key: 'category2',
            ...getColumnSearchProps(d2,2)
        },
        {
            title: '標題',
            dataIndex: 'title',
            key: 'title',
            render: (x,i) => 
            <a className="title_a" href={process.env.NEXT_PUBLIC_SUBPATH+'/AnnouncementPage?GUID='+i.articleGUID}>{x}</a>
        
        },
        {
            title: '公告類別',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '發布日期',
            dataIndex: 'postTime',
            key: 'postTime',
        },
        ];  
    setColumns(newColumns); 
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


const getColumnSearchProps = (data,idx) => {
        if(idx===1){
        return {
            filterDropdown: ({ confirm }) => (
                <DropfilterCheckBox
                    type={''}
                    onSubmit={onFdSubmit.bind(null, confirm)}
                    onReset={onFdReset.bind(null, confirm)}
                    value = ''
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
                 current = { current }
                 onClick = {TopBarChange}
                 mobleType = {dimensions.width>=768?false:true}
              />
            { 
            dimensions.width>=768?(
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
            ):(
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
            )
            }
            
            <style jsx>{`
                .search_box {position:absolute;right:0;top:20px;display:inline-block;}
                @media (max-width: 768px) {
                    .search_box {position:relative;top:0;margin-bottom:16px;padding:0 16px;display:flex; justify-content: space-between;}  
                }
            `}</style>
            <style global jsx>{`
                .announce__container .search_box .ant-input-search-button { background-color: #c43826; border: #c43826; }
                .announce__container .ant-table-filter-trigger{margin:0}
                .announce__container .ant-input {  border: 1px solid #e6ebf5; }
                .for_m{display:none;}
                @media (max-width: 768px) {
                    .for_pc{display:none;}
                    .for_m{display:block;}
                }
            `}</style>
        </>
    );
   
};

export default AnnounceTable;
