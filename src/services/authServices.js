import { get, post, put, request } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

const endpoints = {
  'login': '/account//login',
  'logout': '/account/logout',
  'register': '/account/register',
  'edit': (userId) => `/users/${userId}`,
  'users': '/users'
}

export async function getUsersCount() {
  const response = await get(endpoints.users, { count: 1 });
  return response.count;
};

export async function loginUser(username, password) {
  const response = await post(endpoints.login, { username, password });
  localStorage.setItem('user', JSON.stringify(response.data));
};

export async function registerUser(password, username, emailAddress) {
  const user = {
    username: username,
    password: password,
    email: emailAddress
  };
  
  try {
    const response = await post(endpoints.register, user);
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  localStorage.clear();
  await post(endpoints.logout)  // This might need to be a delete or get request depending on how your API is set up
};

export async function editUserInfo(userId, editedUserData) {
  try {
    await put(endpoints.edit(userId), editedUserData);
    updateLocalStorage(editedUserData)
  } catch (error) {
    console.error('Error updating user data:', error);
  }}

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
  const User = Parse.Object.extend('User');
  const query = new Parse.Query(User);

  try {
    const user = await query.get(userId);
    Object.keys(editedUserData).forEach(key => {
      user.set(key, editedUserData[key]);
    });
    updateLocalStorage(editedUserData)
    await user.save();
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}

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
  query.ascending('role');
  const results = await query.find();

  return results.map(result => result.toJSON());
}


export async function getAllEmails() {
  const response = await get('/classes/_User', { keys: 'emailAddress' });
  const results = response.results;
  const emailAddresses = results.map(result => result.emailAddress);

  return emailAddresses;
};


export async function deleteUserById(objectId) {
  const User = Parse.Object.extend('_User');
  const query = new Parse.Query(User);
  const user = await query.get(objectId);
  await user.destroy();
}

export async function getUserByUsername(username) {
  const User = Parse.Object.extend('_User');
  const query = new Parse.Query(User);
  query.equalTo('username', username);
  query.limit(1);
  const user = await query.first();
  return user ? user.toJSON() : null;
}