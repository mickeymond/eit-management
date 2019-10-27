import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

import Home from '../../client/screens/Home';
import AddEIT from '../../client/screens/AddEIT';
import EditEIT from '../../client/screens/EditEIT';

FlowRouter.route('/', {
  action: function(params) {
    mount(Home);
  }
});

const eitsRoutes = FlowRouter.group({
  prefix: '/eits'
});

// handling /eits/add route
eitsRoutes.route('/add', {
  action: function() {
    mount(AddEIT);
  },
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user()) {
      redirect('/');
    }
  }]
});

// handling /eits/:id/edit
eitsRoutes.route('/:id/edit', {
  action: function() {
    mount(EditEIT);
  },
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user()) {
      redirect('/');
    }
  }]
});