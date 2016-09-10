import $ from 'jquery';
import utils from './utils';
import moment from 'moment';

//-- import moment from 'moment/min/moment-with-locales.min.js';
var str = 'Hello world!!11111';
let temp = 'es6声明变量';

console.log(utils)
console.log(str)
console.log(temp)


console.log(utils.add(3,10))


let time = moment().locale('zh-cn').format('LLLL')
console.log('引入jquery:',time)
$('.main').html(time)