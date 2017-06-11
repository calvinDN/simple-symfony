/**
 * Created by cnichols on 2017-05-27.
 */
exports.handler = (event, context, callback) => {
    event.response.autoConfirmUser=true;
    callback(null, event);
};



// http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html