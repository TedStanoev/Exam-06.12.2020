import getAllDestinations from './getAllDestinations.js';

export default async function getUserDestinations(email) {
    let destinations = await getAllDestinations();
    let userDestinations = [];

    if (destinations) {
        if (destinations.some(d => d.creator == email)) {
            userDestinations = destinations.filter(d => d.creator == email);
        }
    }

    return userDestinations;
}