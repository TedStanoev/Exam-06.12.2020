import validateParams from '/script/tools/validateParams.js';

const userModel = firebase.auth();

export default async function registerUser(email, password, rPassword) {
    validateParams(email, password, rPassword);

    if (password != rPassword) {
        throw new Error('Passwords must match!');
    }

    return await userModel.createUserWithEmailAndPassword(email, password);
};