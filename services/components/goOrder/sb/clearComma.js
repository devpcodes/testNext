export const clearComma = obj => {
    for (let key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') {
            if (obj[key].indexOf(',') >= 0) {
                var x = obj[key].split(',');
                obj[key] = String(x.join(''));
            }
        }
    }
    //close={quote.ls} open={quote.op} low={quote.yl} high={quote.yh}
    // close={quote.ls}
    // open={quote.op}
    // low={quote.lo}
    // high={quote.hi}
};
