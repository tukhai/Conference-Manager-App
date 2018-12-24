const util   = require('./functions-library/util');
const track  = require('./functions-library/track');
const reader = require('./functions-library/reader');
const ai     = require('./functions-library/ai');
const time   = require('./functions-library/time');

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

    let tracks = [];
    let maxDays = global.config.limit.maxDays || true; // Read the configuration, if there are restrictions on the number of days scheduled for the event, then follow the requirements
    
    // Keep all activities on schedule
    while (talks.length && (maxDays === true ? true : tracks.length < maxDays)) {
        // console.log("--0--", track.generator(0));
        this.track = track.generator(tracks.length + 1);

        this.track.sessions.forEach((session, INDEX) => {
            // console.log(INDEX, "--session--", session);

            // The problem is summarized as the 0-1 Knapsack problem, and the appropriate activities are scheduled to the appropriate time period through dynamic programming.
            let idxs = ai.dp.kp.zeroOne(talks, session.timeRemain);
            if (idxs[0] === undefined && idxs.length != 0) {
                idxs = [];
                talks = [];
            }

            let mark = session.begin;
            idxs.forEach(idx => {
                let talk = talks[idx];
                talk.scheduled = mark;
                mark = time.elapse(mark, talk.timeCost);

                if (talk.type === 'merged') {
                    let tmp = talk.scheduled;
                    talk.merged.forEach((item, idx) => {
                        item.scheduled = tmp;
                        tmp = time.elapse(tmp, item.timeCost);
                        if ((idx+1) === talk.merged.length) talk.relaxTime = tmp;
                    });
                }

                session.talks.push(talk);
                session.timeUsed += talk.timeCost;
                session.timeRemain -= talk.timeCost;
                delete talks[idx];
            });

            talks = util.array.clear(talks);
            this.track.timeUsed += session.timeUsed;
        });

        if (this.track.timeUsed) tracks.push(this.track);
    }

    // console.log("--talks--", talks);
    // console.log("---tracks---", tracks);
    track.print(tracks);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});