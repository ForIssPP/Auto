export default function getQueryVariable(key) {
    const query = window.location.search.substring(1);
    const keyValue = query.split('&');
    for (let i = 0; i < keyValue.length; i++) {
        let pair = keyValue[i].split('=');
        if (pair[0] === key) {
            return pair[1];
        }
    }
    return !1;
}