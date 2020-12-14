import urls from '/script/api/urls.js';
import fetchRequest from '/script/api/fetchRequest.js';

export default async function getAllDestinations() {
    let destinations = await fetchRequest(urls.allDestinationsUrl, 'GET');
    let destinationArr = [];

    if (destinations) {
        Object.entries(destinations).forEach(([key, destination]) => {
            destination.id = key;
            destinationArr.push(destination);
        })
    }

    return destinationArr;
};