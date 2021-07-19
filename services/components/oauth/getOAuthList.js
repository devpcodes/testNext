import {getA8StpInstance} from '../../myAxios';
import moment from 'moment';

export const getOAuthList = async function (token) {
    try{
        const url = '/lykan/api/v1/service/queryOauthList';
        const res = await getA8StpInstance(true).post(url,{token})
        console.log(res.data.result)
        if (res.data?.success === true) {
            let dataSource = res.data.result.map( x => ({
                clientId:x.clientId,
                clientImage:x.clientImage,
                clientName:x.clientName,
                createdAt:moment(x.createdAt).format('YYYY年M月D日') 
            }))
            return dataSource || [];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }

};

export const cancelOAuth = async function (token,id) {
    try{
        const url = '/lykan/api/v1/service/deleteOauth';
        const data = {
            "token":token,
            "clientId": id
          }
        const res = await getA8StpInstance(true).post(url,data)
        console.log(res.data)
        if (res.data?.success === true) {
            return true;
        } else {
            return false;
            console.log(res)
        }
    } catch (error) {
        throw error;
    }
};
