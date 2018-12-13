import RG2 from '../rg2Constants.js';

export default class {
  static initialiseReplay() {
    return {
      timerRunning: false,
      animationTime: 0,
      timerIncrement: 500,
      time: 0,
      millisecs: 0,
      earliestStartSecs: RG2.ONE_DAY_IN_SECONDS,
      latestFinishSecs: 0,
      slowestTimeSecs: 0,
      startSecs: 0,
      realTime: false,
      useFullTails: false,
      tailStartTimeSecs: 0
    };
  }

  static setReplayDetails(runners, oldReplay) {
    let replay = oldReplay;
    replay.earliestStartSecs = RG2.ONE_DAY_IN_SECONDS;
    replay.latestFinishSecs = 0;
    replay.slowestTimeSecs = 0;
    for (let i = 0; i < runners.length; i += 1) {
      if (runners[i].starttime < replay.earliestStartSecs) {
        replay.earliestStartSecs = runners[i].starttime;
      }
      if ((runners[i].starttime + runners[i].x.length) > replay.latestFinishSecs) {
        replay.latestFinishSecs = runners[i].starttime + runners[i].x.length;
      }
      if ((runners[i].x.length) > replay.slowestTimeSecs) {
        replay.slowestTimeSecs = runners[i].x.length;
      }
    }
    return this.setReplayTime(replay, 0);
  }

  static setReplayTime(oldReplay, time) {
    let replay = oldReplay;
    // sets animation time
    if (replay.realTime) {
      // if we got a time it was from the slider so use it
      if (time > 0) {
        replay.time = time;
      } else {
        replay.time = replay.earliestStartSecs;
      }
      replay.startSecs = replay.earliestStartSecs;
    } else {
      if (time > 0) {
        replay.time = time;
      } else {
        replay.time = 0;
      }
      replay.startSecs = 0;
    }
    replay.millisecs = replay.time * 1000;
    return replay;
  }

  static timerExpired(oldReplay) {
    let replay = oldReplay;
    // only increment time if we haven't got to the end already
    if (replay.realTime) {
      if (replay.time < replay.latestFinishSecs) {
        replay.millisecs += replay.timerIncrement;
      }
    } else {
      if (replay.time < replay.slowestTimeSecs) {
        replay.millisecs += replay.timerIncrement;
      }
    }
    replay.time = parseInt((replay.millisecs / 1000), 10);
    // find earliest time we need to worry about when drawing screen
    if (replay.useFullTails) {
      replay.tailStartTimeSecs = replay.startSecs + 1;
    } else {
      replay.tailStartTimeSecs = Math.max(replay.time - replay.tailLength, replay.startSecs + 1);
    }
    return replay;
  }
}
