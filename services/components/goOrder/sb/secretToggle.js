import { getA8Instance, getDivoInstance } from '../../../myAxios';
import { getCurrency, getMarket } from './dataMapping';
import { getCookie } from '../../layouts/cookieController';
import { getWebId } from '../getWebId';
import { sign } from '../../../webCa';
import moment from 'moment';

export const secretToggle = async (data, hidden, keys)=>{
    if(hidden){
    
    let data_ = data
    console.log('[data]',data)
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

    }

}
