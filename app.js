const util   = require('./functions-library/util');
const reader = require('./functions-library/reader');

const cfgArg     = ['--cfg', '-c'];
const cfgLength  = 2;
const cfgDefault = {
    timeUnit: 'min',
    lightning: {
        symbol: 'lightning',
        timeCost: 5,
        /*
        merge: {
            break: 'Have a rest...',
            timeCost: 10
        }
        */
    },
    limit: {
    },
    session: {
        section: {
            split: '-',
            default: [
                '09:00-12:00-Lunch',
                '13:00-17:00-Networking Event'
            ]
        },
        limit: {
            'Networking Event': {noEarlier: '16:00', noLater: '17:00'}
        }
    },
    track: {
        title: 'Track'
    }
};

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

if (typeof cfg == "string") {
    global.config = require(cfg);
} else {
    global.config = cfg;
}

// Get the file content and do further processing
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {
    // Parsing file content
    let talks = util.array.merge(talkList);
    talks = util.talk.str2Obj(talks);
    
    console.log("--talks--", talks);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});