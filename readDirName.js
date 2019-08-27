const fs = require('fs');

module.exports = function (path, type) {
    let pathName = fs.readdirSync(path);
    let reName = 'index';
    pathName.forEach((item) => {
        if (!type) {
            if (/([a-zA-Z_]+)\.js$/.test(item)) {
                reName = RegExp.$1
            }
        } else {
            if (/([a-zA-Z_]+)\.html$/.test(item)) {
                reName = RegExp.$1
            }
        }

    });
    console.log(reName);
    return reName;
}