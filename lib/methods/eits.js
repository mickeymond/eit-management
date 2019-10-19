import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import EITs from '../collections/eits';

Meteor.methods({
  'eits.insert'(firstname, surname, age, country) {
    // Check if User is has the right Permissions
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }

    // Validate Incoming Data
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Insert New EIT
    EITs.insert({ firstname, surname, age, country, mentor: Meteor.userId() });
  },

  'eits.update'(_id, firstname, surname, age, country) {
    // Check if User is has the right Permissions
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }

    // Find Existing Data
    const eit = EITs.findOne({ _id });

    // Check if User can edit eit
    if (Meteor.userId() !== eit.mentor) {
      return new Meteor.Error('Not Authorised to Edit EIT');
    }

    // Validate Incoming Data
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Update EIT
    EITs.update(_id, { firstname, surname, age, country });
  },

  'eits.delete'(id) {
    // Check if User is has the right Permissions
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }

    // Validate Incoming Data
    check(id, String);

    // Delete EIT
    EITs.remove(id);
  }
});
