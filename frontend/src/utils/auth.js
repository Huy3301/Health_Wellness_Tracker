import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { poolData } from '../cognitoConfig';

const userPool = new CognitoUserPool(poolData);

export function signUp(email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, [{ Name: 'email', Value: email }], null, (err, result) => {
            if (err) return reject(err);
            resolve(result.user);
        });
    });
}

export function confirmSignUp(email, code) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export function login(email, password) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (session) => resolve({ user, session }),
            onFailure: (err) => reject(err),
        });
    });
}

export function logout() {
    const user = userPool.getCurrentUser();
    if (user) user.signOut();
}

export function getSession() {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) return reject(new Error('No user found'));

        user.getSession((err, session) => {
            if (err) return reject(err);
            resolve(session);
        });
    });
}
