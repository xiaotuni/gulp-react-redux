import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Default, NotFound, OtherPage } from './containers/index.jsx';


export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Default} />

      { /* 首页  */}
      <Route path="default" component={Default} />
      <Route path="otherpage" component={OtherPage} />
      { /* 404 */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
