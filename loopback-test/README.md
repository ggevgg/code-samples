# Conversion API
This is test implementation of currency exchange rate conversion

# Requirements

 - [Node.js 12][node]
 - [Docker][docker]
 - [Docker-compose][docker-compose]

[node]: https://nodejs.org
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/

# Stack

 - Loopback 4
 - TypeScript

# Running the environment

  ```bash
  docker-compose up -d
  ```


3 containers will be launched:
1. Publisher - provides endpoint ```​/conversion-rate?from={from}to={to}&email={email}``` for currency convertor and adds tasks to the queue.
Created in a separate container for maximum query processing speed.
2. Consumer - takes task from the queue, makes request to openexchangerate.com, calculates currency rate and sends email
3. SQS - provides a containerized Java implementation of the Amazon Simple Queue Service (AWS-SQS)


# Configuration

API should be configured via environment variables.

 - Set openexchangerates.com app ID: `OPENEXCHANGERATES_APP_ID`
 - Set AWS access key ID: `AWS_ACCESS_KEY_ID`
 - Set AWS secret key: `AWS_SECRET_ACCESS_KEY`
 - Set AWS/SQS region: `SQS_REGION`
 - Set AWS/SQS endpoint: `SQS_ENDPOINT`
 - Set AWS/SQS queue name: `SQS_QUEUE_NAME` (default)

By default, the Publisher will start on port `3000`. This can be modified by setting the `PORT` environment variable to another number

To access the server OpenApi Explorer, go to http://localhost:3000/explorer

# Notes

1. Due to the fact that the free openexchangerate plan does not allow us to set the base currency, I had to convert it via an intermediate currency USD
2. Perhaps it would be better to use AWS Lambda instead of VM instance for Consumer handler to reduce the cost of maintenance and better scalability
