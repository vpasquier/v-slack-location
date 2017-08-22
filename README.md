# Slack Location Command

[![Join the chat at https://gitter.im/v-ges/Lobby](https://badges.gitter.im/v-slack-location/Lobby.svg)](https://gitter.im/v-slack-location/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`Slack Location` is a tool to quickly view Slack team members sorted by location (depending on their status icon or text). Looking for the timezone is not implemented because you need for each user to call [this](https://api.slack.com/methods/users.info) and this tool has no tracking purpose :)

It is just an example of a Serverless Slack Command Integration using AWS Lambda and AWS API Gateway.

## The example flow

- The Slack client (`/location` command) is [sending a POST](https://api.slack.com/slash-commands#how_do_commands_work).
- The API Gateway is transforming the Form body into JSON (see Velocity script `aws-template-api-gateway` in the tree below).
- The Lambda is taking the hand and calling the Slack API for fetching the Slack team members information (via OAuth).
- Slack is returing the information post-filtered by the Lambda which is returning a [proper JSON response](https://api.slack.com/slash-commands#responding_to_a_command) for the Slack client.

Here is [the article](https://medium.com/@vladimir.pasquier/how-to-aws-lambda-and-slack-app-dea65d13b867) with more visuals.

## Getting Started with Slack Location

Slack App creation:

- Go to your Slack team and create a custom App
- Add a custom command and activate the OAuth installing the App to your team
- In the custom command window give the API Gateway link
- Take the token in the App description and put it in `config.json`
- Take the OAuth token in the App management and put it in `config.json`

API Lambda:

You can create directly the lambda via the console or using the shell scripts inside of this repository (check the package.json for all `npm` commands).

- Create your lambda and associate it with the default IAM role
- Enable CloudWatch

API Gateway:

- Create an API Gateway in POST
- Add a custom Velocity template (`aws-template-api-gateway` in this repository) to the integration request
- Enable CloudWatch

Dev:

- Deploy your lambda to test (`npm run deploy`) and test it with a simple CURL to check if everything is well received
- Use `npm test` of course
- If you have any issue with Slack client, don't hesitate [this issue](https://stackoverflow.com/questions/45739710/custom-slack-command-with-aws-api-gateway-500-service-error) I was facing

NB: You have 1M calls for free with AWS Lambda

## Build

From GitHub:

```
$ git clone git@github.com:vpasquier/v-slack-location.git
$ cd v-slack-location
$ npm install
$ npm build (to zip ready for being deployed on AWS)
$ npm run deploy (to update the AWS lambda script and pushing the zip)
$ npm test (to run the jasmine test)
```

## Reporting issues

You can follow the developments and report issues here on github in this repository or on [https://waffle.io/vpasquier/v-slack-location](https://waffle.io/vpasquier/v-slack-location).

## Slack Location License

Slack Location  uses the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
