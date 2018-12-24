const util   = require('./functions-library/util');
const track  = require('./functions-library/track');
const reader = require('./functions-library/reader');

const cfgArg     = ['--cfg', '-c'];
const cfgLength  = 2;
const cfgDefault = './config.js';

// Handle command line parameters, support input of multiple files, support program options
let idx;
let cfg;
let argv = process.argv.slice(2);
for (let i = 0; i < cfgArg.length; i++) {
    idx = argv.indexOf(cfgArg[i]);
    if (idx != -1) break;
}
if (idx != -1) {
    let cfgFile = argv[idx+1];
    if (!cfgFile) throw new Error('Error[Please set the config file]');
    cfg = util.path.getRightPath(new Array(cfgFile))[0];
    argv.splice(idx, cfgLength);
} else {
    cfg = cfgDefault;
}

global.config = require(cfg);

// Get the file content and do further processing
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {
    // Parsing file content
    let talks = util.array.merge(talkList);
    talks = util.talk.str2Obj(talks);
    
    console.log("--0--", track.generator(0));

    // console.log("--talks--", talks);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});