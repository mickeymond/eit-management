
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import EITs from './eits';
import '../methods/eits';
 
if (Meteor.isServer) {
  describe('EITs', () => {
    describe('methods', () => {

      const dummyEITs = [
        { firstname: "Paul", surname: "Allen", age: 34, country: 'Mexico' },
        { firstname: "Barry", surname: "Allen", age: 65, country: 'Morroco' },
        { firstname: "Simon", surname: "Allardice", age: 32, country: 'Benin' },
        { firstname: "Bill", surname: "Weinnman", age: 43, country: 'Mali' },
        { firstname: "Mark", surname: "Garry", age: 56, country: 'Ghana' },
      ];

      let loggedInUser, eitId, fakeUserId;

      before(() => {
        Meteor.users.remove({});
        Accounts.createUser({username: 'testuser', password: 'testuser'});
        loggedInUser = Meteor.users.findOne({ username: 'testuser' });
        fakeUserId = Random.id();
      });
 
      beforeEach(() => {
        EITs.remove({});
        eitId = EITs.insert({
          firstname: 'Michael',
          surname: 'Hammond',
          age: 54,
          country: 'Ghana',
          mentor: loggedInUser._id,
        });
      });


      it('Can add EIT if Authenticated', () => {
        const insertEIT = Meteor.server.method_handlers['eits.insert'];
 
        const invocation = { userId: loggedInUser._id };
 
        insertEIT.apply(invocation, ['Samuel', 'Hammond', 65, 'Ghana']);
 
        assert.equal(EITs.find().count(), 2);
      });

      it('Cannot add EIT if not Authenticated', () => {
        const insertEIT = Meteor.server.method_handlers['eits.insert'];
 
        const invocation = {};
 
        assert.throws(() => {
          insertEIT.apply(invocation, ['Samuel', 'Hammond', 65, 'Ghana']);
        });
 
        assert.equal(EITs.find().count(), 1);
      });

      it('Can edit own EIT', () => {
        const updateEIT = Meteor.server.method_handlers['eits.update'];
 
        const invocation = { userId: loggedInUser._id };
 
        updateEIT.apply(invocation, [eitId, 'Samuel', 'Hammond', 65, 'Ghana']);

        const eit = EITs.findOne(eitId);
 
        assert.equal(eit.firstname, 'Samuel');
        assert.equal(eit.surname, 'Hammond');
        assert.equal(eit.age, 65);
        assert.equal(eit.country, 'Ghana');
      });

      it('Cannot edit someone EIT', () => {
        const updateEIT = Meteor.server.method_handlers['eits.update'];
 
        const invocation = { userId: fakeUserId };
 
        assert.throws(() => {
          updateEIT.apply(invocation, [eitId, 'Samuel', 'Hammond', 65, 'Ghana']);
        });

        const eit = EITs.findOne(eitId);
 
        assert.equal(eit.firstname, 'Michael');
        assert.equal(eit.surname, 'Hammond');
        assert.equal(eit.age, 54);
        assert.equal(eit.country, 'Ghana');
      });

      it('Can delete own EIT', () => {
        const deleteEIT = Meteor.server.method_handlers['eits.delete'];
 
        const invocation = { userId: loggedInUser._id };
 
        deleteEIT.apply(invocation, [eitId]);
 
        assert.equal(EITs.find().count(), 0);
      });

      it('Cannot delete someone EIT', () => {
        const deleteEIT = Meteor.server.method_handlers['eits.delete'];
 
        const invocation = { userId: fakeUserId };
 
        assert.throws(() => {
          deleteEIT.apply(invocation, [eitId]);
        });

        const eit = EITs.findOne(eitId);
 
        assert.equal(eit.firstname, 'Michael');
        assert.equal(eit.surname, 'Hammond');
        assert.equal(eit.age, 54);
        assert.equal(eit.country, 'Ghana');
      });

      it('Can bulk delete own EITs', () => {
        // Insert Bulk EITs before test
        const ids = dummyEITs.map(dummyEIT => EITs.insert({ ...dummyEIT, mentor: loggedInUser._id }));

        assert.equal(EITs.find().count(), 1 + dummyEITs.length);

        const deleteBulkEITs = Meteor.server.method_handlers['eits.bulk_delete'];
 
        const invocation = { userId: loggedInUser._id };
 
        deleteBulkEITs.apply(invocation, [ids]);
 
        assert.equal(EITs.find().count(), 1);
      });

      it('Cannot bulk delete someone EITs', () => {
        // Insert Bulk EITs before test
        const ids = dummyEITs.map(dummyEIT => EITs.insert({ ...dummyEIT, mentor: loggedInUser._id }));

        assert.equal(EITs.find().count(), 1 + dummyEITs.length);

        const deleteBulkEITs = Meteor.server.method_handlers['eits.bulk_delete'];
 
        const invocation = { userId: fakeUserId };
 
        deleteBulkEITs.apply(invocation, [ids]);
 
        assert.equal(EITs.find().count(), 1 + dummyEITs.length);
      });
    });
  });
}