import { getCurrentSessionToken } from "./authServices.js";
import {HOST, APP_ID, KEY_REST_API} from "../../secrets.js";


async function request(method, url, bodyData) {
    let options = {
        method,
        headers : {
            "X-Parse-Application-Id": APP_ID,
            "X-Parse-REST-API-Key": KEY_REST_API,
            "X-Parse-Revocable-Session": 1
        }
    };
    
    if (bodyData != undefined){
        options.headers['content-type'] = 'application/json';
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
        alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'get')
const post = request.bind(null, 'post')
const put = request.bind(null, 'put')
const del = request.bind(null, 'delete')

export {
    get,
    post,
    put,
    del
}