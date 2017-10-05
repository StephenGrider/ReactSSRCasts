import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage, { loadData } from './pages/UsersListPage';

export default [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    loadData,
    path: '/users',
    component: UsersListPage
  }
];
