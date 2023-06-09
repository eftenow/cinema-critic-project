import { getCurrentSessionToken } from "./authServices.js";
import {HOST, APP_ID, JS_KEY, KEY_REST_API} from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export async function request(method, url, bodyData) {
    let options = {
        method,
        headers : {
            "X-Parse-Application-Id": APP_ID,
            "X-Parse-REST-API-Key": KEY_REST_API,
            "X-Parse-Revocable-Session": 1
        }
    };
    
    if (bodyData != undefined){
        options.headers['Content-Type'] = 'application/json';
        options['body'] = JSON.stringify(bodyData);
    };
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && bodyData != undefined && method == 'put'){
        let sessionToken = getCurrentSessionToken();
        options.headers['X-Parse-Session-Token'] = sessionToken;
    }

    try {
        let response = await fetch(HOST + url, options);
        
        if (response.ok != true){
            if (response.status == 403){
                localStorage.removeItem('user');
            }
            let error = await response.json();
            
            throw new Error(error.message);
        }

        if (response.status == 204){
            return response;
        } else {
            return response.json();
        }


    } catch (error) {
        throw error;
    }
}

const get = async (url, queryParams) => {
    let options = {
        headers: {
            "X-Parse-Application-Id": APP_ID,
            "X-Parse-REST-API-Key": KEY_REST_API,
            "X-Parse-Revocable-Session": 1
        }
    };
    
    if (queryParams) {
        url += '?' + new URLSearchParams(queryParams);
    }
    
    try {
        let response = await fetch(HOST + url, options);
        
        if (response.ok != true){
            if (response.status == 403){
                localStorage.removeItem('user');
            }
            let error = await response.json();
            
            throw new Error(error.message);
        }

        if (response.status == 204){
            return response;
        } else {
            return response.json();
        }


    } catch (error) {
        throw error;
    }
};

const post = request.bind(null, 'post')
const put = request.bind(null, 'put')
const del = request.bind(null, 'delete')

export {
    get,
    post,
    put,
    del
}