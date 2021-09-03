import { getA8Instance, getDivoInstance } from '../../../myAxios';
import { useSelector } from 'react-redux';



export const secretToggle = async (data, hidden, keys)=>{
    const accBalanceData = useSelector(store => store.accBalance.bankData);
    let data_ = data
    if(hidden){
    keys.map((x,i)=>{
            let ds = data.map((y,j)=>{
                let n  = y[x].length
                let star = ''
                for(let i=0; i<=n; i++){
                    star = star + '*'
                }
                data_[j][x]=star                
            })
            return ds
        })  
          return data_         
    }else{
        return accBalanceData
    }
        
}
