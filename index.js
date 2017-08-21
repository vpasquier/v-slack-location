var config = require("./config.json");
var request = require("request");

exports.handler = function (event, context) {
    console.log("Start Lambda - Payload content:", event);

    if (event.token !== config.token) {
        return context.fail("Unauthorized request. This token is not valid:" + config.token);
    }

    console.log("Slack Command Token is correct.");

    request("https://slack.com/api/users.list?token=" + config.oauthToken, function (error, response, body) {
        console.log("Returning from the Slack member list access call.");

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

        let status = {};
        status.users = [];

        for (var i = 0; i < json.members.length; i++) {
            // "status_text": "NYC",
            // "status_emoji": ":flag-us:",
            if (!json.members[i].profile.is_bot && json.members[i].profile.real_name !== "slackbot") {
                console.log(json.members[i].profile.status_emoji);
                status.id = json.members[i].profile.status_emoji;
                console.log(status);
                status.users.push(json.members[i].profile.name + " - " + json.members[i].profile.status_text);
                console.log(status);
            }
        }

        let responseBody = {};
        responseBody.text = "People Location\n";
        for (var i = 0; i < status.length; i++) {
            responseBody.text = status[i].id + "\n";
            for (var j = 0; j < status[i].users.length; j++) {
                responseBody.text = status[i].users[j] + "\n";
            }
        }

        context.succeed(responseBody);
    });
};
