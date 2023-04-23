import { get, post, put } from './api.js';

const endpoints = {
    'login': '/login',
    'logout': '/logout',
    'register': '/users',
    'edit': (userId) => `/users/${userId}`,
    'users': '/users'
}

export async function loginUser(username, password) {
    const user = await post(endpoints.login, { username, password });
    localStorage.setItem('user', JSON.stringify(user));
};

export async function registerUser(password, username, emailAddress) {
    const user = await post(endpoints.register, { password, username, emailAddress });
    localStorage.setItem('user', JSON.stringify(user));
};

export async function logoutUser() {
    await post(endpoints.logout)
    localStorage.removeItem('user');

};

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
};

export function getCurrentSessionToken() {
    let user = getUser();
    return user.sessionToken;
};

export function getUserId() {
    let user = getUser();
    try {
        return user.objectId;
    } catch (error) {
        return;
    }
};

export async function editUserInfo(userId, editedUserData) {
    const user = await put(endpoints.edit(userId), editedUserData);
    updateLocalStorage(editedUserData);
}

function updateLocalStorage(updatedData) {
    let user = JSON.parse(localStorage.getItem('user'));
    Object.entries(updatedData).map(([key, value]) => user[key] = value);
    localStorage.setItem('user', JSON.stringify(user));
};

export async function getAllUsernames() {
    const response = await get('/classes/_User', {keys: 'username'});
    const results = response.results;
    const username = results.map(result => result.username);
    
    return username;
};

export async function getAllEmails() {
    const response = await get('/classes/_User', {keys: 'emailAddress'});
    const results = response.results;
    const emailAddresses = results.map(result => result.emailAddress);
    
    return emailAddresses;
  }