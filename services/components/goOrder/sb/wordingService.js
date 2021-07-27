// 字元過長變...
export const wordingService = (wording, changeLen) => {
    if (typeof wording === 'string' && wording) {
        var str = '';
        var len = wording.length;
        if (len >= changeLen) {
            str = wording.substring(0, changeLen) + '...';
        } else {
            return wording;
        }

        return str;
    }
};
