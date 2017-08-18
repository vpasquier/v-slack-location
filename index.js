var config = require("./config.json");
var request = require("request");

exports.handler = function(event, context) {
  console.log("Start Lambda - Payload content:", event);

  if (event.token !== config.token) {
    return context.fail("Unauthorized request. Check [docUrl]");
  }

  console.log("Slack Command Token is correct...");

  request("https://slack.com/api/users.list?token=" + config.oauthToken, function(error, response, body) {
    console.log("Returning from the Slack member list access call...");

    if (error || !response) {
      return context.fail("Cannot access to Slack team - " + error);
    } else {
      if (response && response.statusCode !== 200) {
        return context.fail("Cannot access to Slack team users - Code:" + response.statusCode + " - " + response);
      }
    }

    let json = JSON.parse(body);

    if (!json.ok) {
      context.fail("Cannot access to Slack team - " + json.error);
    }

    let status = [];
    for (var i = 0; i < json.members.length; i++) {
      // "status_text": "NYC",
      // "status_emoji": ":flag-us:",
      if (!json.members[i].profile.is_bot && json.members[i].profile.real_name !== "slackbot") {
        status.push(json.members[i].profile.status_text);
      }
    }

    let responseBody = {};
    responseBody.text = "People Location\n\n" + status;
    context.succeed(responseBody);
  });
};
