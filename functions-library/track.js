const time   = require('./time');

let track = {};

// Generate an empty schedule
track.generator = theXDay => {
    this.track = {};
    this.track.sessions = [];
    this.track.timeUsed = 0;
    this.track.timeRemain = 0;

    let section = (theXDay ? global.config.session.section[theXDay] : false) || global.config.session.section.default;

    section.forEach(item => {
        let session = {};
        
        item = item.split(global.config.session.section.split);
        session.begin = item[0];
        session.end = item[1];
        session.finish = item[2];
        session.timeUsed = 0;
        session.timeRemain = time.duration(session.begin, session.end);
        session.talks = [];

        this.track.timeRemain += session.timeRemain;

        this.track.sessions.push(session);
    });

    return this.track;
}

module.exports = track;
