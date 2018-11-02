// Simple program that send a test email to the queue every 20 seconds

const context = require('rabbit.js').createContext();

const pub = context.socket('PUSH');

function sendTestMessage() {
  pub.connect('emails', () => {
    pub.write(JSON.stringify({
      senderEmail: 'bdigeon@clever-age.com',
      senderName: 'sender',
      receiverEmail: 'bdigeon@clever-age.com',
      receiverName: 'receiver',
      subject: `Email send at ${Date.now()}`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }), 'utf8');
  });
}

setInterval(sendTestMessage, 20 * 1000);
