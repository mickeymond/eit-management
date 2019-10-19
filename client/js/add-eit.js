import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Templates Events
Template.add_eit.events({
  "submit #add-eit": function(e) {
    // Prevent default behaviour
    e.preventDefault();

    // Collect Input Values
    const firstname = e.target.firstname.value;
    const surname = e.target.surname.value;
    const age = e.target.age.value;
    const country = e.target.country.value;

    // Insert EIT into Datadase
    Meteor.call('eits.insert', firstname, surname, +age, country);

    // Naviaget to Home
    Router.go('/');
  }
  
});
