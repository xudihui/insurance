import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage } from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */

/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        var self = this;
        console.log(self.props);
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={index} data={item} />
                    })
                }
            </ul>
        );
    }
}

class ListItem extends Component {
    render() {
        let {title,author,top,create_at,last_reply_at,id} = this.props.data;
        return (
            <li>
                <Link to={`/my/detail/${id}`}>
                    <div className={`con userList status-${top}`} data-flex="main:justify">
                        <p data-flex="dir:top ">
                            <span className="name">{title}</span>
                            <span className="count">{author.loginname}</span>
                            <span className="time">保障期限:{create_at.slice(0,10) + '-' + last_reply_at.slice(0,10)}</span>
                        </p>
                        <p data-flex="main:center cross:top" data-flex-box="0">
                                <span className="status">
                                    {top ? '已生效' : '已失效'}
                                </span>
                        </p>
                    </div>
                </Link>
            </li>
        );
    }
    shouldComponentUpdate(np) {
        return false;
    }
}


class ListItem_bak extends Component {
    render() {
        let {proName,userName,time,status,id} = this.props.data;
        return (
            <li>
                <Link to={`/my/detail/${id}`}>
                    <div className={`con userList status-${status}`} data-flex="main:justify">
                        <p data-flex="dir:top ">
                            <span className="name">{proName}</span>
                            <span className="count">{userName}</span>
                            <span className="time">保障期限:{time}</span>
                        </p>
                        <p data-flex="main:center cross:top" data-flex-box="0">
                                <span className="status">
                                    {status ? '已生效' : '已失效'}
                                </span>
                        </p>
                    </div>
                </Link>
            </li>
        );
    }
    shouldComponentUpdate(np) {
        return false;
    }
}


class Main extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var {data, loadAnimation, loadMsg, id} = this.props.state;
        console.log('MyList:',data)
        var main = data ? <Content {...this.props}></Content> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div>
                {main}
            </div>
        );
    }
}


class Empty extends Component {
    render() {
        return (
            <div className="none">
                无保单信息
            </div>
        );
    }
}

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var data_ = [
            {
                "id": "58d0fb3517f61387400b7e15",
                "proName": "平安车险",
                "userName": "徐三狗",
                "time": "2017.06.22-2018.03.11",
                "status":true
            },
            {
                "id": "58d0fb3517f61387400b7e15",
                "proName": "平安车险平安车险平安车险平安车险平安车险",
                "userName": "徐三狗",
                "time": "2017.06.22-2018.03.11",
                "status":false
            }
        ];
        for(let i = 0;i < 20;i++){
            data_.push(
                {
                    "id": "58d0fb3517f61387400b7e15",
                    "proName": "平安车险平安车险平安车险平安车险平安车险",
                    "userName": "徐三狗",
                    "time": "2017.06.22-2018.03.11",
                    "status":Math.ceil(Math.random()*2) == 1 ? true : false
                })
        }
        console.log('ddd',this.props.state)
        var {data} = this.props.state;
        for(let i = 0;i < data.length; i++){
            var temp = data[i];
            data[i]['title'] = '平安车险-'+ temp['title'].slice(-3);
            data[i].author.loginname = '徐三狗'
        }
        if(this.props.location.search == '?none'){
            data = [];
        }
        return (
            <div className="index-list-box">
                {
                    data.length > 0 ? <List list={data} /> : <Empty />
                }
            </div>
        );
    }
}
Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default GetData({
    id: 'MyList',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topics';
    },
    data: (props, state) => { //发送给服务器的数据
        var accesstoken = props.User ? props.User.accesstoken : '';
        return { mdrender: state.mdrender, accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});