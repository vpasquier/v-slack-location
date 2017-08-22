const proxyquire = require("proxyquire");
const config = require("./config-test.json");
const timeout = 3000;

describe("Lambda Slack Location", function () {
    let lambda, context;

    beforeAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    beforeEach(function (done) {
        lambda = proxyquire("../index", {});
        context = jasmine.createSpyObj("context", ["done", "succeed", "fail"]);
        let evnt = {
            token: "fail"
        };
        lambda.handler(evnt, context);
        setTimeout(function () {
            done();
        }, timeout);
    });
    it("should return a token check failure", function (done) {
        expect(context.fail).toHaveBeenCalled();
        expect(context.succeed).not.toHaveBeenCalled();
        done();
    });

});

describe("Lambda Slack Location", function () {
    let lambda, context;
    let evnt = {
        token: config.token,
        result: ""
    };

    beforeAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    beforeEach(function (done) {
        lambda = proxyquire("../index", {});
        context = jasmine.createSpyObj("context", ["done", "succeed", "fail"]);
        lambda.handler(evnt, context);
        setTimeout(function () {
            done();
        }, timeout);
    });
    it("should succeed", function (done) {
        expect(context.succeed).toHaveBeenCalled();
        expect(context.fail).not.toHaveBeenCalled();
        expect(evnt.result).toEqual(":flag-us:\nvlad letter - NYC\n\n");
        done();
    });
});