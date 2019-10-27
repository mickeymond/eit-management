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
  prefix: '/eits',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user()) {
      redirect('/');
    }
  }]
});

// handling /eits/add route
eitsRoutes.route('/add', {
  action: function() {
    mount(AddEIT);
  }
});

// handling /eits/:id/edit
eitsRoutes.route('/:id/edit', {
  action: function() {
    mount(EditEIT);
  }
});