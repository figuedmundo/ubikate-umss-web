import Ember from 'ember';
//import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Controller.extend({

  searchTerm: '',

  onFilterTextChange: function () {
      //wait before do something
      Ember.run.debounce(this, this.applyFilter, 800);
  }.observes('searchTerm'),

  applyFilter: function () {
    this.send('refreshModel');
  },

  actions: {
    refreshModel: function () {
      this.send('setSearchTerm');
      // this.get('target.router').refresh();
    }
  }

});
