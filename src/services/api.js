export const BASE_URL = 'http://localhost:8000';

export function getAccessTokenFromCookie() {
    const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find(row => row.startsWith('access'));
    if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split('=')[1];
        return accessToken;
    }
    return null;
}

export async function request(method, endpoint, data) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const accessToken = getAccessTokenFromCookie();
        const options = {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
            },
            body: JSON.stringify(data),
        };

        if (method === 'GET' || method === 'HEAD') {
            delete options.body;
        }

        const response = await fetch(url, options);
        let responseData;
        if (response.headers.get("content-type") && response.headers.get("content-type").includes("application/json")) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }


        if (!response.ok) {
            const error = new Error("An error occurred");
            error.status = response.status;
            error.data = responseData;
            throw error;
        }

        return { status: response.status, data: responseData };
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
