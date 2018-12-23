const util   = require('./functions-library/util');
const reader = require('./functions-library/reader');

let argv = process.argv.slice(2);

// Get the file content and do further processing
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {
    
    console.log("talkList", talkList);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});