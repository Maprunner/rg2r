import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import VisibleEventList from '../containers/VisibleEventList.js'
import CourseList from '../containers/CourseList'
import ResultDisplay from './ResultDisplay'

function Sidebar(props) {
  return (
    <div id="rg2-info-panel">
      <TabView activeIndex={props.activeTabIndex} onTabChange={props.onTabChange} >
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
      </TabView>
    </div >
  )
}
export default Sidebar
