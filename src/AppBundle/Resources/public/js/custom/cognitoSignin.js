/**
 * Created by cnichols on 2017-05-14.
 */
$( document ).ready(function() {
    //Ladda.bind( '#login' );
    var l = Ladda.create( document.querySelector( '#login' ) );
    AWS.config.update({
        accessKeyId: settings.awsConfig.accessKeyId,
        secretAccessKey: settings.awsConfig.secretAccessKey,
        region:settings.awsConfig.region
    });


    $('#login').click({'l': l}, function (event) {
        event.data.l.start();

        AWSCognito.config.region = 'us-east-1';
        var poolData = {
            UserPoolId : 'us-east-1_CUZh9IpOn',
            ClientId : '4gsf19369vn83ia95jokftt74s'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username : $('input[name=\'username\']').val(),
            Pool : userPool
        };

        var authenticationData = {
            Username: $('input[name=\'username\']').val(),
            Password: $('input[name=\'password\']').val()
        };

        var authenticationDetails =
            new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

        var cognitoUser =
            new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    l.stop();
                    $('#login-message').text('Welcome, ' + $('input[name=\'username\']').val() + '!');
                    $.cookie('cognito-session', result.idToken.jwtToken);
                    console.log('idToken + ' + result.idToken.jwtToken);
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

                    // until I figure out cors issue, make the request in the backend using guzzle
                    $.ajax({
                        url: 'https://a3eu1m9kb7.execute-api.us-east-1.amazonaws.com/v1/user',
                        type: 'GET',
                        headers: {'Authorization' : 'eyJraWQiOiJXS2JzUzU4U1dcL0FxYXpFZXArTXFmSnhIV1FvVnhsWDZVT2FkWm5hQUVRTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhYTQyZGRiOC1hMTY5LTRjNzEtOGMxMi0yZTlkYzFiYjQ4MWQiLCJhdWQiOiI0Z3NmMTkzNjl2bjgzaWE5NWpva2Z0dDc0cyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE0OTY0NTUxNDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0NVWmg5SXBPbiIsImNvZ25pdG86dXNlcm5hbWUiOiJjYWx2aW5kbiIsImV4cCI6MTQ5NjQ1ODc0NSwiaWF0IjoxNDk2NDU1MTQ1LCJlbWFpbCI6ImNhbHZpbmQrdGVzdEBnbWFpbC5jb20ifQ.Rn09zNPByhJypJCYLVSrnGdUdagrBJCASTj9KprsURggqxJH8mJ4__09uRzRc3WaKEgeAgaaEFPx8u8B2Bt8tXvbc5x7Ke76xjjile2hcVvIy31Khg0vmt0s7lyOTy2wgbyz1Szz1pUQRowj99egF0cfChwE3nVOEfPyHv6vvC8kDUT_pWzuhghn94wF-YZFDu6wQUv0uSEhKGasTztFFr-IaieMoCz-cl1q_Uqx9cjPB9VdWQWp0qsj84yhwxhvR-9tGwwO1xrfOo-k3YdMYV_P67s08DSNzI70YQhV2bhTlQuMXKk2hImkU0IHdQDnyytrLDp04WO8rN4YT2Twng'},
                        success: function(result) { alert(result); }
                    });
                },
                onFailure: function(err) {
                    l.stop();
                    $('#login-message').text(err.message);
                },
                mfaRequired: function(codeDeliveryDetails) {
                    var verificationCode = prompt('Please input verification code' ,'');
                    cognitoUser.sendMFACode(verificationCode, this);
                }
            });
    });

});
