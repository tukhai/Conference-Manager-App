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

let ai = {};

// Dynamic programming
ai.dp = {
    // Knapsack Problem
    kp: {
        // 0-1 Knapsack
        zeroOne: (talks, time) => {
            if (talks.length === 0) return [];

            let size      = time;
            let item      = [];
            let value     = [];
            let weight    = [];
            let bagMatrix = [];

            talks.forEach(talk => {
                weight.push(talk.timeCost);
                value.push(talk.weight);
            });

            for (let w = 0; w <= size; w++) {
                item[w]      = [];
                bagMatrix[w] = [];

                for (let j = 0; j < talks.length; j++) {
                    if (0 === w) {
                        bagMatrix[w][j] = 0;
                        continue;
                    }
                    if (weight[j] > w) {
                        bagMatrix[w][j] = bagMatrix[w][j-1] || 0;
                        continue;
                    }

                    let drop   = (bagMatrix[w-weight[j]][j-1] || 0) + value[j];
                    let noDrop = bagMatrix[w][j-1] || 0;

                    bagMatrix[w][j] = Math.max(drop, noDrop);

                    if (drop > noDrop) item[w].push(j);
                }
            }

            let sum  = 0;
            let max  = bagMatrix.pop().pop();
            let idxs = [];
            for (let v = size; v >= 0;) {
                let tmp = item[v].pop();
                while (idxs.indexOf(tmp) != -1) tmp = item[v].pop();
                idxs.push(tmp);
                sum += value[tmp];
                if (sum === max) break;
                v -= weight[tmp];
            }

            return idxs;
        }
    }
}

// Get the file content and do further processing
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {
    // Parsing file content
    let talks = util.array.merge(talkList);
    talks = util.talk.str2Obj(talks);
    
    // console.log("--0--", track.generator(0));
    this.track = track.generator(0);
    this.track.sessions.forEach((session, INDEX) => {
        // console.log(INDEX, "--session--", session);

        // The problem is summarized as the 0-1 Knapsack problem, and the appropriate activities are scheduled to the appropriate time period through dynamic programming.
        let idxs = ai.dp.kp.zeroOne(talks, session.timeRemain);
        if (idxs[0] === undefined && idxs.length != 0) {
            idxs = [];
            talks = [];
        }

        console.log("--idxs--", idxs);
    });

    // console.log("--talks--", talks);

}).catch(err => {
    // Handling Errors
    console.log(`Error[${err}]`);
});