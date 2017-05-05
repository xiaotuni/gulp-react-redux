/**
 * Created by  xiaotuni@gmail.com 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utility } from '../../components/index';
import { Link } from 'react-router';
const styles = require('./scss/Tooltip.scss');

/**
 * 
 * <Tooltip Title="Tooltip" Position="Left|Top|Bottom|Right" >哈哈~~</Tooltip>
 * 
 * @export
 * @class Tooltip
 * @extends {Component}
 */
export default class Tooltip extends Component {
  static propTypes = {
    Title: PropTypes.string,                                           // 显示的内容
    Position: PropTypes.string,                                        // 显示的位置
    children: PropTypes.any,                                           // 显示的父级
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Title, Position, children } = this.props;
    const __P = Position;
    return (
      <div className="tooltipCss">
        <div className={'tip ' + (__P ? __P : 'top')}>
          <div>
            {Title}
          </div>
        </div>
        <div className={'ttContent'}>
          {children || null}
        </div>
      </div>
    );
  }
}
