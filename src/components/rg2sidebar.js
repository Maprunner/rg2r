import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Events from './events';
import Courses from './courses';

class RG2Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      drawEnabled: false
    };
  }

  render() {
    return (
      <div id="rg2-info-panel">
        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
          <TabPanel header="Events">
            <Events events={this.props.events} setEvent={this.props.setEvent} />
          </TabPanel>
          <TabPanel header="Courses" disabled={this.props.courses.length === 0}>
            <Courses courses={this.props.courses} onSelectCourse={this.props.onSelectCourse} />
          </TabPanel>
          <TabPanel header="Results" disabled={this.props.results.length === 0}>
            Results
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
