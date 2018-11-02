/* eslint no-console: "off" */

if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
  console.error('MAILJET_API_KEY & MAILJET_API_SECRET not defined, exiting');
  process.exit(1);
}

const RABBIT_URL = `amqp://${process.env.RABBIT_HOST || 'localhost'}:${process.env.RABBIT_PORT || 5672}`;
const { MAILJET_API_KEY, MAILJET_API_SECRET } = process.env;

const Mailjet = require('node-mailjet').connect(MAILJET_API_KEY, MAILJET_API_SECRET);
const RabbitMQContext = require('rabbit.js').createContext(RABBIT_URL);

function sendEmail(email) {
  Mailjet.post('send').request({
    FromEmail: email.senderEmail,
    FromName: email.senderName,
    Subject: email.subject,
    'Text-part': email.body,
    Recipients: [
      {
        Email: email.receiverEmail,
        Name: email.receiverName,
      },
    ],
  }).then(() => {
    console.log('Email succesfully send');
  }).catch((error) => {
    console.error(`Unable to send email : ${error.message}`);
  });
}

RabbitMQContext.on('ready', () => {
  const worker = RabbitMQContext.socket('WORKER', { routing: 'topic' });

  worker.connect('emails', () => {
    worker.on('data', (data) => {
      console.log('Receive a message in the email queue :');
      const email = JSON.parse(data);
      console.log(email);
      sendEmail(email);
      worker.ack();
    });
  });
});

RabbitMQContext.on('error', (error) => {
  console.error(error);
});
