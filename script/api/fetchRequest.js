export default async function fetchRequest(url, method, body) {
    if (method === 'GET') {
        return await fetch(url).then(res => res.json());
    } else if (method === 'POST') {
        return await fetch(url, { method, body }).then(res => res.json());
    } else if (method === 'PUT') {
        return await fetch(url, { method, body }).then(res => res.json());
    } else if (method === 'DELETE') {
        return await fetch(url, { method });
    }
}