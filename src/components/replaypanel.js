import React from 'react';
import { Card } from 'primereact/card';
import { Slider } from 'primereact/slider';
import ReplayButton from './replaybutton.js';
import ReplayModeButton from './replaymodebutton.js';
import { Dropdown } from 'primereact/dropdown';
import Utils from '../utils/rg2utils.js';

function ReplayPanel(props) {
  if (props.runnerCount === 0) {
    return null;
  }
  const speedOptions = [
    { label: 'x1', value: 100 },
    { label: 'x2', value: 200 },
    { label: 'x5', value: 500 },
    { label: 'x10', value: 10000 },
    { label: 'x15', value: 15000 },
    { label: 'x30', value: 30000 },
    { label: 'x60', value: 60000 },
    { label: 'x120', value: 120000 },
    { label: 'x300', value: 300000 },
    { label: 'x600', value: 600000 },
    { label: 'x1200', value: 1200000 }
  ];
  let maxTime;
  let minTime;
  if (props.replay.realTime) {
    maxTime = props.replay.latestFinishSecs;
    minTime = props.replay.earliestStartSecs;
  } else {
    maxTime = props.replay.slowestTimeSecs;
    minTime = 0;
  }
  return (
    <Card>
      <div id={"replay"}>
        <ReplayButton replay={props.replay} onStartStop={props.onStartStop} />
        <ReplayModeButton realTime={props.replay.realTime} onChangeReplayMode={props.onChangeReplayMode} />
        <Slider
          value={props.replay.time}
          onChange={props.onChangeTime}
          min={minTime}
          max={maxTime}
          style={{ width: '20em' }} />
        <Dropdown value={props.replay.timerIncrement} options={speedOptions} onChange={props.onSetSpeed} />
        {Utils.formatSecsAsHHMMSS(props.replay.time)}
      </div>
    </Card>
  );
}

export default ReplayPanel;
