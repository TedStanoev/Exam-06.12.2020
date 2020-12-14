export default function validateParams(...params) {
    params.forEach(p => {
        if (!p) {
            throw new Error('All input fields must be filled!');
        }
    })
};