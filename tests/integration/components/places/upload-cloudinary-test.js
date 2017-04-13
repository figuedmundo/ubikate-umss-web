import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('places/upload-cloudinary', 'Integration | Component | places/upload cloudinary', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{places/upload-cloudinary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#places/upload-cloudinary}}
      template block text
    {{/places/upload-cloudinary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
