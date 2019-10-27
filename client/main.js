import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';

import '../lib/routes/routes';
 
Meteor.startup(() => {
  render(<MainLayout />, document.getElementById('render-target'));
});