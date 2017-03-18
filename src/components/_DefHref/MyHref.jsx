/**
 * Created by  xiaotuni@gmail.com 
 */


import React, { Component, PropTypes } from 'react';
import { Utility } from '../../components/index';
import { Link } from 'react-router';
const styles = require('./scss/MyHref.scss');

/**
 *
 */
export default class MyHref extends Component {
  static propTypes = {
    IsShowBackArrow: PropTypes.bool,                                 // 是否显示返回按键
    Title: PropTypes.string,                                          // 标题
    UrlParams: PropTypes.object,                                      // url 参数
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // var abc
  }

  componentDidMount() {
  }

  __HandlerToPage(param) {
    const UrlItem = Utility.constItem.UrlItem;
    const __keys = Object.keys(UrlItem);
    for (let __index = 0; __index < __keys.length; __index++) {
      const __key = __keys[__index];
      if (__key.toLowerCase() === param.name.toLowerCase()) {
        Utility.setContent('__CurrentSelectHref', '/' + param.name);
        console.log(UrlItem[__key]);
        // 页面进行跳转
        Utility.toPage(UrlItem[__key]);
        return;
      }
    }
  }

  __BuildHref() {
    const _currentSelectHref = Utility.getContent('__CurrentSelectHref');
    const __obj = Utility.constItem.UrlTitle;
    const __item = Object.keys(__obj).map((key, __index) => {
      const __row = __obj[key];
      return (
        <div key={'My_Href_Index_' + __index}
          className={'item ' + (_currentSelectHref === key ? 'select' : '')}
          onClick={this.__HandlerToPage.bind(this, Object.assign({ name: key.substr(1) }, __row))}
        >
          <div>{__index + ':' + __row.Title}</div>
        </div>
      );
    });

    return __item;
  }

  render() {

    return (
      <div className='myHref'>
        <div className="item" onClick={() => {
          Utility.toPage(Utility.constItem.UrlItem.GoBack, {});
        }}><div>返回</div></div>
        {this.__BuildHref()}
      </div>
    );
  }
}
