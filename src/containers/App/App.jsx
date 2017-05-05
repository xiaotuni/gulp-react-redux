import React, { Component, PropTypes } from 'react';
import { Utility, MyHref } from '../../components/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import { EventEmitter } from 'events';
const event = new EventEmitter();
const styles = require('./scss/app.scss');

/**
 * 
 * 
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,                                // 子项
    location: PropTypes.object,                                // 子项
  }
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { IsWeiXin: true };
  }
  componentWillMount() {
    Utility.setContent(Utility.constItem.Event, event);
    Utility.setContent(Utility.constItem.Context, this.context);
    this.__ListenEvent(this);
    this.__InitRouteListen(this);
  }
  componentwillreceiveprops(nextProps) {
    console.log(nextProps);
  }
  __ListenEvent(self) {
    Utility.$on(Utility.constItem.Events.OnGoBack, () => {
      self.__HandlerGoBack();
    });
  }
  __HandlerGoBack() {
    this.state.IsReturn = true;
    this.context.router.goBack();
  }

  /**
   * 初始化监听路由事件
   * @private
   */
  __InitRouteListen(self) {
    try {
      if (!this.context.router) {
        return;
      }
      if (!this.context.router.listen) {
        return;
      }
      const { onUrlParamsEdit } = this.props;
      this.context.router.listen((obj) => {
        const { action } = obj;
        self.state.IsReturn = action === 'POP';
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  getTransitionsName(isReturn) {
    const __tranName = {};
    if (isReturn) {
      __tranName.enter = 'spEnterReturn';
      __tranName.enterActive = 'spEnterActiveReturn';
      __tranName.leave = 'spLeaveReturn';
      __tranName.leaveActive = 'spLeaveActiveReturn';
      __tranName.appear = 'spAppearReturn';
      __tranName.appearActive = 'spAppearActiveReturn';
    } else {
      __tranName.enter = 'spEnter';
      __tranName.enterActive = 'spEnterActive';
      __tranName.leave = 'spLeave';
      __tranName.leaveActive = 'spLeaveActive';
      __tranName.appear = 'spAppear';
      __tranName.appearActive = 'spAppearActive';
    }
    return __tranName;
  }

  render() {
    const { IsReturn, IsWeiXin, IsShow, Title } = this.state;
    const { TabsFooterInfo, location } = this.props;
    const { IsDisplay } = TabsFooterInfo || {};
    const IsStop = Utility.getContent(Utility.constItem.IsStopSlidePageAnimation);
    const __timeout = !!IsStop ? 1 : 500;
    console.log('------>', IsReturn);
    return (
      <div className='app' ref="divAppContent">
        <Helmet title={Title || 'xiaotuni' + new Date().toLocaleTimeString()} />
        <div className={!!IsWeiXin ? 'isWeiXin' : 'appContent'} >
          <ReactCSSTransitionGroup component="div"
            transitionName={!!IsStop ? 'demo' : this.getTransitionsName(!!IsReturn)}
            transitionAppear
            transitionAppearTimeout={__timeout}
            transitionEnterTimeout={__timeout}
            transitionLeaveTimeout={__timeout}>
            {React.cloneElement(this.props.children || <span></span>, { key: this.props.location.pathname })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
