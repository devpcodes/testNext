export const secretToggle = (data, keys) => {
    let data_ = {};
    let result = keys.map(x => {
        let star = '';
        if(data[x]){
        let n = data[x].toString().length;
        for (let i = 0; i < n; i++) {
            star = star + '*';
        }
        }
        data_[x] = star
    });
    return data_;
};
