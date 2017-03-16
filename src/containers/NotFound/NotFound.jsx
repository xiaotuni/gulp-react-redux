import React, { Component } from 'react';
import { Utility, MyHref } from '../../components/index';


export default class NotFound extends Component {
  render() {
    return (
      <div>
        <MyHref />
        页面组件没有找到啦
      </div>
    );
  }
}
