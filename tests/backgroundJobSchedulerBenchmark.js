// backgroundJobSchedulerBenchmark.js
const SendGridService = require('../Email/mailer');
const Queue = require('bull');
const sendEmailQueue = new Queue('sendEmailQueue');

const mail = new SendGridService();

const userEmailInfo = {
  first_name: 'Paul',
  email: 'paulchidiadi@gmail.com',
  subject: 'Verify your Ubefu Account',
  otp: 12356,
};

async function backgroundJobSchedulerBenchmark() {
  await sendEmailQueue.add(userEmailInfo);
  await sendEmailQueue.process(async (job) => {
    // Email sending logic
    const emailData = job.data;
    await mail.sendOTP(emailData);
  });
}

module.exports = backgroundJobSchedulerBenchmark;
