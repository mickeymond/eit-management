import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import EITs from '../collections/eits';

if (Meteor.isServer) {
  Meteor.publish('eits', function eitsPublication() {
    return EITs.find({});
  });
}

Meteor.methods({
  'eits.insert'(firstname, surname, age, country) {
    // Check if User is has the right Permissions
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }

    // Validate Incoming Data
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Insert New EIT
    EITs.insert({ firstname, surname, age, country, mentor: this.userId });
  },

  'eits.update'(_id, firstname, surname, age, country) {
    // Check if User is has the right Permissions
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }

    // Find Existing Data
    const eit = EITs.findOne({ _id });

    // Check if User can edit eit
    if (this.userId !== eit.mentor) {
      throw new Meteor.Error('Not Authorised to Edit EIT');
    }

    // Validate Incoming Data
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Update EIT
    EITs.update(_id, { $set: { firstname: firstname, surname: surname, age: age, country: country } });
  },

  'eits.delete'(_id) {
    // Check if User is has the right Permissions
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }

    // Validate Incoming Data
    check(_id, String);

    // Find Existing Data
    const eit = EITs.findOne({ _id });

    // Check if User can edit eit
    if (this.userId !== eit.mentor) {
      throw new Meteor.Error('Not Authorised to Edit EIT');
    }

    // Delete EIT
    EITs.remove(_id);
  },

  'eits.bulk_delete'(ids) {
    // Check if User is has the right Permissions
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }

    // Validate Incoming Data
    check(ids, Array);

    // Delete EIT
    EITs.remove({ _id: { $in: ids }, mentor: this.userId });
  }
});
