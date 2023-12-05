import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";


const userPool = new CognitoUserPool({
  UserPoolId: 'eu-west-1_Iug3XSwRq',
  ClientId: '2rer1p6jedoh35vtghn8s41s5p'
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


export function setNewPassword(newPassword, setNewPasswordRequired) {
    if (!currentUser) {
            console.error('Cognito user is not available.');
            return;
        }
        // Assume cognitoUser is in scope, you'd need to make it accessible here.
        currentUser.completeNewPasswordChallenge(newPassword, {}, {
            onSuccess: (session) => {
                console.log('Password updated successfully!', session);
                setNewPasswordRequired(false);
            },
            onFailure: (err) => {
                console.error('Error updating password:', err);
            },
        });
}


export function signIn(username, password, setNewPasswordRequired) {

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
                currentUser = cognitoUser;
                setNewPasswordRequired(true)
                // Do something
            },
        })
    })
}