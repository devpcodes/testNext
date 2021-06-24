import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';

const SelectGroupList = () => {
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
    const token = isSocalLogin ? getSocalToken() : getToken();

    const { data: fetchSelectGroupData } = useSWR([isSocalLogin, token], fetchQuerySelectGroup, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    useEffect(() => {});

    return (
        <>
            <ul>
                <li>1233124124</li>
                <li>1233124124</li>
                <li>1233124124</li>
                <li>1233124124</li>
                <li>1233124124</li>
                <li>1233124124</li>
                <li>1233124124</li>
            </ul>
        </>
    );
};

export default SelectGroupList;
