import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
      sendEmailToUser: function() {
          var controller = this.get('controller');
          let email = controller.get('email');
          console.log(email);

          controller.set('email', null);
          this.transitionTo('home');
      },
    }
});
