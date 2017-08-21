var proxyquire = require('proxyquire');
var config = require('./config-test.json');

describe('Lambda Slack Location', function () {
    let lambda, context;

    beforeEach(function () {
        lambda = proxyquire('../index', {});
        context = jasmine.createSpyObj('context', ['done', 'succeed', 'fail']);
    });

    it('should return a token check failure', function () {
        let evnt = {
            token: 'fail'
        };
        waitsFor(lambda.handler(evnt, context),"The Ajax call timed out.",5000);
        runs(function () {
            expect(context.fail).toHaveBeenCalled();
            expect(context.succeed).not.toHaveBeenCalled();
        });
    });

    it('should succeed', function () {
        let evnt = {
            token: config.token
        };
        waitsFor(lambda.handler(evnt, context),"The Ajax call timed out.",5000);
        runs(function () {
            expect(context.fail).toHaveBeenCalled();
            expect(context.succeed).not.toHaveBeenCalled();
        });
    });
});