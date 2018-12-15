import React, { Component } from 'react';
import { connect } from 'react-redux'
import RG2Toolbar from './components/rg2toolbar.js';
import RG2Sidebar from './components/rg2sidebar.js';
import Canvas from './containers/Canvas.js';
import 'primereact/resources/themes/nova-light/theme.css';
import './rg2primereact.css';
import 'primeicons/primeicons.css';
import './App.css';
import RG2 from './rg2Constants.js';
import Course from './utils/courseutils.js';
import Result from './utils/resultutils.js';
import Runner from './utils/runnerutils.js';
import Replay from './utils/replayutils.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { loadEvents } from './actions/actions.js'
import { faCheck, faQuestion, faPause, faPlay, faUsers, faClock } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor() {
    super();
    library.add(faCheck, faQuestion, faPause, faPlay, faUsers, faClock);
    let activeEvent = { id: null };
    this.state = {
      title: "Routegadget 2",
      courses: [],
      results: [],
      controls: [],
      runners: [],
      replay: Replay.initialiseReplay(),
      mapImage: null,
      activeEvent: activeEvent,
      activeTabIndex: 0
    }
  }

  componentDidMount() {
    // load events as part of starting up app
    this.props.dispatch(loadEvents())
  }

  onSelectCourse = (e) => {
    let courses = this.state.courses;
    if (e.value === RG2.DISPLAY_ALL_COURSES) {
      for (let i = 0; i < courses.length; i += 1) {
        courses[i].display = e.checked;
      }
    } else {
      courses[e.value].display = e.checked;
    }
    this.setState({
      courses: courses
    });
  }

  onSelectResult = (e) => {
    let results = this.state.results;
    if (e.value === RG2.DISPLAY_ALL_ROUTES_FOR_COURSE) {
      for (let i = 0; i < results.length; i += 1) {
        // using name field on input to store course name
        if (results[i].coursename === e.target.name) {
          results[i].displayTrack = e.checked;
        }
      }
    } else {
      results[e.value].displayTrack = e.checked;
    }
    this.setState({
      results: results
    });
  }

  onReplayResult = (e) => {
    let results = this.state.results;
    let runners = this.state.runners;
    let course;
    if (e.value === RG2.REPLAY_ALL_ROUTES_FOR_COURSE) {
      for (let i = 0; i < results.length; i += 1) {
        // using name field on input to store course name
        if (results[i].coursename === e.target.name) {
          results[i].replay = e.checked;
          course = Course.getCourseDetailsByID(this.state.courses, results[i].courseid);
          runners = Runner.toggleRunner(e.checked, runners, results[i], course, i);
        }
      }
    } else {
      results[e.value].replay = e.checked;
      course = Course.getCourseDetailsByID(this.state.courses, results[e.value].courseid);
      runners = Runner.toggleRunner(e.checked, runners, results[e.value], course, e.value);
    }
    let replay = Replay.setReplayDetails(runners, this.state.replay);
    this.setState({
      results: results,
      runners: runners,
      replay: replay
    });
  }

  onTabChange = (e) => {
    this.setState({ activeTabIndex: e.index })
  }

  onStartStop = () => {
    if (this.state.replay.timerRunning) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.timerExpired, 100);
    }
    let replay = this.state.replay;
    replay.timerRunning = !replay.timerRunning
    this.setState({
      replay: replay
    });
  }

  onSetSpeed = (speed) => {
    let replay = this.state.replay;
    replay.timerIncrement = speed.value;
    this.setState({
      replay: replay
    });
  }

  onChangeTime = (time) => {
    let replay = Replay.setReplayTime(this.state.replay, time.value);
    this.setState({
      replay: replay
    });
  }

  onChangeReplayMode = () => {
    let replay = this.state.replay;
    replay.realTime = !replay.realTime
    replay = Replay.setReplayDetails(this.state.runners, this.state.replay);
    this.setState({
      replay: replay
    });
  }

  timerExpired = () => {
    let replay = Replay.timerExpired(this.state.replay);
    this.setState({
      replay: replay
    })
  }

  saveEvent(json) {
    const isScoreEvent = this.state.activeEvent.format === RG2.SCORE_EVENT;
    let courses = Course.processCourses(json.data.courses, isScoreEvent);
    let controls = Course.extractControls(courses);
    let results = Result.processResults(json.data.results, json.data.routes, courses, this.state.activeEvent.format);
    this.setState({
      title: this.state.activeEvent.name + ' ' + this.state.activeEvent.date,
      courses: courses,
      results: results,
      controls: controls,
      activeTabIndex: RG2.TAB_COURSES
    })
  }

  render() {
    return (
      <div>
        <div id="rg2-header-container">
          <RG2Toolbar
            title={this.state.title}
          />
        </div>
        <div id="rg2-body-container">
          <RG2Sidebar
            courses={this.state.courses}
            results={this.state.results}
            setEvent={this.setEvent}
            activeTabIndex={this.state.activeTabIndex}
            onTabChange={this.onTabChange}
            onSelectCourse={this.onSelectCourse}
            onSelectResult={this.onSelectResult}
            onReplay={this.onReplayResult} />
          <Canvas
            courses={this.state.courses}
            controls={this.state.controls}
            results={this.state.results}
            runners={this.state.runners}
            onStartStop={this.onStartStop}
            onSetSpeed={this.onSetSpeed}
            onChangeReplayMode={this.onChangeReplayMode}
            onChangeTime={this.onChangeTime}
            replay={this.state.replay} />
        </div>
      </div>
    );
  }
}

export default connect()(App)
