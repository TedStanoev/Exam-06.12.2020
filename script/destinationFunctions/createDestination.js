import urls from '/script/api/urls.js';
import fetchRequest from '/script/api/fetchRequest.js';
import getLoggedUser from '/script/tools/getLoggedUser.js';
import validateParams from '/script/tools/validateParams.js';

export default async function createDestination(destination, city, imageUrl, depDate, duration) {
    let user = getLoggedUser();
    validateParams(destination, city, imageUrl, depDate, duration);

    let postBody = JSON.stringify({
        destination,
        city,
        imageUrl,
        depDate,
        duration,
        creator: user.email
    });

    return await fetchRequest(urls.allDestinationsUrl + `?auth=${user.idToken}`, 'POST', postBody);
};