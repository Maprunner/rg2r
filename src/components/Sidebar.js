import React from 'react'
import Tab from 'react-bootstrap/lib/Tab'
import Nav from 'react-bootstrap/lib/Nav'
import VisibleEventList from '../containers/VisibleEventList.js'
import CourseList from '../containers/CourseList'
import ResultDisplay from './ResultDisplay'
import RG2 from '../rg2Constants'

function Sidebar(props) {
  const width = { width: RG2.INFO_BAR_WIDTH + 'px' }
  return (
    <div id="rg2-info-panel" style={width}>
      < Tab.Container
        id="info"
        activeKey={props.activeTabIndex}
        onSelect={key => props.onTabChange({ key })}
      >
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="events">Events</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="courses" disabled={!props.courses.length > 0}>Courses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="results" disabled={!props.hasResults}>Results</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="draw" disabled>Draw</Nav.Link>
          </Nav.Item>

        </Nav>
        <div id="rg2-info">
          <Tab.Content>
            <Tab.Pane eventKey="events">
              <VisibleEventList />
            </Tab.Pane>
            <Tab.Pane eventKey="courses">
              <CourseList />
            </Tab.Pane>
            <Tab.Pane eventKey="results">
              <ResultDisplay courses={props.courses} />
            </Tab.Pane>
            <Tab.Pane eventKey="draw">
              Text
        </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container >
    </div >
  )
}
export default Sidebar
