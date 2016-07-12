import Ember from 'ember';

export default Ember.Controller.extend({

  userLocation: null,
  shortestRoute: Ember.computed('getRoute', {
    get() {
      return this.get('getRoute');
    }
  }),

  lat: Ember.computed('model', {
    get() {
      return this.get('model').geometry.coordinates[1];
    }
  }),

  lng: Ember.computed('model', {
    get() {
      return this.get('model').geometry.coordinates[0];
    }
  }),

  zoom: 17,


  loc: Ember.computed('lat', 'lng', {
    get() {
      return [this.get('lat'), this.get('lng')];
    }
  })

});
