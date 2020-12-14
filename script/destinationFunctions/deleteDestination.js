import urls from '/script/api/urls.js';
import fetchRequest from '/script/api/fetchRequest.js';
import getLoggedUser from '/script/tools/getLoggedUser.js';
import getDestination from '/script/tools/getDestination.js';

export default async function deleteDestination(id, user) {
    return await fetchRequest(urls.destinationUrl(id) + `?auth=${user.idToken}`, 'DELETE');
};