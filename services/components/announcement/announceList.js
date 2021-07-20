import {getA8StpInstance} from '../../myAxios';

export const CategoryList = async function () { //token
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementCategoryList';
        const res = await getA8StpInstance(true).post(url)//,{token}
        if (res.data?.success === true) {
            return res.data?.result || [];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }

};

export const GetAllListData = async function (idx, size, type, sc1, sc2, kw) {
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementList';
        const data = {
            "type": type,
            "category1List": sc1,
            "category2List": sc2,
            "hsearch": kw,
            "sdate": "",
            "edate": "",
            "pageIdx": idx,
            "pageSize": size
          }
        const res = await getA8StpInstance(true).post(url,data)
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

export const KeyWordSearch = async function (t) {
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementList';
        const data = {
            "type": '',
            "category1List": '',
            "category2List": '',
            "hsearch": [t],
            "sdate": "",
            "edate": "",
            "pageIdx": 1,
            "pageSize": 15
          }
        const res = await getA8StpInstance(true).post(url,data)
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

export const GetArticleData = async function (id, count) {
    try{
        const url = '/lykan/api/v1/service/queryAnnouncementArticle';
        const data = {
            "articleGUID": id,
            "refCount": count
          }
        const res = await getA8StpInstance(true).post(url,data)
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
