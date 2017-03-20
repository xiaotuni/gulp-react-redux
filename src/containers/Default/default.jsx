import React, { Component, PropTypes } from 'react';
import { Utility, MyHref } from '../../components/index';
import { connect } from 'react-redux';
import * as CommonActions from '../../redux/modules/reduxCommon';
@connect(state => ({
  Values: state.Common.Values,
}),
  { ...CommonActions })
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
      console.log('完成');
    }, () => { });
  }
  render() {
    return (
      <div>
        <MyHref />
        default Component

        <div>
          <div onClick={this.__InitData.bind(this)}>
            调用接口
          </div>
        </div>
      </div>
    );
  }
}