import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import EITs from '../../lib/collections/eits';

import '../html/edit-eit.html';

// Templates Helpers
Template.edit_eit.helpers({
  eit() {
    const id = FlowRouter.getParam('id');
    return EITs.findOne(id);
  }
});

// Templates Events
Template.edit_eit.events({
  "submit #edit-eit": function(e) {
    // Prevent default behaviour
    e.preventDefault();

    // Collect Input Values
    const firstname = e.target.firstname.value;
    const surname = e.target.surname.value;
    const age = e.target.age.value;
    const country = e.target.country.value;

    // Get EIT id from FlowRouter
    const id = FlowRouter.getParam('id');

    // Update EIT into Datadase
    Meteor.call('eits.update', id, firstname, surname, +age, country);

    // Naviaget to Home
    FlowRouter.go('/');
  }
});
