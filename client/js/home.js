import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'

import EITs from '../../lib/collections/eits';

import '../html/home.html';

Template.home.onCreated(function bodyOnCreated() {
  // this.isAllChecked = new ReactiveVar(false);
  this.checkedEITs = new ReactiveVar([]);
});

// Template Helpers
Template.home.helpers({
  eits() {
    return EITs.find({});
  },

  isSomeChecked() {
    const instance = Template.instance();
    return instance.checkedEITs.get().length !== 0;
  },

  isMentor() {
    return (Meteor.user() && (Meteor.userId() === this.mentor));
  }
});

Template.home.events({
  "click .delete-eit": function(e) {
    // Prevent Default Action
    e.preventDefault();

    // Call delete method
    Meteor.call('eits.delete', this._id);
  },

  // "change #all": function(e, instance) {
  //   // Prevent Default Action
  //   e.preventDefault();

  //   if (e.target.checked) {
  //     instance.isAllChecked.set(true);
  //   } else {
  //     instance.isAllChecked.set(false);
  //   }
  // },

  "change .eit-check": function(e, instance) {
    // Prevent Default Action
    e.preventDefault();

    if (e.target.checked) {
      const oldEitIds = instance.checkedEITs.get();
      instance.checkedEITs.set([...oldEitIds, e.target.id]);
    } else {
      const oldEitIds = instance.checkedEITs.get();
      instance.checkedEITs.set(oldEitIds.filter(each => each !== e.target.id));
    }

    // console.log(instance.checkedEITs.get());
  },

  "click #delete-checked": function(e, instance) {
    // Prevent Default Action
    e.preventDefault();

    // Perform Bulk Delete
    Meteor.call('eits.bulk_delete', instance.checkedEITs.get());

    // Reset the state of checkedEITs
    instance.checkedEITs.set([]);
  }
});
