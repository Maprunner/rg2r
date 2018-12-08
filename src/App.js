import React, { Component } from 'react';
import RG2Toolbar from './components/rg2toolbar.js';
import RG2Sidebar from './components/rg2sidebar.js';
import RG2Map from './components/rg2map.js';
import 'primereact/resources/themes/nova-light/theme.css';
//import 'primereact/resources/primereact.min.css';
// import non-minified css so we can edit it for now
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import './App.css';
import Event from './utils/eventutils.js';
import RG2 from './rg2Constants.js';
import Course from './utils/courseutils.js';
import Result from './utils/resultutils.js';

class App extends Component {
  constructor() {
    super()
    let activeEvent = { id: null };
    this.state = {
      title: "Routegadget 2",
      events: [],
      courses: [],
      results: [],
      controls: [],
      mapImage: null,
      activeEvent: activeEvent,
      activeTabIndex: 0
    }
  }

  componentDidMount() {
    // load events as part of starting up app
    // assumes serevr running on port 80 to deal with api calls: see package.json
    fetch('/rg2/rg2api.php?type=events')
      .then(response => response.json())
      .then(json => this.saveEvents(json.data.events));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeEvent.id !== this.state.activeEvent.id) {
      console.log("Loading event " + this.state.activeEvent.id);
      fetch('/rg2/rg2api.php?type=event&id=' + this.state.activeEvent.id)
        .then(response => response.json())
        .then(json => this.saveEvent(json))
      this.getMap(this.state.activeEvent.mapfilename);
    }
  }

  saveEvents(eventsData) {
    let events = Event.processEvents(eventsData)
    this.setState({ events: events })
  }

  setEvent = (id) => {
    this.setState({
      activeEvent: this.state.events[id]
    });
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
    if (e.value === RG2.REPLAY_ALL_ROUTES_FOR_COURSE) {
      for (let i = 0; i < results.length; i += 1) {
        // using name field on input to store course name
        if (results[i].coursename === e.target.name) {
          results[i].replay = e.checked;
        }
      }
    } else {
      results[e.value].replay = e.checked;
    }
    this.setState({
      results: results
    });
  }

  onTabChange = (e) => {
    this.setState({ activeTabIndex: e.index })
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

  getMap(mapfilename) {
    const image = new window.Image();
    image.src = 'http://localhost:80/rg2-test-data/hh/kartat/' + mapfilename;
    image.onload = () => {
      // setState will trigger map load
      this.setState({
        mapImage: image
      });
    };
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
            events={this.state.events}
            courses={this.state.courses}
            results={this.state.results}
            setEvent={this.setEvent}
            activeTabIndex={this.state.activeTabIndex}
            onTabChange={this.onTabChange}
            onSelectCourse={this.onSelectCourse}
            onSelectResult={this.onSelectResult}
            onReplay={this.onReplayResult} />
          <RG2Map
            map={this.state.mapImage}
            courses={this.state.courses}
            controls={this.state.controls}
            results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
