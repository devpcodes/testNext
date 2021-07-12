import {getA8StpInstance} from '../../myAxios';

export const CategoryList = async function () { //token
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementCategoryList';
        const res = await getA8StpInstance(true).post(url)//,{token}
        console.log('[LISTRES]',res)
        if (res.data?.success === true) {
            return res.data?.result || [];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }

};

export const GetAllListData = async function (idx, size, type, sc1, sc2) {
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementList';
        const data = {
            "type": type,
            "category1List": sc1,
            "category2List": sc2,
            "hsearch": [  ],
            "sdate": "",
            "edate": "",
            "pageIdx": idx,
            "pageSize": size
          }
        const res = await getA8StpInstance(true).post(url,data)
        console.log('[REQ]',data, res.data)
        if (res.data?.success === true) {
            return res.data.result;
        } else {
            console.log(res)
            return false;
        }
    } catch (error) {
        throw error;
    }
};
