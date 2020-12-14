export default function setContext(context, ...params) {
    params.map(p => Object.entries(p)).forEach(([[key, value]]) => {
        context[key] = value;
    })
}