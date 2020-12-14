import registerUser from './authorization/registerUser.js';
import loginUser from './authorization/loginUser.js';
import logoutUser from './authorization/logoutUser.js';
import getLoggedUser from './tools/getLoggedUser.js';
import setContext from './tools/setContext.js';
import getAllDestinations from './tools/getAllDestinations.js';
import createDestination from './destinationFunctions/createDestination.js';
import getDestination from './tools/getDestination.js';
import getId from './tools/getId.js';
import editDestination from './destinationFunctions/editDestination.js';
import getUserDestinations from './tools/getUserDestinations.js';
import deleteDestination from './destinationFunctions/deleteDestination.js';
import displayError from './notifications/displayError.js';
import displayNotification from './notifications/displayNotification.js';
import displayLoading from './notifications/displayLoading.js';
import hideLoading from './notifications/hideLoading.js';


export default Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    //Get
    this.get('/', async function (context) {
        let user = getLoggedUser();
        let destinations = await getAllDestinations();

        if (user) {
            setContext(context, { isLogged: true }, { email: user.email });

            if (destinations) {
                setContext(context, { destinations });
            }
        }

        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs',
            'destination': '/templates/destination.hbs'
        }).then(function () {
            this.partial('/templates/home.hbs');
        })
    })

    this.get('/register', function () {
        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs'
        }).then(function () {
            this.partial('/templates/register.hbs');
        })
    })

    this.get('/login', function () {
        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs'
        }).then(function () {
            this.partial('/templates/login.hbs');
        })
    })

    this.get('/logout', function (context) {
        logoutUser()
            .then(() => {
                context.redirect('/');
                displayNotification('Logout successful');
            })
            .catch(e => displayError(e.message));
    })

    this.get('/create', function (context) {
        let user = getLoggedUser();

        if (user) {
            setContext(context, { isLogged: true }, { email: user.email });
        }

        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs'
        }).then(function () {
            this.partial('/templates/create.hbs');
        })
    })

    this.get('#/details/:id', async function (context) {
        let user = getLoggedUser();

        if (user) {
            setContext(context, { isLogged: true }, { email: user.email });
        }

        let id = getId();
        let destinationItem = await getDestination(id);
        let { destination, city, imageUrl, duration, depDate } = destinationItem;

        setContext(context, { destination }, { city }, { imageUrl }, { duration }, { depDate }, { id });

        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs'
        }).then(function () {
            this.partial('/templates/details.hbs');
        })

    })

    this.get('#/edit/:id', async function (context) {
        let user = getLoggedUser();

        if (user) {
            setContext(context, { isLogged: true }, { email: user.email });
        }

        let id = getId();
        let destinationItem = await getDestination(id);
        let { destination, city, imageUrl, duration, depDate, creator } = destinationItem;

        if (creator != user.email) {
            context.redirect(`#/details/:${id}`);
            return;
        }

        setContext(context, { destination }, { city }, { imageUrl }, { duration }, { depDate });

        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs'
        }).then(() => {
            this.partial('/templates/edit.hbs');
        })

    })

    this.get('#/user-destinations/:email', async function (context) {
        let user = getLoggedUser();

        if (user) {
            setContext(context, { isLogged: true }, { email: user.email });
        }

        let userDestinations = await getUserDestinations(user.email);

        if (userDestinations) {
            setContext(context, { userDestinations });
        }

        this.loadPartials({
            'header': '/templates/header.hbs',
            'footer': '/templates/footer.hbs',
            'destination': '/templates/myDestination.hbs'
        }).then(function () {
            this.partial('/templates/detailsDashboard.hbs');
        })

    })

    this.get('#/delete/:id', function (context) {
        let user = getLoggedUser();
        let id = getId();

        displayLoading();
        deleteDestination(id, user).then(() => {
            context.redirect(`/#/user-destinations/:${user.email}`);
            displayNotification('Destination deleted.');
        })
        .catch(e => displayError(e.message))
        .finally(() => {
            hideLoading();
        })
    })

    //Post
    this.post('/register', function (context) {
        const { email, password, rePassword } = context.params;

        displayLoading();
        registerUser(email, password, rePassword)
            .then(() => {
                loginUser(email, password).then(() => {
                    context.redirect('/');
                    displayNotification('Login successful');
                });
            })
            .catch(e => displayError(e.message))
            .finally(() => {
                hideLoading();
            })
    })

    this.post('/login', function (context) {
        const { email, password } = context.params;
        displayLoading();
        loginUser(email, password)
            .then(() => {
                context.redirect('/');
                displayNotification('Login successful');
            })
            .catch(e => displayError(e.message))
            .finally(() => {
                hideLoading();
            })
    })

    this.post('/create', function (context) {
        const { destination, city, imageUrl, depDate, duration } = context.params;
        displayLoading();
        createDestination(destination, city, imageUrl, depDate, duration)
            .then(() => {
                context.redirect('/');
                displayNotification('Destination was added!');
            })
            .catch(e => displayError(e.message))
            .finally(() => {
                hideLoading();
            })
    })

    //PUT
    this.put('#/edit/:id', function (context) {
        const { newDestination, newCity, newImageUrl, newDuration, newDepDate } = context.params;
        let id = getId();

        displayLoading();
        editDestination(newDestination, newCity, newImageUrl, newDuration, newDepDate, id)
            .then(() => {
                context.redirect(`#/details/:${id}`);
                displayNotification('Successfully edited destination');
            })
            .catch(e => displayError(e.message))
            .finally(() => {
                hideLoading();
            })

    })


});