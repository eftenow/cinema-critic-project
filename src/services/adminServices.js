import { get, post, put, request } from './api.js';


const endpoints = {
  'allUsers': '/account/api/get-users/',

}

export async function getAllUsersAdmin() {
  const response = await get(endpoints.allUsers);

  return response.data;
};