import * as React from 'react';
import { MobxRouter, Route, RouterStore } from 'mobx-router';
import HelloComponent from '../components/Hello';
import SearchProducts from '../components/SearchProducts';
import DentalsSelection from '../components/DentalsSelection';
import ProductDetails from '../components/ProductDetails';
import { store } from './Store';

export default {
  home: new Route({
    path: '/',
    component: <HelloComponent store={store}/>,
  }),
  search: new Route({
    path: '/search',
    /*beforeEnter: () => {
      store.loadBunnies();
    },*/
    component: <SearchProducts store={store}/>,
  }),
  dentalsSelection: new Route({
    path: '/dentals_selection',
    component: <DentalsSelection store={store}/>,
  }),
  productDetails: new Route({
    path: '/product_details',
    component: <ProductDetails store={store}/>,
  }),
};
