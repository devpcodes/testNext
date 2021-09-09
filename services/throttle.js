import moment from 'moment';

var lastTime = 0;
var nowTime = 0;
/**
 * 至少delay多少毫秒才執行的函数
 * @param fn  要執行的函数
 * @param delay 延遲的时间
 */
export const throttle = (fn, delay) => {
    nowTime = moment().format('x');
    if (Math.abs(nowTime - lastTime) > delay) {
        fn.call(this);
        lastTime = nowTime;
    }
};
