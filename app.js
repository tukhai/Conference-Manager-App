const path = require('path');
const reader = require('./functions-library/reader');

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

let argv = process.argv.slice(2);

// Get the file content and do further processing
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {
    
    console.log("talkList", talkList);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});