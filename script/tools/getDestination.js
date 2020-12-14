import urls from '/script/api/urls.js';
import fetchRequest from '/script/api/fetchRequest.js';


export default async function getDestination(id) {
    return await fetchRequest(urls.destinationUrl(id), 'GET');
};