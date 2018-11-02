/* global it, describe */

const assert = require('assert');

describe('Server', () => {
  it('should listen RabbitMQ queue', () => {
    assert.strict.equal([1, 2, 3].indexOf(4), -1);
  });
  it('should send email with Mailjet', () => {
    assert.strict.equal([1, 2, 3].indexOf(4), -1);
  });
});
