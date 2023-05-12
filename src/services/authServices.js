import { get, post, put, request } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

const endpoints = {
  'login': '/login',
  'logout': '/logout',
  'register': '/users',
  'edit': (userId) => `/users/${userId}`,
  'users': '/users'
}

export async function getUsersCount() {
  const response = await get(endpoints.users, { count: 1 });
  return response.count;
};

export async function loginUser(username, password) {
  const data = await post(endpoints.login, { username, password });
  const sessionToken = data.sessionToken;
  Parse.User.become(sessionToken);
  localStorage.setItem('user', JSON.stringify(data));
};

export async function registerUser(password, username, emailAddress) {
  const parseUser = new Parse.User();
  parseUser.setUsername(username);
  parseUser.setPassword(password);
  parseUser.setEmail(emailAddress);
  parseUser.set('emailAddress', emailAddress);

  try {
    await parseUser.signUp();
    console.log(`email:${emailAddress}, username: ${username}, password: ${password}`);
    localStorage.setItem('user', JSON.stringify(parseUser.toJSON()));
  } catch (error) {
    throw error;
  }
}

export function getUserBookmarks() {
  const currentUser = Parse.User.current();
  if (currentUser) {
    const query = new Parse.Query(Parse.User);
    query.include('userBookmarks');
    return query.get(currentUser.id)
      .then(user => {
        return user.get('userBookmarks');
      })
      .catch(error => console.error(error));
  }
  return null;
}

export async function logoutUser() {
  localStorage.clear();
  await post(endpoints.logout)

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
  console.log(editedUserData);
  const user = await put(endpoints.edit(userId.toString()), editedUserData);
  console.log(user);
  updateLocalStorage(editedUserData);
};

function updateLocalStorage(updatedData) {
  let user = JSON.parse(localStorage.getItem('user'));
  Object.entries(updatedData).map(([key, value]) => user[key] = value);
  localStorage.setItem('user', JSON.stringify(user));
};

export async function getAllUsernames() {
  const response = await get('/classes/_User', { keys: 'username' });
  const results = response.results;
  const username = results.map(result => result.username);

  return username;
};

export async function getAllUsers() {
  const User = Parse.Object.extend('User');
  const query = new Parse.Query(User);
  query.select('username', 'emailAddress', 'role', 'objectId');
  const results = await query.find();

  return results.map(result => ({
    username: result.get('username'),
    email: result.get('emailAddress'),
    role: result.get('role'),
    objectId: result.id
  }));
}


export async function getAllEmails() {
  const response = await get('/classes/_User', { keys: 'emailAddress' });
  const results = response.results;
  const emailAddresses = results.map(result => result.emailAddress);

  return emailAddresses;
};





