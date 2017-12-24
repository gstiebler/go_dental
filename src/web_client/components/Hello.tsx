import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../model/Views';
import { store } from '../model/Store';
import DevTools from 'mobx-react-devtools';

function HelloComponent() {
  return (
    <div>
      <h2>Hello component! </h2>

      <ul>
        <li><Link view={views.home} store={store}>Home</Link></li>
        <li><Link view={views.bunnies} store={store}>Bunnies</Link></li>
      </ul>
      <DevTools />
    </div>
  );
}

export default observer(HelloComponent);
