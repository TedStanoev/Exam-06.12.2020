export default async function logoutUser() {
    localStorage.removeItem('userInfo');
};