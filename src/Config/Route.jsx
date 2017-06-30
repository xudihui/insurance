import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import IndexList from '../Component/IndexList'; //首页组件
import MyList from '../Component/MyList'; //主题详情
import MyDetail from '../Component/MyDetail'; //我的消息

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
            <Route path="my/list/:id" component={MyList} />
            <Route path="my/detail/:id" component={MyDetail} />
        </Route>
    </Router>
);

export default RouteConfig;