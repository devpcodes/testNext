
import { Modal, Input, Space,Checkbox  } from 'antd';
import { useEffect, useState } from 'react';
import icFilter from '../../../../resources/images/components/announcement/ic-filter.svg';


const DropFilterCheckBoxM = ({filterChangeM, ...props }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkValue, setCheckValue] = useState([]);
    const [isCheckedN, setIsCheckedN] = useState(0);
    useEffect(() => { 
        console.log(props)
    })
    const onChange = (checkedValues) =>{
        setCheckValue(checkedValues) 
    }
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = async() => {
        setIsModalVisible(false);
        setIsCheckedN(checkValue.length)
        filterChangeM(checkValue)
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    return (
<>{console.log(isCheckedN)}
        <div className={`filter_btn for_m ${isCheckedN>0?"filter_num":""}`} onClick={showModal}>
            <img src={icFilter}></img>
            </div>
        <Modal 
        title="篩選商品" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        closable={false}
        cancelText="取消"
        okText="確認"
        width="85%"
        >
            <Checkbox.Group
            options={props.list_main.map(x=>{
                return{
                    label:x.text,
                    value:x.value
                }
            })}
            onChange={onChange}
            />
        </Modal>
        
    <style global jsx>{`
        .for_m{display:none;}
    @media (max-width: 768px) {
        .filter_btn {width:40px;height:40px;background-color:#FFF;border:1px solid #d7e0ef;position:relative;}
        .filter_btn > img { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}
        .filter_btn.filter_num::after{content:'${isCheckedN}';display:block;position:absolute;top:-10px;right:-10px;width:19px;height:19px;border-radius:20px;
    background-color:#c43826;color:#FFF;text-align:center;line-height:19px;}
        .for_pc{display:none;}
        .for_m{display:block;}
    }
    .ant-checkbox-group-item{ width: 50%; font-size: 16px; margin: 0.5em 0;}
    .ant-modal-content>div{padding:20px;}
    .ant-modal-content>div{padding:20px;}
    .ant-modal-footer{display: flex;}
    .ant-modal-title{font-family: PingFangTC;font-size: 20px;font-weight: 600;color: #0d1623;white-space: nowrap;}
    .ant-modal-footer>button{width:50%;height:44px}
    .ant-modal-footer>button.ant-btn-primary{background-color:#c43826;border-color:#c43826;}
    .ant-checkbox-inner{width:20px;height:20px;}
    .ant-checkbox-checked .ant-checkbox-inner{background-color:#c43826;border-color:#c43826;}
    .ant-checkbox-inner:after{top: 45%; left: 28%;}
    .ant-checkbox-checked:after{border:1px solid #c43826;}
    .ant-checkbox-input:focus+.ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner{
        border-color: #d9d9d9;
    }
    @media (max-width: 768px) {
        .ant-modal{width:85%;}
    }
    `}</style>        
     </>   );

};

export default DropFilterCheckBoxM;

 