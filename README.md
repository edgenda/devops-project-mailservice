# Email sender with Mailjet listening a RabbitMQ queue

The following environment variables are mandatory:
- `MAILJET_API_KEY`
- `MAILJET_API_SECRET`

The following are optional:
- `RABBIT_HOST` (default to localhost)
- `RABBIT_PORT` (default to 5672)
