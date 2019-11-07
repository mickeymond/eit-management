import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import EITs from '../collections/eits';

Meteor.methods({
  'eits.insert'(firstname, surname, age, country) {
    // Validate Incoming Data
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Check if User is has the right Permissions
    if (!this.userId) {
      return new Meteor.Error('Not Authorised');
    }

    // Insert New EIT
    EITs.insert({ firstname, surname, age, country, mentor: this.userId });
  },

  'eits.update'(_id, firstname, surname, age, country) {
    // Validate Incoming Data
    check(_id, String);
    check(firstname, String);
    check(surname, String);
    check(age, Number);
    check(country, String);

    // Find Existing Data
    const eit = EITs.findOne({ _id });

    // Check if User can edit eit
    if (this.userId !== eit.mentor) {
      throw new Meteor.Error('Not Authorised to Edit EIT');
    }

    // Update EIT
    EITs.update(_id, { $set: { firstname: firstname, surname: surname, age: age, country: country } });
  },

  'eits.delete'(_id) {
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
