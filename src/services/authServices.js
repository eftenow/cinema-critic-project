import { get, post, put, request } from './api.js';


const endpoints = {
  'login': '/account/login/',
  'logout': '/account/logout/',
  'register': '/account/register/',
  'myProfile': '/account/details/',
  'is_authenticated': '/account/authenticated/',
  edit: (userId) => `/account/edit/${userId}/`,
  delete: (userId) => `/account/delete/${userId}/`,
  details: (userId) => `/account/details/${userId}/`,

  'users': '/account/allUsers/'
}

export async function getUsersCount() {
  const response = await get(endpoints.users);

  return response.data.length;
};

export async function loginUser(username, password) {
  await post(endpoints.login, { username, password });
};

export async function registerUser(username, email, password, repeat_password) {
  const user = {
      username: username,
      email:  email,
      password: password,
      repeat_password: repeat_password
  };

  try {
      await post(endpoints.register, user);
      const userData = await getUser();
      return userData;
  } catch (error) {
      return error.data; 
  }
}

export async function logoutUser() {
  await post(endpoints.logout);
};


export async function editUserInfo(userId, editedUserData) {
  try {
    await put(endpoints.edit(userId), editedUserData);
    return;
  } catch (error) {
    return error.data;
  }
}


export async function checkAuthenticated() {
  const response = await get(endpoints.is_authenticated);

  return response.data.isAuthenticated;
}

export async function getUser(id = null) {
  const isAuthenticated = await checkAuthenticated();
  if (!isAuthenticated) {
    return null;
  }

  try {
    let response;
    if (id) {
      response = await get(endpoints.details(id));
    } else {
      response = await get(endpoints.myProfile)
    }
    return response.data;
  } catch (error) {
    return null;
  }
};


export async function getUserId() {
  let user = await getUser();

  try {
    return user.id;
  } catch (error) {
    return;
  }
};

export async function isProfileOwner(profileId) {
  const currentUserId = await getUserId();
  return currentUserId === profileId;
}


export async function getAllUsernames() {
  const users = await get(endpoints.users);

  const usernames = users.data.map(user => user.username)
  return usernames
};

export async function getAllUsers() {
  const users = await get(endpoints.users);
  return users
}


export async function getAllEmails() {
  const users = await get(endpoints.users);

  const emails = users.data.map(user => user.email)
  return emails
};


export async function deleteUserById(objectId) {
  await post(endpoints.logout);
  await post(endpoints.delete(objectId)) 
}


export async function getUserById(id) {
  try {
    const response = await get(endpoints.details(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}


export async function getUserByUsername(username) {
  try {
    const response = await get(endpoints.users);

    if (response.status !== 200) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    
    const user = response.data.find(user => user.username === username);
    return user || null;
  } catch (error) {
    return null;
  }
}