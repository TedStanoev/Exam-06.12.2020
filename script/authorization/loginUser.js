import validateParams from '/script/tools/validateParams.js';

const userModel = firebase.auth();

export default async function loginUser(email, password) {
    validateParams(email, password);

    return await userModel.signInWithEmailAndPassword(email, password)
        .then(loggedUser => {
            const { user } = loggedUser;
            localStorage.setItem('userInfo', JSON.stringify({ email: user.email, uid: user.uid, idToken: user.ya }));
        })
};