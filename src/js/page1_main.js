// import $ from 'jquery';
const utils = require('./utils')
// import utils from './utils';
import moment from 'moment';
import moduleA from './moduleA'

require('../sass/page1.scss');
require('../sass/global.scss');
//-- import moment from 'moment/min/moment-with-locales.min.js';
var str = 'Hello world!!11111';
let temp = 'es6声明变量';

console.log(utils)
console.log(str)
console.log(temp)
console.log(moduleA.str)

console.log(utils.add(3,10))


let time = moment().locale('zh-cn').format('LLLL')
console.log('引入jquery:',time)
console.log('引入jquery:',$())
$('.main').html(time)