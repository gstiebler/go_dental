import * as React from 'react';
import { observer } from 'mobx-react';
import { Store, store } from '../model/Store';
import { Link } from 'mobx-router';
import views from '../model/Views';

function Navbar(props) {
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li><Link view={views.bunnies} store={store}>Bunnies</Link></li>
            <li><Link view={views.home} store={store}>Home</Link></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <p className='navbar-text'>Logged in as {'teste'}</p>
            <li><Link to='/admin/change_password'>Change password</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default observer(Navbar);
