import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/login'});

  this.route('places', function() {
    this.route('show', {
        path: ':id'
    });
    this.route('new', {path: '/new'});

    this.route('edit', {
      path: ':id/edit'
    });
  });

  this.route('home', {
      path: '/'
  });

  // this.route('ways', function() {
  //     this.route('show', {
  //         path: ':source/:target'
  //     });
  // });
  this.route('report');
  this.route('signup');
});

export default Router;
