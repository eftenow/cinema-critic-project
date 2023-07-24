const BASE_URL = 'http://localhost:8000'; // Replace with your Django server's URL.

export async function request(method, endpoint, data) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const options = {
            method,
            credentials: 'include', // For sending and receiving cookies
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        if (method === 'GET' || method === 'HEAD') {
            delete options.body;  // Body should not be used with GET or HEAD requests
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function get(endpoint) {
    return request('GET', endpoint);
}

export function post(endpoint, data) {
    return request('POST', endpoint, data);
}

export function put(endpoint, data) {
    return request('PUT', endpoint, data);
}

export function del(endpoint) {
    return request('DELETE', endpoint);
}
