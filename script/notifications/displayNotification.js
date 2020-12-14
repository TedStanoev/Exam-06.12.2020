export default function displayNotification(message) {
    const notifBoxElement = document.querySelector('.infoBox');

    notifBoxElement.textContent = message;
    notifBoxElement.style.display = 'block';

    setTimeout(() => {
        notifBoxElement.style.display = 'none';

    }, 3000)
}