/**
 * Created by cnichols on 2017-05-14.
 */
$( document ).ready(function() {
    AWS.config.update({
        accessKeyId: settings.awsConfig.accessKeyId,
        secretAccessKey: settings.awsConfig.secretAccessKey,
        region:settings.awsConfig.region
    });

    var sns = new AWS.SNS();

    $('#sendEvent').click({'sns': sns}, function (event) {
        publishSNSTestEvent(event.data.sns);
    });

});

function publishSNSTestEvent(snsObject) {
    var publishParams = {
        Message: 'test',
        Subject: 'test subject',
        TopicArn: 'arn:aws:sns:us-east-1:594800480309:simpleLeaderboard'
    };
    snsObject.publish(publishParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}