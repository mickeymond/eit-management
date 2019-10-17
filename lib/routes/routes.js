Router.configure({
  layoutTemplate: 'main_template'
});

Router.map(function() {
  // Home
  this.route('home', {
    path: '/',
    template: 'home'
  });

  // Signup
  this.route('add-eit', {
    path: '/add-eit',
    template: 'add_eit'
  });
})
