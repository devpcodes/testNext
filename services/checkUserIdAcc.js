import jwt_decode from 'jwt-decode';
export const checkUserIdAcc = (token, userId) => {
    console.log(jwt_decode(token));
    const tokenUserId = jwt_decode(token)?.user_id;
    if (tokenUserId !== userId) {
        return false;
    }
    return true;
};
