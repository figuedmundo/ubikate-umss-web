import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.resource('login');

    this.route('places', function() {
        this.route('show', {
            path: ':id'
        });
    });

    this.route('home', {
        path: '/'
    });

    this.route('ways', function() {
        this.route('show', {
            path: ':source/:target'
        });
    });
});

export default Router;
