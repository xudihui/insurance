import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from './common/index';



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
            <ul className="index-list index-list-entrance">
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
        let {name,desc,discount,id} = this.props.data;
        return (
            <li>

                <Link to={`/my/list/${id}`}>
                        <nav className="index-nav">
                            <img src="src/Images/car.jpg" />
                        </nav>
                        <div className="con" data-flex="main:justify">
                            <p data-flex="dir:top ">
                                <b className="name">{name}</b>
                                <span className="count setover">{desc}</span>
                            </p>
                            <p data-flex="main:right cross:center" data-flex-box="0">
                                <span className="flag">
                                    <i className="icon iconfont icon-sanjiao-copy"></i>
                                    <i>{discount}</i>起
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

/**
 * (导出组件)
 * 
 * @export
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var tab = this.props.location.query.tab || 'all';
        var data = [
                {
                    "id": "58d0fb3517f61387400b7e15",
                    "discount": "5折",
                    "desc": "买车险享立减优惠",
                    "name": "平安车险",
                },
                {
                    "id": "58d0fb3517f61387400b7e15",
                    "discount": "5折",
                    "desc": "买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠",
                    "name": "平安车险",
                }
            ];
        for(let i = 0;i < 20;i++){
            data.push({
                "id": "58d0fb3517f61387400b7e15",
                "discount": Math.ceil(Math.random()*9)+"折",
                "desc": "买车险享立减优惠",
                "name": "平安车险",
            })
        }

        return (
            <div className="index-list-box">
                {
                    data.length > 0 ? <List list={data} /> : null
                }
                <Link className="footer" to="my/list/1" data-flex="main:center cross:center">保单信息
                </Link>
            </div>
        );
    }
}


export default Main;
