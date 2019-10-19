import EITs from '../collections/eits';

Router.configure({
  layoutTemplate: 'main_template'
});

Router.map(function() {
  // Home
  this.route('home', {
    path: '/',
    template: 'home'
  });

  // Add EIT
  this.route('add-eit', {
    path: '/eits/add',
    template: 'add_eit'
  });

  // Edit EIT
  this.route('edit-eit', {
    path: '/eits/:_id/edit',
    template: 'edit_eit',
    data: function() {
      return EITs.findOne({ _id: this.params._id });
    }
  });
})
