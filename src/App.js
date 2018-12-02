import React, { Component } from 'react';
import RG2Toolbar from './components/rg2toolbar.js';
import RG2Sidebar from './components/rg2sidebar.js';
import RG2Map from './components/rg2map.js';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import RG2 from './rg2Constants.js';
import Course from './utils/courseutils.js';
import Result from './utils/resultutils.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      courses: [],
      results: [],
      controls: [],
      mapImage: null,
      activeEventId: null,
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
    if (prevState.activeEventId !== this.state.activeEventId) {
      console.log("Loading event " + this.state.activeEventId);
      fetch('/rg2/rg2api.php?type=event&id=' + this.state.activeEventId)
        .then(response => response.json())
        .then(json => this.saveEvent(json))
      const id = this.state.events.findIndex(event => event.id === this.state.activeEventId);
      this.getMap(this.state.events[id].mapid);
    }
  }

  saveEvents(events) {
    events.sort(function (a, b) {
      return b.id - a.id;
    })
    this.setState({ events: events })
  }

  setEvent = (id) => {
    this.setState({
      activeEventId: id
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
          results[i].onDisplay = e.checked;
        }
      }
    } else {
      results[e.value].onDisplay = e.checked;
    }
    this.setState({
      results: results
    });
  }

  onTabChange = (e) => {
    this.setState({ activeTabIndex: e.index })
  }

  saveEvent(json) {
    const isScoreEvent = this.state.events[this.state.activeEventId].format === RG2.SCORE_EVENT;
    let controls = Course.extractControls(json.data.courses);
    let courses = Course.processCourses(json.data.courses, isScoreEvent);
    let results = Result.processResults(json.data.results, isScoreEvent);
    this.setState({
      courses: courses,
      results: results,
      controls: controls,
      activeTabIndex: RG2.TAB_COURSES
    })
  }

  getMap(id) {
    const image = new window.Image();
    image.src = 'http://localhost:80/rg2-test-data/hh/kartat/' + id + '.jpg';
    image.onload = () => {
      // setState will redraw layer because "image" property is changed
      this.setState({
        mapImage: image
      });
    };
  }

  render() {
    return (
      <div>
        <div id="rg2-header-container">
          <RG2Toolbar></RG2Toolbar>
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
            onSelectResult={this.onSelectResult} />
          <RG2Map map={this.state.mapImage} courses={this.state.courses} controls={this.state.controls} />
        </div>
      </div>
    );
  }
}

export default App;
