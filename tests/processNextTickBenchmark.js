// processNextTickBenchmark.js
const SendGridService = require('../Email/mailer');

const mail = new SendGridService();

const userEmailInfo = {
  first_name: 'Paul',
  email: 'paulchidiadi@gmail.com',
  subject: 'Verify your Ubefu Account',
  otp: 12356,
};

function processNextTickBenchmark() {
  process.nextTick(async () => {
    // Logic deferred to the next tick
    await mail.sendOTP(userEmailInfo);
  });
}

module.exports = processNextTickBenchmark;
