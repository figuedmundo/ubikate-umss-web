import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('places', function() {
    this.route('show', {
      path: ':id'
    });

  });

  this.route('home', { path: '/' });

  // this.route('finder', { path: '/finder/:place_id' });

  this.route('ways', function() {
    this.route('show', {
      path: ':source/:target'
    });
  });

});

export default Router;
