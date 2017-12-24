import * as React from 'react';
import { MobxRouter, Route, RouterStore } from 'mobx-router';
import BunniesView from '../components/Bunnies';
import OneBunnyView from '../components/OneBunny';
import HelloComponent from '../components/Hello';
import { store } from './Store';

export default {
  home: new Route({
    path: '/',
    component: <HelloComponent store={store}/>,
  }),
  bunnies: new Route({
    path: '/bunnies',
    beforeEnter: () => {
      store.loadBunnies();
    },
    component: <BunniesView store={store}/>,
  }),
  selectedBunny: new Route({
    path: '/selected_bunny/:id',
    onEnter: (route, params, recStore, queryParams) => {
      store.loadBunny(params.id);
    },
    component: <OneBunnyView store={store}/>,
  }),
};
