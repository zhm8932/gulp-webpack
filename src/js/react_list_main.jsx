const ReactDOM = require('react-dom');
const React = require('react');
const utils = require('./utils')
let List = require('./list');

require('../sass/global.scss');
// require('../sass/page1.scss');
require('../sass/style.scss');


console.log('重启jsx')
console.log(utils.add(2,5))



ReactDOM.render(<List/>,document.querySelector('.app'))