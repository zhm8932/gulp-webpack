let data = [
    {
        title:'Node.js',des:'JS服务端运行环境!!'
    },{
        title:'React.js',des:'React是Facebook开发的一款JS库!'
    }
    ,{
        title:'Vue.js',des:'Vue.js 是一个基于 MVVM 模型的 web 库。通过双向数据绑定连接View和Model层'
    }

]
const React = require('react');
const ReactDOM = require('react-dom');

let List = React.createClass({
    render:function () {
        return<ul>
            <h2>JS框架</h2>
            {
                data.map(function (item,i) {
                    return <li key={i}>{item.title}
                        <p>{item.des}</p>
                    </li>
                })
            }
        </ul>
    }
});

module.exports =List;