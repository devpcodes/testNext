let verify = {
    confirmPassword: (val, otherVal, msg) => {
        if (val !== otherVal) {
            return Promise.reject(msg || '與新密碼輸入不同');
        } else {
            return Promise.resolve();
        }
    },
    passwordCheck: (val, otherVal, msg) => {
        if (val === otherVal) {
            return Promise.reject(msg || '新密碼不得與舊密碼相同');
        }

        let arr = [];
        arr.push(checkLowerEnglish(val));
        arr.push(checkBiggerEnglish(val));
        arr.push(checkNum(val));
        arr.push(checkSepcial(val));
        arr = arr.filter(item => {
            return item === true;
        });
        if (arr.length < 3) {
            return Promise.reject(msg || '密碼請包含大寫英文、小寫英文、符號(.!@$*~()`-)、數字，其中三種');
        } else {
            return Promise.resolve();
        }
    },
    oldPasswordCheck: (val, otherVal, msg) => {
        const patt = /^[a-zA-Z0-9\.!@$*~()`-]{0,}$/;
        if (patt.test(val)) {
            return Promise.resolve();
        } else {
            return Promise.reject('含有不合法字元');
        }
    },
};

const checkLowerEnglish = function (value) {
    const patt = /[a-z]+/;
    if (patt.test(value)) {
        return true;
    } else {
        return false;
    }
};

const checkBiggerEnglish = function (value) {
    const patt = /[A-Z]+/;
    if (patt.test(value)) {
        return true;
    } else {
        return false;
    }
};

const checkNum = function (value) {
    const patt = /[0-9]+/;
    if (patt.test(value)) {
        return true;
    } else {
        return false;
    }
};

const checkSepcial = function (value) {
    const patt = /[\.!@$*~()`-]+/;
    if (patt.test(value)) {
        return true;
    } else {
        return false;
    }
};

export const verifyHandler = function (tag, val, otherVal, msg) {
    return verify[tag](val, otherVal, msg);
};
