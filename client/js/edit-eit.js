import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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

    // Update EIT into Datadase
    Meteor.call('eits.update', this._id, firstname, surname, +age, country);

    // Naviaget to Home
    Router.go('/');
  }
});
