const API = process.env.API_HOST + '/'

export function subscribeEmail(params) {
    return fetch(API + 'newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
