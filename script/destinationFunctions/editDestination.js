import urls from '/script/api/urls.js';
import fetchRequest from '/script/api/fetchRequest.js';
import getLoggedUser from '/script/tools/getLoggedUser.js';
import validateParams from '/script/tools/validateParams.js';

export default async function editDestination(newDestination, newCity, newImageUrl, newDuration, newDepDate, id) {
    let loggedUser = getLoggedUser();
    validateParams(newDestination, newCity, newImageUrl, newDuration, newDepDate);

    let putBody = JSON.stringify({
        destination: newDestination,
        city: newCity,
        imageUrl: newImageUrl,
        duration: newDuration,
        depDate: newDepDate,
        creator: loggedUser.email
    });

    return fetchRequest(urls.destinationUrl(id) + `?auth=${loggedUser.idToken}`, 'PUT', putBody);
};