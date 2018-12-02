import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Events from './events';
import Courses from './courses';
import Results from './results';

class RG2Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      drawEnabled: false
    };
  }

  render() {
    return (
      <div id="rg2-info-panel">
        <TabView activeIndex={this.props.activeTabIndex} onTabChange={this.props.onTabChange} >
          <TabPanel header="Events">
            <Events events={this.props.events} setEvent={this.props.setEvent} />
          </TabPanel>
          <TabPanel header="Courses" disabled={this.props.courses.length === 0}>
            <Courses courses={this.props.courses} onSelectCourse={this.props.onSelectCourse} />
          </TabPanel>
          <TabPanel header="Results" disabled={this.props.results.length === 0}>
            <Results courses={this.props.courses} results={this.props.results} onSelectCourse={this.props.onSelectCourse} onSelectResult={this.props.onSelectResult} />
          </TabPanel>
          <TabPanel header="Draw" disabled={!this.state.drawEnabled}>
            Draw
          </TabPanel>
        </TabView>
      </div>
    );
  }
}
export default RG2Sidebar;
