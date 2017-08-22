const config = require("./config.json");
const request = require("request");

exports.handler = function (event, context) {
    "use strict";
    console.log("Start Lambda - Payload content:", event);

    if (event.token !== config.token) {
        return context.fail("Unauthorized request. This token is not valid:" + config.token);
    }

    request("https://slack.com/api/users.list?token=" + config.oauthToken, function (error, response, body) {
        if (!(error || !response)) {
            if (response && response.statusCode !== 200) {
                return context.fail("Cannot access to Slack team users - Code:" + response.statusCode + " - " + response);
            }
        } else {
            return context.fail("Cannot access to Slack team - " + error);
        }

        let json = JSON.parse(body);

        if (!json.ok) {
            context.fail("Cannot access to Slack team - " + json.error);
        }

        let statusList = [];

        json.members.forEach(function (member) {
            let profile = member.profile;
            let bot = profile.is_bot || profile.bot_id;
            if (!bot && profile.real_name !== "slackbot") {
                let id = profile.status_emoji;
                if (!id) {
                    return;
                }else{
                    if(id.indexOf("flag")==-1) {
                        return;
                    }
                }
                if (!statusList[id]) {
                    statusList[id] = [];
                }
                if (profile.status_text) {
                    statusList[id].push(profile.real_name + " - " + profile.status_text);
                } else {
                    statusList[id].push(profile.real_name);
                }
            }
        });

        let responseBody = {};
        responseBody.text = "";
        for (var id in statusList) {
            responseBody.text = responseBody.text + id + "\n";
            statusList[id].forEach(function (user) {
                responseBody.text = responseBody.text + user + "\n";
            });
            responseBody.text = responseBody.text + "\n";
        }

        // For unit tests purpose
        event.result = responseBody.text;

        context.succeed(responseBody);
    });
};
