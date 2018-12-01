import React, { Component } from 'react';
import RG2Toolbar from './components/rg2toolbar.js';
import RG2Sidebar from './components/rg2sidebar.js';
import RG2Map from './components/rg2map.js';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import RG2 from './rg2Constants.js';
class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      courses: [],
      results: [],
      controls: [],
      mapImage: null,
      activeEventId: null
    }
  }

  componentDidMount() {
    // load events as part of starting up app
    fetch('http://localhost:80/rg2/rg2api.php?type=events')
      .then(response => response.json())
      .then(json => this.setState({ events: json.data.events }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeEventId !== this.state.activeEventId) {
      console.log("Loading event " + this.state.activeEventId);
      fetch('http://localhost:80/rg2/rg2api.php?type=event&id=' + this.state.activeEventId)
        .then(response => response.json())
        .then(json => this.saveEvent(json))
      const id = this.state.events.findIndex(event => event.id === this.state.activeEventId);
      this.getMap(this.state.events[id].mapid);
    }
  }

  setEvent = (id) => {
    this.setState({
      activeEventId: id
    });
  }

  onSelectCourse = (e) => {
    let courses = this.state.courses;
    courses[e.value].display = e.checked;
    this.setState({
      courses: courses
    });
  }

  saveEvent(json) {
    // play around with stuff here
    const controls = this.extractControls(json.data.courses);
    for (let i = 0; i < json.data.courses.length; i += 1) {
      json.data.courses[i].display = false;
      json.data.courses[i].isScoreCourse = this.state.events[this.state.activeEventId].format === RG2.SCORE_EVENT;
      let c1x, c1y, c2x, c2y, c3x, c3y;
      for (let j = 0; j < (json.data.courses[i].xpos.length - 1); j += 1) {
        json.data.courses[i].angle = [];
        json.data.courses[i].textAngle = [];
        if (json.data.courses[i].isScoreCourse) {
          // align score event start triangle and controls upwards
          json.data.courses[i].angle[j] = Math.PI * 1.5;
          json.data.courses[i].textAngle[j] = Math.PI * 0.25;
        } else {
          // angle of line to next control
          json.data.courses[i].angle[j] = this.getAngle(json.data.courses[i].xpos[j], json.data.courses[i].ypos[j], json.data.courses[i].xpos[j + 1], json.data.courses[i].ypos[j + 1]);
          // create bisector of angle to position number
          c1x = Math.sin(json.data.courses[i].angle[j - 1]);
          c1y = Math.cos(json.data.courses[i].angle[j - 1]);
          c2x = Math.sin(json.data.courses[i].angle[j]) + c1x;
          c2y = Math.cos(json.data.courses[i].angle[j]) + c1y;
          c3x = c2x / 2;
          c3y = c2y / 2;
          json.data.courses[i].textAngle[j] = this.getAngle(c3x, c3y, c1x, c1y);
        }
      }
      // angle for finish aligns to north
      json.data.courses[i].angle[json.data.courses[i].xpos.length - 1] = Math.PI * 1.5;
      json.data.courses[i].textAngle[json.data.courses[i].xpos.length - 1] = Math.PI * 1.5;
    }
    this.setState({
      courses: json.data.courses,
      results: json.data.results,
      controls: controls
    })
  }

  getAngle(x1, y1, x2, y2) {
    let angle = Math.atan2((y2 - y1), (x2 - x1));
    if (angle < 0) {
      angle = angle + (2 * Math.PI);
    }
    return angle;
  }

  extractControls(courses) {
    let codes;
    let controls = [];
    for (let i = 0; i < courses.length; i += 1) {
      if (courses[i] !== undefined) {
        codes = courses[i].codes;
        if (codes !== undefined) {
          for (let j = 0; j < codes.length; j += 1) {
            if (controls.find(control => control.code === codes[j]) !== -1) {
              controls.push({ code: codes[j], x: courses[i].xpos[j], y: courses[i].ypos[j] });
            }
          }
        }
      }
    }
    return controls;
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
          <RG2Sidebar events={this.state.events} courses={this.state.courses} results={this.state.results} setEvent={this.setEvent} onSelectCourse={this.onSelectCourse} />
          <RG2Map map={this.state.mapImage} courses={this.state.courses} controls={this.state.controls} />
        </div>
      </div>
    );
  }
}

export default App;
