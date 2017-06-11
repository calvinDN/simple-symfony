/**
 * Created by cnichols on 2017-05-14.
 */
$( document ).ready(function() {
    AWS.config.update({
        accessKeyId: settings.awsConfig.accessKeyId,
        secretAccessKey: settings.awsConfig.secretAccessKey,
        region:settings.awsConfig.region
    });


    /*var confirmSignupObject = {
        //UserPoolId : 'us-east-1_CUZh9IpOn',
        ClientId : '4gsf19369vn83ia95jokftt74s'
        ConfirmationCode : '',
        Username: ''
    };*/
    //var userPool2 = new AWSCognito.CognitoIdentityServiceProvider.confirmSignUp(attributeList);s

    $('#cognitoSignup').click(function (event) {
        data = {
            email: $('input[name=\'email\']').val(),
            username: $('input[name=\'username\']').val(),
            password: $('input[name=\'password\']').val()
        }
        cognitoEvent(data);
    });

});

function cognitoEvent(data) {
    AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

    var poolData = { UserPoolId : 'us-east-1_CUZh9IpOn',
        ClientId : '4gsf19369vn83ia95jokftt74s'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : data.email
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(data.username, data.password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}