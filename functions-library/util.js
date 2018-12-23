const path = require('path');

let util = {};

util.path = {
    getRightPath: paths => {
        let rightPath = [];

        paths.forEach(_path => {
            let tmp = path.relative(__dirname, _path);
            rightPath.push(path.join(__dirname, tmp));
        });

        return rightPath;
    }
};

module.exports = util;
