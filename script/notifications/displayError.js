export default function displayError(message) {
    const errorBoxElement = document.querySelector('.errorBox');

    errorBoxElement.textContent = message;
    errorBoxElement.style.display = 'block';

    setTimeout(() => {
        errorBoxElement.style.display = 'none';
    }, 3000)
}