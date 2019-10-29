import { Meteor } from 'meteor/meteor';
import EITs from '../collections/eits';

FlowRouter.route('/', {
  action: function(params) {
      BlazeLayout.render("home");
  }
});

const eitsRoutes = FlowRouter.group({
  prefix: '/eits'
});

// handling /eits/add route
eitsRoutes.route('/add', {
  action: function() {
    BlazeLayout.render('add_eit');
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
    BlazeLayout.render('edit_eit');
  },
  triggersEnter: [function(context, redirect) {
    // const eit = EITs.findOne(context.params.id);
    // console.log(eit);
    if (!Meteor.user()) {
      redirect('/');
    }
  }]
});
