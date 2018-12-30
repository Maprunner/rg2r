import React from 'react'
import Tab from 'react-bootstrap/lib/Tab'
import Tabs from 'react-bootstrap/lib/Tabs'
import VisibleEventList from '../containers/VisibleEventList.js'
import CourseList from '../containers/CourseList'
import ResultDisplay from './ResultDisplay'

function Sidebar(props) {
  return (
    <div id="rg2-info-panel">
      <Tabs
        id="rg2-info-sidebar"
        activeKey={props.activeTabIndex}
        onSelect={key => props.onTabChange({ key })}
      >
        <Tab eventKey="events" title="Events">
          <VisibleEventList />
        </Tab>
        <Tab eventKey="courses" title="Courses">
          <CourseList />
        </Tab>
        <Tab eventKey="results" title="Results">
          <ResultDisplay courses={props.courses} />
        </Tab>
        <Tab eventKey="draw" title="Draw" disabled>
          Text
        </Tab>
      </Tabs>

      {/* <TabView activeIndex={props.activeTabIndex} onTabChange={props.onTabChange} >
        <TabPanel header="Events">
          <VisibleEventList />
        </TabPanel>
        <TabPanel header="Courses" disabled={!props.courses.length > 0}>
          <CourseList />
        </TabPanel>
        <TabPanel header="Results" disabled={!props.hasResults}>
          <ResultDisplay courses={props.courses} />
        </TabPanel>
        <TabPanel header="Draw" disabled={true}>
          Text
        </TabPanel>
      </TabView> */}
    </div >
  )
}
export default Sidebar
