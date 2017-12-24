import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './model/Store';
import { Provider } from 'mobx-react';
import { MobxRouter, startRouter } from 'mobx-router';
import views from './model/Views';
import Navbar from './components/Navbar';

startRouter(views, store);

ReactDOM.render(
  <div>
    <Navbar />
    <div style={{ maxWidth: 1000, margin: 'auto' }}>
      <Provider store={store}>
        <MobxRouter/>
      </Provider>
    </div>
  </div>,
  document.getElementById('root')
);
