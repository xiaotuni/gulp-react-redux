import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utility, MyHref, Tooltip } from '../../components/index';
import { connect } from 'react-redux';
import * as CommonActions from '../../redux/modules/reduxCommon';
const styles = require('./scss/Default.scss');

@connect(state => ({
  Values: state.Common.Values,
}), { ...CommonActions })

export default class Default extends Component {
  static propTypes = {
    Values: PropTypes.array,
    onAPIGetValues: PropTypes.func,
  }
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.__InitData();
  }
  __InitData() {
    const { onAPIGetValues } = this.props;
    if (!Utility.isFunction(onAPIGetValues)) {
      return;
    }
    onAPIGetValues({}).then(() => {
      console.log('完成1');
    }, () => { });
  }
  render() {
    return (
      <div className='defaultCss'>
        <MyHref />
        default Component
        <div className="tooltipGroup">
          <div className='tooltip'><Tooltip Title="左边" Position="Left" >哈哈</Tooltip></div>
          <div className='tooltip'><Tooltip Title="上面" Position="Top" >嘿嘿~~</Tooltip></div>
          <div className='tooltip'><Tooltip Title="下面" Position="Bottom" >看看</Tooltip></div>
          <div className='tooltip'><Tooltip Title="右边" Position="Right" >说吧</Tooltip></div>
        </div>
        <div>
          <div onClick={this.__InitData.bind(this)}>
            调用接口
          </div>
        </div>
      </div>
    );
  }
}
