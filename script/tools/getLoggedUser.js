export default function getLoggedUser() {
    let user = localStorage.getItem('userInfo');

    if (!user) {
        return null;
    } else {
        user = JSON.parse(user);
        return user;
    }
};