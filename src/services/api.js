import { getCurrentSessionToken } from "./authServices.js";

const host = 'https://parseapi.back4app.com';

const appId = "ElbYEpOIquXfbOGKpfc9C5Pnicvjrl4u82rBJMtv";
const keyRestAPI = "jH5QqdXi3KYQ57u3gCghGq9q3pHZZSincAAPbc7h";

async function request(method, url, bodyData) {
    let options = {
        method,
        headers : {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": keyRestAPI,
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
        //let token = user.accessToken;
        // options.headers['X-Authorization'] = token;
    }

    try {
        let response = await fetch(host + url, options);
        
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