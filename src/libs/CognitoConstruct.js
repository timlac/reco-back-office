import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";


const userPool = new CognitoUserPool({
  UserPoolId: 'eu-west-1_1Fq4BVn1a',
  ClientId: '6ch34dsufoc3hv2p49tv14151h'
});


let currentUser = userPool.getCurrentUser(); // This variable will hold the current CognitoUser object


export function getCurrentSession() {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser();
    }
    return new Promise(function (resolve, reject) {
        currentUser.getSession(function (err, session) {
            if (err) {
                reject(err);
            } else {
                resolve(session); // Resolve the promise with the session, not the user
            }
        })
    })
}


export function signIn(username, password) {

    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                currentUser = cognitoUser;
                resolve(result)
            },
            onFailure: (err) => {
                console.error('Sign-in error:', err);
                reject(err)
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                console.log('New password required');
                // Do something
            },
        })
    })
}