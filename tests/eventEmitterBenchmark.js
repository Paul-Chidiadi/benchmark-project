// eventEmitterBenchmark.js
const SendGridService = require('../Email/mailer');
const EventEmitter = require('events');

const emitter = new EventEmitter();
// Set the maximum number of listeners for 'testEvent'
// emitter.setMaxListeners(25); // Set the limit to an appropriate value

const mail = new SendGridService();

const userEmailInfo = {
  first_name: 'Paul',
  email: 'paulchidiadi@gmail.com',
  subject: 'Verify your Ubefu Account',
  otp: 12356,
};

function eventEmitterBenchmark() {
  emitter.on('testEvent', async () => {
    // Event handling logic
    await mail.sendOTP(userEmailInfo);
  });

  emitter.emit('testEvent');

  // Remove the event listener
  emitter.removeAllListeners('testEvent');
}

module.exports = eventEmitterBenchmark;
